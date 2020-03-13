import * as React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function EnterGameScreen({
  onEnter
}: {
  onEnter: (gameId: string) => void;
}) {
  const [gameId, setGameId] = React.useState("");

  return (
    <View style={styles.root}>
      <TextInput
        value={gameId}
        onChangeText={setGameId}
        style={styles.gameInput}
      />
      <Button title="Enter" onPress={() => onEnter(gameId)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 48
  },
  gameInput: {
    borderColor: "gray",
    borderWidth: 1,
    height: 40
  }
});
