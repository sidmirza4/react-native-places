import { View, Text, Alert, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
	launchCameraAsync,
	useCameraPermissions,
	PermissionStatus,
} from "expo-image-picker";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

export default function ImagePicker({ onTakeImage }) {
	const [image, setImage] = useState();
	const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

	async function verifyPermission() {
		if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission();

			return permissionResponse.granted;
		}

		if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient permission",
				"Please grant camera permission to use this feature.",
				[{ text: "OK" }]
			);

			return false;
		}

		return true;
	}

	async function takeImage() {
		const hasPermission = await verifyPermission();

		if (!hasPermission) {
			return;
		}

		const image = await launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});

		setImage(image.uri);
		onTakeImage(image.uri);
	}

	let imagePreview = <Text>No image taken yet.</Text>;

	if (image) {
		imagePreview = <Image source={{ uri: image }} style={styles.image} />;
	}

	return (
		<View>
			<View style={styles.imagePreview}>{imagePreview}</View>

			<OutlinedButton icon="camera" onPress={takeImage}>
				Take Image
			</OutlinedButton>
		</View>
	);
}

const styles = StyleSheet.create({
	imagePreview: {
		width: "100%",
		height: 200,
		marginVertical: 10,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.primary100,
		borderRadius: 4,
	},

	image: {
		width: "100%",
		height: "100%",
		borderRadius: 4,
	},
});
