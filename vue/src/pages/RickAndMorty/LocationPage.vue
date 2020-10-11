<template>
	<div
		class="location-page"
	>
		<location-card
			:location="location"
		>
		</location-card>

		<div
			class="card-bin"
			v-if="hasResidents"
		>
			<character-card
				v-for="(resident, index) in orderedResidents"
				:key="'r' + index"
				:character="resident"
			>
			</character-card>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import _ from "lodash";

	import * as RickAndMortyApi from '../../Api/RickAndMortyApi.js'

	import LocationCard  from "../../components/RickAndMorty/LocationCard";
	import CharacterCard from "../../components/RickAndMorty/CharacterCard";

	export default {
		name: "LocationPage",
		components: {
			'character-card': CharacterCard,
			'location-card': LocationCard
		},
		props: {
			locationId: {
				default: 0,
				type: Number
			}
		},
		data () {
			return {
				locationData: {},
				characterList: []
			}
		},
		computed: {
			location () {
				return this.locationData
			},
			hasResidents () {
				return _.size(this.location.residents || []) > 0
			},
			orderedResidents () {
				return _.orderBy(this.characterList, ['id'], ['asc'])
			}
		},
		methods: {
			getLocation () {
				RickAndMortyApi.getLocation({
					id: this.locationId
				}).then(result => {
					Vue.set(this, 'locationData', result)

					// make sure characterList is empty
					Vue.set(this, 'characterList', [])
					_.forEach(result.residents, characterUrl => {
						this.getCharacterWithUrl(characterUrl)
					})
				})
			},
			getCharacterWithUrl (characterUrl) {
				RickAndMortyApi.getCharacterWithUrl({
					characterUrl: characterUrl
				}).then(result => {
					Vue.set(this.characterList, _.size(this.characterList), result)
				})
			}
		},
		watch: {
			locationId: {
				handler () {
					this.getLocation()
				},
				immediate: true
			}
		}
	}
</script>

<style lang="scss" scoped>

	.location-page {
		display: flex;
		flex-direction: column;
		padding: 20px;
		align-items: center;
		justify-content: center;
		height: 100%;

		.card-bin {
			align-content: flex-start;
			display: flex;
			flex-flow: row wrap;
			height: calc(100% - 130px);
			overflow-y: auto;
			padding: 20px;
		}
	}

</style>