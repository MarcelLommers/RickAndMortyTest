<template>
	<div
		class="characters-page"
	>
		<paging-block
			:list-info="characterList.info"
			@newListData="updateCharacterList"
		>
		</paging-block>

		<div
			class="card-bin"
		>
			<character-card
				v-for="(character, index) in characterList.results"
				:key="'c' + index"
				:character="character"
			>
			</character-card>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'

	import * as RickAndMortyApi from '../../Api/RickAndMortyApi.js'

	import PagingBlock from "../../components/RickAndMorty/PagingBlock";

	import CharacterCard from "../../components/RickAndMorty/CharacterCard";

	export default {
		name: "CharacterPage",
		components: {
			'paging-block': PagingBlock,
			'character-card': CharacterCard
		},
		data () {
			return {
				characterList: []
			}
		},
		mounted () {
			this.getAllCharacters()
		},
		methods: {
			getAllCharacters () {
				RickAndMortyApi.getAllCharacters({
					page: 1
				}).then(result => {
					Vue.set(this, 'characterList', result)
				})
			},
			updateCharacterList (newListData) {
				Vue.set(this, 'characterList', newListData)
			}
		}
	}
</script>

<style lang="scss" scoped>

	.characters-page {
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