import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

export default function PlacesList({ places }) {
	const navigation = useNavigation();

	function selectPlaceHandler(id) {
		navigation.navigate("PlaceDetails", {
			placeId: id,
		});
	}

	if (!places || places.length === 0) {
		return (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}>
					No places found - start adding some.
				</Text>
			</View>
		);
	}

	return (
		<FlatList
			style={styles.list}
			data={places}
			keyExtractor={(place) => place.id}
			renderItem={({ item }) => (
				<PlaceItem
					place={item}
					onSelect={selectPlaceHandler.bind(this, item.id)}
				/>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	list: {
		margin: 24,
	},

	fallbackContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	fallbackText: {
		fontSize: 16,
		color: Colors.primary200,
	},
});
