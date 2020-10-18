<template>
	<div
		class="character-page"
	>
		<character-card
			v-if="character"
			:character="character"
		>
		</character-card>

		<div
			class="card-bin"
		>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'

	import * as RickAndMortyApi from '../../Api/RickAndMortyApi.js'

	import CharacterCard from "../../components/RickAndMorty/CharacterCard";

	export default {
		name: "CharacterPage",
		components: {
			'character-card': CharacterCard
		},
		props: {
			characterId: {
				default: 0,
				type: Number
			}
		},
		data () {
			return {
				character: {}
			}
		},
		methods: {
			getCharacter () {
				RickAndMortyApi.getCharacter({
					id: this.characterId
				}).then(result => {
					Vue.set(this, 'character', result)
				})
			},
		},
		watch: {
			characterId: {
				handler () {
					this.getCharacter()
				},
				immediate: true
			}
		}
	}
</script>

<style lang="scss" scoped>

	.character-page {
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