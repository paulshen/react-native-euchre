import * as firebase from "firebase";
import * as React from "react";
import {
  ActivityIndicator,
  Button,
  Picker,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Game } from "../game/Game";
import { Player } from "../game/Player";
import ActiveGameScreen from "./ActiveGameScreen";
import EnterGameScreen from "./EnterGameScreen";
import { GameIdContext } from "./ReactContext";
import WaitingRoomScreen from "./WaitingRoomScreen";

function PlayerSwitcher({
  playerNames,
  player,
  setPlayer
}: {
  playerNames: { [player: number]: string } | undefined;
  player: Player;
  setPlayer: (player: Player) => void;
}) {
  return (
    <Picker
      selectedValue={player}
      onValueChange={itemValue => setPlayer(itemValue)}
    >
      <Picker.Item label="Player One" value={Player.One} />
      <Picker.Item label="Player Two" value={Player.Two} />
      <Picker.Item label="Player Three" value={Player.Three} />
      <Picker.Item label="Player Four" value={Player.Four} />
    </Picker>
  );
}

export default function GameScreen() {
  const [gameId, setGameId] = React.useState<string | undefined>();
  const [player, setPlayer] = React.useState<Player | undefined>();
  const [game, setGame] = React.useState<Game | undefined>();
  const [showPlayerSwitcher, setShowPlayerSwitcher] = React.useState(false);

  React.useEffect(() => {
    if (gameId !== undefined) {
      return firebase
        .firestore()
        .doc(`games/${gameId}`)
        .onSnapshot(docSnapshot => {
          setGame(docSnapshot.data() as Game);
        });
    }
  }, [gameId]);

  let body;
  if (gameId === undefined) {
    body = (
      <EnterGameScreen
        onEnter={(gameId: string) => {
          setGameId(gameId);
        }}
      />
    );
  } else if (game !== undefined) {
    if (player === undefined || !game.currentRound) {
      body = (
        <WaitingRoomScreen
          gameId={gameId}
          game={game}
          player={player}
          setPlayer={setPlayer}
        />
      );
    } else {
      body = <ActiveGameScreen game={game} player={player} />;
    }
  } else {
    body = (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <GameIdContext.Provider value={gameId}>
      <View style={styles.root}>
        {body}
        <Button
          title="Leave Game"
          onPress={() => {
            setGameId(undefined);
            setPlayer(undefined);
          }}
        />
        <TouchableOpacity
          style={styles.togglePlayerSwitcher}
          onLongPress={() => setShowPlayerSwitcher(show => !show)}
        />
        {showPlayerSwitcher ? (
          <PlayerSwitcher
            playerNames={game?.playerNames}
            player={player}
            setPlayer={setPlayer}
          />
        ) : null}
      </View>
    </GameIdContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  loading: {
    flex: 1,
    justifyContent: "center"
  },
  togglePlayerSwitcher: {
    backgroundColor: "transparent",
    height: 24,
    width: 84,
    position: "absolute",
    right: 0,
    top: 32
  }
});
