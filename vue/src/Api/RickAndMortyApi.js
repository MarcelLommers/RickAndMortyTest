import { getJson } from './baseApi.js'

export function getAllCharacters ({ page = 1 }) {
	return getJson({
		url: 'https://rickandmortyapi.com/api/character',
		data: {
			page: page
		}
	})
}

export function getCharacterWithUrl ({ characterUrl }) {
	return getJson({
		url: characterUrl
	})
}
export function getCharacter ({ id }) {
	return getJson({
		url: 'https://rickandmortyapi.com/api/character/' + id
	})
}

export function getAllLocations () {
	return getJson({
		url: 'https://rickandmortyapi.com/api/location'
	})
}
export function getLocationWithUrl ({ locationUrl }) {
	return getJson({
		url: locationUrl
	})
}

export function getLocation ({ id }) {
	return getJson({
		url: 'https://rickandmortyapi.com/api/location/' + id
	})
}

export function getAllDimensions () {
	return getJson({
		url: 'https://rickandmortyapi.com/api/location?type=Dimension'
	})
}

export function getAllEpisodes () {
	return getJson({
		url: 'https://rickandmortyapi.com/api/episode'
	})
}

export function getEpisode ({ id }) {
	return getJson({
		url: 'https://rickandmortyapi.com/api/episode/' + id
	})
}