const GOOGLE_API_KEY = "";

export function getMapPreview(lat, lng) {
	const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
&markers=color:red%7Clabel:S%7C${lat},${lng}
&key=${GOOGLE_API_KEY}`;

	return imagePreviewUrl;
}

export async function getAddress(coords) {
	const { lat, lng } = coords;
	const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error("Something went wrong");
	}

	const json = await response.json();
	const address = json.results[0].formatted_address;

	return address;
}
