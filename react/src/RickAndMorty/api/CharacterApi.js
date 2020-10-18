export default {

	async fetchCharacter ({ characterId }) {
		const url = "https://rickandmortyapi.com/api/character/" + characterId;
		const response = await fetch(url);
		const data = await response.json();
		return data
	}
}