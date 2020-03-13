import * as React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { changeName } from "../game/Controller";
import { Game } from "../game/Game";
import { Player } from "../game/Player";

function YourSeat({
  playerNames,
  player,
  onNameChange
}: {
  playerNames: { [player: number]: string };
  player: Player;
  onNameChange: (name: string) => void;
}) {
  const [name, setName] = React.useState(playerNames[player] ?? "");
  React.useEffect(() => {
    const name = playerNames[player];
    if (name !== null) {
      setName(name);
    }
  }, [playerNames[player]]);
  return (
    <View>
      <Text>You are in seat {player + 1}.</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: "#191919"
        }}
      />
      <Button
        title="Update Name"
        disabled={name === playerNames[player]}
        onPress={() => onNameChange(name)}
      />
    </View>
  );
}

export default function WaitingRoomScreen({
  gameId,
  game,
  player,
  setPlayer
}: {
  gameId: string;
  game: Game;
  player: Player | undefined;
  setPlayer: (player: Player) => void;
}) {
  const playerNames = game.playerNames;
  if (playerNames === undefined) {
    return null;
  }
  return (
    <View style={styles.root}>
      <Text>{gameId}</Text>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Text>Team One</Text>
          <Text>Seat One</Text>
          <Text>{playerNames[Player.One]}</Text>
          <Button title="Sit Here" onPress={() => setPlayer(Player.One)} />
          <Text>Seat Three</Text>
          <Text>{playerNames[Player.Three]}</Text>
          <Button title="Sit Here" onPress={() => setPlayer(Player.Three)} />
        </View>
        <View>
          <Text>Team Two</Text>
          <Text>Seat Two</Text>
          <Text>{playerNames[Player.Two]}</Text>
          <Button title="Sit Here" onPress={() => setPlayer(Player.Two)} />
          <Text>Seat Four</Text>
          <Text>{playerNames[Player.Four]}</Text>
          <Button title="Sit Here" onPress={() => setPlayer(Player.Four)} />
        </View>
      </View>
      <Text>The game will start when every seat has a name.</Text>
      {player !== undefined ? (
        <YourSeat
          playerNames={playerNames}
          player={player}
          onNameChange={name => {
            changeName(gameId, player, name);
          }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 48
  }
});
