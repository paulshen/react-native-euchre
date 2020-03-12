import * as functions from "firebase-functions";
import { Player } from "../../game/Player";
import { createRound } from "../../game/Round";

function isCompletePlayers(players: Array<string | null> | undefined) {
  return (
    players !== undefined &&
    players.length === 4 &&
    players.every(p => p !== null)
  );
}

export const startFirstRound = functions.firestore
  .document("/games/{gameId}")
  .onWrite((change, context) => {
    const { before, after } = change;
    if (before.exists && isCompletePlayers(before.data()!.players)) {
      return null;
    }
    if (!after.exists || !isCompletePlayers(after.data()!.players)) {
      return null;
    }

    console.log("startFirstRound", context.params.gameId);

    const firstRound = createRound(Player.One);
    return after.ref.update({ currentRound: firstRound });
  });
