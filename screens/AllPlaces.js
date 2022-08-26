import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/database";

export default function AllPlaces() {
	const isFocused = useIsFocused();
	const [places, setPlaces] = React.useState(null);

	useEffect(() => {
		if (isFocused) {
			fetchPlaces().then((placesData) => setPlaces(placesData));
		}
	}, [isFocused]);

	return <PlacesList places={places} />;
}
