import * as functions from "firebase-functions";
import { Game } from "../../game/Game";
import { Player, playerToLeft } from "../../game/Player";
import {
  createRound,
  getRoundOutcome,
  getWinnerOfTrick,
  scoreRound
} from "../../game/Round";

function isCompletePlayers(
  playerNames: { [player: number]: string } | undefined
) {
  return playerNames !== undefined && Object.keys(playerNames).length === 4;
}

function getFirstRoundOperation(
  before: functions.firestore.DocumentSnapshot,
  after: functions.firestore.DocumentSnapshot,
  context: functions.EventContext
) {
  if (before.exists && isCompletePlayers(before.data()!.playerNames)) {
    return null;
  }
  if (!after.exists || !isCompletePlayers(after.data()!.playerNames)) {
    return null;
  }

  console.log("startFirstRound", context.params.gameId);

  const firstRound = createRound(Player.One);
  return after.ref.update({ currentRound: firstRound });
}

function getFinishTrickOperation(
  before: functions.firestore.DocumentSnapshot,
  after: functions.firestore.DocumentSnapshot,
  context: functions.EventContext
) {
  if (!after.exists) {
    return null;
  }

  const game: Game = after.data()! as Game;
  const round = game.currentRound;
  if (!round) {
    return null;
  }
  const trick = round.currentTrick;
  if (!trick) {
    return null;
  }

  if (Object.keys(trick.cards).length === (round.trumpCallerAlone ? 3 : 4)) {
    console.log("finishTrick", context.params.gameId);

    // The trick has ended
    const updatedFinishedTricks = [...round.finishedTricks, trick];
    if (updatedFinishedTricks.length === 5) {
      // The round has ended
      const teamScores = scoreRound(updatedFinishedTricks, round.trumpSuit!);
      const [winningTeam, roundOutcome] = getRoundOutcome(
        teamScores,
        round.trumpCaller!
      );
      const finishedRounds = [
        ...(game.finishedRounds ?? []),
        [winningTeam, roundOutcome]
      ];
      const nextDealer = playerToLeft(round.dealer);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          after.ref
            .update({
              currentRound: createRound(nextDealer),
              finishedRounds
            })
            .then(resolve, reject);
        }, 3000);
      });
    } else {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          after.ref
            .update({
              "currentRound.turnPlayer": getWinnerOfTrick(
                trick,
                round.trumpSuit!
              ),
              "currentRound.currentTrick": null,
              "currentRound.finishedTricks": updatedFinishedTricks
            })
            .then(resolve, reject);
        }, 3000);
      });
    }
  }

  return null;
}

export const onGameChange = functions.firestore
  .document("/games/{gameId}")
  .onWrite((change, context) => {
    const { before, after } = change;

    const firstRoundOperation = getFirstRoundOperation(before, after, context);
    if (firstRoundOperation !== null) {
      return firstRoundOperation;
    }

    const finishTrickOperation = getFinishTrickOperation(
      before,
      after,
      context
    );
    if (finishTrickOperation !== null) {
      return finishTrickOperation;
    }

    return null;
  });
