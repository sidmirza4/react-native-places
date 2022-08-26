import { View, StyleSheet, Alert, Image, Text } from "react-native";
import React, { useEffect } from "react";
import {
	getCurrentPositionAsync,
	useForegroundPermissions,
	PermissionStatus,
} from "expo-location";
import {
	useNavigation,
	useRoute,
	useIsFocused,
} from "@react-navigation/native";

import { getAddress, getMapPreview } from "../../util/location";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";

export default function LocationPicker({ onPickLocation }) {
	const navigation = useNavigation();
	const route = useRoute();
	const isFocused = useIsFocused();
	const [location, setLocation] = React.useState(null);
	const [locationPermission, requestPermission] = useForegroundPermissions();

	useEffect(() => {
		if (isFocused && route.params) {
			const mapPickedLocation = route.params.pickedLocation;
			setLocation(mapPickedLocation);
		}
	}, [route, isFocused]);

	async function verifyPermission() {
		if (locationPermission.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission();

			return permissionResponse.granted;
		}

		if (locationPermission.status === PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient permission",
				"Please grant location permission to use this feature.",
				[{ text: "OK" }]
			);

			return false;
		}

		return true;
	}

	async function getLocationHandler() {
		const hasPermission = await verifyPermission();

		if (!hasPermission) {
			return;
		}

		const locat = await getCurrentPositionAsync();
		setLocation({
			lat: locat.coords.latitude,
			lng: locat.coords.longitude,
		});
	}

	useEffect(() => {
		async function handleLocation() {
			if (location) {
				const address = await getAddress(location);
				onPickLocation({ ...location, address });
			}
		}

		handleLocation();
	}, [location, onPickLocation]);

	function pickLocationHandler() {
		navigation.navigate("Map");
	}

	let locationPreview = <Text>No location chosen yet.</Text>;

	if (location) {
		locationPreview = (
			<Image
				source={{ uri: getMapPreview(location.lat, location.lng) }}
				style={styles.image}
			/>
		);
	}

	return (
		<View>
			<View style={styles.mapPreview}>{locationPreview}</View>
			<View style={styles.actions}>
				<OutlinedButton icon="location" onPress={getLocationHandler}>
					Locate me
				</OutlinedButton>
				<OutlinedButton icon="map" onPress={pickLocationHandler}>
					Pick on map
				</OutlinedButton>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mapPreview: {
		width: "100%",
		height: 200,
		marginVertical: 10,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.primary100,
		borderRadius: 4,
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: 4,
	},
});
