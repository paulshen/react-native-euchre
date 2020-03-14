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
        placeholder="Game ID"
        autoCapitalize="none"
        style={styles.gameInput}
      />
      <Button title="Enter" onPress={() => onEnter(gameId)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 128,
    marginHorizontal: 16
  },
  gameInput: {
    borderColor: "gray",
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    height: 48
  }
});
