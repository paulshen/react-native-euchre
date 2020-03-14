import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

export default function CustomButton({
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

const styles = StyleSheet.create({
  customButton: {
    backgroundColor: "#0C2AAF",
    borderRadius: 8,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  customButtonText: {
    color: "#ffffff",
    fontSize: 16
  },
  customButtonDisabled: {
    opacity: 0.3
  }
});
