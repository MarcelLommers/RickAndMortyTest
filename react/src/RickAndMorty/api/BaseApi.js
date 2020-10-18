export default {

	async fetchFromUrl ({ targetUrl }) {
		const url = targetUrl;
		const response = await fetch(url);
		const data = await response.json();
		return data
	}
}