export default {

	async fetchLocation ({ locationId }) {
		const url = "https://rickandmortyapi.com/api/location/" + locationId;
		const response = await fetch(url);
		const data = await response.json();
		return data
	}

}