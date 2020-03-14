import * as React from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { CardSuitText } from "../components/CardView";
import { CardSuit } from "../game/Card";
import {
  callAnyTrump,
  callFlippedTrump,
  passAnyTrump,
  passFlippedTrump
} from "../game/Controller";
import { Player } from "../game/Player";
import { Round, TurnAction } from "../game/Round";
import { GameIdContext } from "./ReactContext";

function CustomButton({
  label,
  onPress,
  disabled,
  style
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.customButton,
        disabled === true ? styles.customButtonDisabled : null,
        style
      ]}
    >
      <Text style={styles.customButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

function CallFlippedTrumpView({
  gameId,
  round,
  player
}: {
  gameId: string;
  round: Round;
  player: Player;
}) {
  const [alone, setAlone] = React.useState(false);
  return (
    <View style={styles.root}>
      <View style={styles.aloneRow}>
        <Text style={styles.aloneRowLabel}>Alone?</Text>
        <Switch value={alone} onValueChange={setAlone} />
      </View>
      <View style={styles.submitRow}>
        <CustomButton
          label="Call"
          onPress={() => callFlippedTrump(gameId, round, player, alone)}
        />
        <View style={styles.submitRowSpacer} />
        <CustomButton
          label="Pass"
          onPress={() => passFlippedTrump(gameId, round, player)}
        />
      </View>
    </View>
  );
}

function CallAnyTrumpView({
  gameId,
  round,
  player,
  disallowSuit
}: {
  gameId: string;
  round: Round;
  player: Player;
  disallowSuit: CardSuit;
}) {
  const [chosenSuit, setChosenSuit] = React.useState<CardSuit | undefined>();
  const [alone, setAlone] = React.useState(false);
  const renderSuit = (suit: CardSuit) =>
    suit !== disallowSuit ? (
      <TouchableOpacity
        onPress={() => setChosenSuit(suit)}
        style={[
          styles.suitButton,
          chosenSuit === suit ? styles.suitButtonSelected : null
        ]}
      >
        <CardSuitText
          suit={suit}
          style={[
            styles.suitButtonText,
            chosenSuit === suit ? styles.suitButtonTextSelected : null
          ]}
        />
      </TouchableOpacity>
    ) : null;
  return (
    <View style={styles.root}>
      <View style={styles.chooseSuitRow}>
        {renderSuit(CardSuit.Club)}
        {renderSuit(CardSuit.Diamond)}
        {renderSuit(CardSuit.Heart)}
        {renderSuit(CardSuit.Spade)}
      </View>
      <View style={styles.aloneRow}>
        <Text style={styles.aloneRowLabel}>Alone?</Text>
        <Switch value={alone} onValueChange={setAlone} />
      </View>
      <View style={styles.submitRow}>
        <CustomButton
          label="Call"
          disabled={chosenSuit === undefined}
          onPress={() => callAnyTrump(gameId, round, player, chosenSuit, alone)}
        />
        <View style={styles.submitRowSpacer} />
        <CustomButton
          disabled={player === round.dealer}
          label="Pass"
          onPress={() => passAnyTrump(gameId, round, player)}
        />
      </View>
    </View>
  );
}

export default function ActionView({
  round,
  player
}: {
  round: Round;
  player: Player;
}) {
  const gameId: string = React.useContext(GameIdContext)!;

  if (round.turnPlayer !== player) {
    return null;
  }

  switch (round.turnAction) {
    case TurnAction.CallFlippedTrump:
      return (
        <CallFlippedTrumpView gameId={gameId} player={player} round={round} />
      );
    case TurnAction.CallAnyTrump:
      return (
        <CallAnyTrumpView
          gameId={gameId}
          player={player}
          round={round}
          disallowSuit={round.flippedCard.suit}
        />
      );
    case TurnAction.DealerDiscardCard:
      return (
        <View style={styles.root}>
          <Text>Choose a card to discard</Text>
        </View>
      );
    case TurnAction.PlayCard:
      return (
        <View style={styles.root}>
          <Text>Play a card</Text>
        </View>
      );
  }
  throw new Error();
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    paddingTop: 32
  },
  submitRow: {
    flexDirection: "row",
    paddingHorizontal: 16
  },
  aloneRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  aloneRowLabel: {
    fontSize: 16,
    marginRight: 16
  },
  submitRowSpacer: {
    width: 16
  },
  customButton: {
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 16,
    flex: 1
  },
  customButtonText: {
    fontSize: 16
  },
  customButtonDisabled: {
    opacity: 0.3
  },
  chooseSuitRow: {
    flexDirection: "row",
    paddingHorizontal: 16
  },
  suitButton: {
    width: 48,
    height: 48,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  suitButtonSelected: { borderColor: "#e0e0e0", borderWidth: 1 },
  suitButtonText: {
    fontSize: 24,
    opacity: 0.5
  },
  suitButtonTextSelected: { opacity: 1 }
});
