import firestore from "@react-native-firebase/firestore";
import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Game } from "../game/Game";
import { Player } from "../game/Player";
import EnterGameScreen from "./EnterGameScreen";
import WaitingRoomScreen from "./WaitingRoomScreen";

export default function GameScreen() {
  const [gameId, setGameId] = React.useState<string | null>(null);
  const [playerId, setPlayerId] = React.useState<Player | null>(null);
  const [game, setGame] = React.useState<Game | null>(null);

  React.useEffect(() => {
    if (gameId !== null) {
      return firestore()
        .doc(`games/${gameId}`)
        .onSnapshot(docSnapshot => {
          setGame(docSnapshot.data() as Game);
        });
    }
  }, [gameId]);

  let body;
  if (gameId === null || playerId === null) {
    body = (
      <EnterGameScreen
        onEnter={(gameId: string, playerId: Player) => {
          setGameId(gameId);
          setPlayerId(playerId);
        }}
      />
    );
  } else if (game !== null) {
    body = (
      <WaitingRoomScreen gameId={gameId} game={game} playerId={playerId} />
    );
  } else {
    body = (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return <View style={styles.root}>{body}</View>;
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
