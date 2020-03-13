import firestore from "@react-native-firebase/firestore";
import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Game } from "../game/Game";
import { Player } from "../game/Player";
import ActiveGameScreen from "./ActiveGameScreen";
import EnterGameScreen from "./EnterGameScreen";
import WaitingRoomScreen from "./WaitingRoomScreen";
import { GameIdContext } from "./ReactContext";

export default function GameScreen() {
  const [gameId, setGameId] = React.useState<string | null>(null);
  const [player, setPlayer] = React.useState<Player | null>(null);
  const [game, setGame] = React.useState<Game | null>(null);

  React.useEffect(() => {
    if (gameId !== null) {
      return firestore()
        .doc(`games/${gameId}`)
        .onSnapshot(docSnapshot => {
          setGame(docSnapshot.data() as Game);
        });
    }
  }, [gameId, player]);

  let body;
  if (gameId === null || player === null) {
    body = (
      <EnterGameScreen
        onEnter={(gameId: string, player: Player) => {
          setGameId(gameId);
          setPlayer(player);
        }}
      />
    );
  } else if (game !== null) {
    if (!game.currentRound) {
      body = <WaitingRoomScreen gameId={gameId} game={game} player={player} />;
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
      <View style={styles.root}>{body}</View>
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
  }
});
