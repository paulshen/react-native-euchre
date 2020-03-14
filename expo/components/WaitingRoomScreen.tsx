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
    <View style={styles.yourSeat}>
      <TextInput
        value={name}
        placeholder="Enter Name"
        onChangeText={setName}
        style={styles.nameInput}
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
  function renderPlayerName(player: Player) {
    const playerName = playerNames[player];
    return playerName !== undefined ? (
      <Text style={styles.playerName}>{playerName}</Text>
    ) : (
      <Text style={styles.playerEmpty}>Not taken</Text>
    );
  }
  function renderSitButton(p: Player) {
    return (
      <CustomButton
        label={p === player ? "You are here" : "Sit Here"}
        onPress={() => setPlayer(p)}
        style={styles.button}
      />
    );
  }
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Game {gameId}</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.team}>
          <Text style={styles.teamLabel}>Team One</Text>
          {renderPlayerName(Player.One)}
          {renderSitButton(Player.One)}
          {renderPlayerName(Player.Three)}
          {renderSitButton(Player.Three)}
        </View>
        <View style={styles.teamSpacer} />
        <View style={styles.team}>
          <Text style={styles.teamLabel}>Team Two</Text>
          {renderPlayerName(Player.Two)}
          {renderSitButton(Player.Two)}
          {renderPlayerName(Player.Four)}
          {renderSitButton(Player.Four)}
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
  team: { alignItems: "flex-start" },
  button: { marginBottom: 24 },
  teamLabel: { fontSize: 18, marginBottom: 16, fontWeight: "600" },
  teamSpacer: { width: 48 },
  playerName: { fontSize: 18, marginBottom: 8 },
  playerEmpty: {
    fontSize: 18,
    marginBottom: 8,
    color: "#999999",
    fontStyle: "italic"
  },
  note: { marginTop: 32 },
  yourSeat: {
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: 16
  },
  nameInput: {
    borderColor: "#999999",
    borderWidth: 1,
    alignSelf: "stretch",
    marginHorizontal: 16,
    paddingHorizontal: 8,
    marginBottom: 8,
    height: 36
  }
});
