<template>
	<div
		class="location-page"
	>
		<paging-block
			:list-info="locationList.info"
			@newListData="updateLocationList"
		>
		</paging-block>

		<div
			class="card-bin"
		>
			<location-card
				v-for="(location, index) in locationList.results"
				:key="'l' + index"
				:location="location"
			>
			</location-card>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'

	import * as RickAndMortyApi from '../../Api/RickAndMortyApi.js'

	import PagingBlock from "../../components/RickAndMorty/PagingBlock";

	import LocationCard from "../../components/RickAndMorty/LocationCard";

	export default {
		name: "LocationPage",
		components: {
			'paging-block': PagingBlock,
			'location-card': LocationCard
		},
		data () {
			return {
				locationList: []
			}
		},
		mounted () {
			this.getAllLocations()
		},
		methods: {
			getAllLocations () {
				RickAndMortyApi.getAllLocations().then(result => {
					Vue.set(this, 'locationList', result)
				})
			},
			updateLocationList (newListData) {
				Vue.set(this, 'locationList', newListData)
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

		.paging-block {
			display: flex;
			align-items: center;

			.nav-button {
				margin: 5px;
			}
		}

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