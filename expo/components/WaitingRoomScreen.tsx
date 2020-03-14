import * as React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { changeName } from "../game/Controller";
import { Game } from "../game/Game";
import { Player } from "../game/Player";
import CustomButton from "./CustomButton";

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
      <Text style={styles.title}>Game {gameId}</Text>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Text style={styles.teamLabel}>Team One</Text>
          <Text style={styles.playerName}>{playerNames[Player.One]}</Text>
          <CustomButton
            label="Sit Here"
            onPress={() => setPlayer(Player.One)}
            style={styles.button}
          />
          <Text style={styles.playerName}>{playerNames[Player.Three]}</Text>
          <CustomButton
            label="Sit Here"
            onPress={() => setPlayer(Player.Three)}
            style={styles.button}
          />
        </View>
        <View style={styles.teamSpacer} />
        <View>
          <Text style={styles.teamLabel}>Team Two</Text>
          <Text style={styles.playerName}>{playerNames[Player.Two]}</Text>
          <CustomButton
            label="Sit Here"
            onPress={() => setPlayer(Player.Two)}
            style={styles.button}
          />
          <Text style={styles.playerName}>{playerNames[Player.Four]}</Text>
          <CustomButton
            label="Sit Here"
            onPress={() => setPlayer(Player.Four)}
            style={styles.button}
          />
        </View>
      </View>
      <Text style={styles.note}>
        The game will start when every seat has a name.
      </Text>
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
    alignItems: "center",
    flex: 1,
    paddingTop: 48
  },
  title: {
    fontSize: 24,
    marginBottom: 32
  },
  button: { marginBottom: 24 },
  teamLabel: { fontSize: 18, marginBottom: 16, fontWeight: "600" },
  teamSpacer: { width: 48 },
  playerName: { fontSize: 18, marginBottom: 8 },
  note: { marginTop: 16 }
});
