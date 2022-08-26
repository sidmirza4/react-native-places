import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";

import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../util/database";

export default function PlaceDetails({ route, navigation }) {
	const [place, setPlace] = React.useState(null);
	const placeId = route.params.placeId;

	useEffect(() => {
		async function fetchPlace() {
			const place = await fetchPlaceDetails(placeId);
			setPlace(place);
		}

		fetchPlace();
	}, [placeId]);

	function showOnMapHandler() {}

	return (
		<ScrollView>
			<Image source={{ uri: place.imageUri }} style={styles.image} />
			<View style={styles.locationContainer}>
				<View style={styles.addressContainer}>
					<Text style={styles.address}>{place.address}</Text>
				</View>
				<OutlinedButton icon="map" onPress={showOnMapHandler}>
					View on map
				</OutlinedButton>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	screen: {
		alignItems: "center",
	},

	image: {
		height: "35%",
		minHeight: 300,
		width: "100%",
	},

	locationContainer: {
		justifyContent: "center",
		alignItems: "center",
	},

	addressContainer: {
		padding: 20,
	},

	address: {
		color: Colors.primary500,
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 16,
	},
});
