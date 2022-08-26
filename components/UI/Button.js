import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";

export default function Button({ onPress, children }) {
	return (
		<Pressable
			style={({ pressed }) => [styles.button, pressed && styles.pressed]}
			onPress={onPress}
		>
			<Text style={styles.text}>{children}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		margin: 4,
		backgroundColor: Colors.primary800,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 2,
		borderRadius: 4,
	},
	pressed: {
		opacity: 0.7,
	},
	text: {
		textAlign: "center",
		fontSize: 16,
		color: Colors.primary50,
	},
});
