export default {

	async fetchEpisode ({ episodeId }) {
		const url = "https://rickandmortyapi.com/api/episode/" + episodeId;
		const response = await fetch(url);
		const data = await response.json();
		return data
	}

}