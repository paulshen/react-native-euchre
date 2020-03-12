import * as React from "react";
import { Button, StyleSheet, TextInput, Picker, View } from "react-native";
import { Player } from "../game/Player";

export default function EnterGameScreen({
  onEnter
}: {
  onEnter: (gameId: string, playerId: Player) => void;
}) {
  const [gameId, setGameId] = React.useState("");
  const [playerId, setPlayerId] = React.useState(Player.One);

  React.useEffect(() => {
    // const unsubscribe = firestore()
    //   .doc("games/hP7QUUEDeuNMIjUTUQFu")
    //   .onSnapshot(docSnapshot => {
    //     console.log(docSnapshot);
    //   });
  }, []);

  return (
    <View style={styles.root}>
      <TextInput
        value={gameId}
        onChangeText={setGameId}
        style={styles.gameInput}
      />
      <Picker
        selectedValue={playerId}
        onValueChange={(itemValue, itemIndex) => setPlayerId(itemValue)}
      >
        <Picker.Item label="Player One" value={Player.One} />
        <Picker.Item label="Player Two" value={Player.Two} />
        <Picker.Item label="Player Three" value={Player.Three} />
        <Picker.Item label="Player Four" value={Player.Four} />
      </Picker>
      <Button title="Enter" onPress={() => onEnter(gameId, playerId)} />
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
