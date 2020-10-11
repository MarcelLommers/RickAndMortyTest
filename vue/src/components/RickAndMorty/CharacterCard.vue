<template>
	<div
		class="character-card"
		@click="goToCharacter"
	>
		<div
			class="card-header"
		>
			<label
				class="name"
				v-text="character.name"
			>
			</label>

			<label
				class="origin"
				v-if="character.origin"
				v-text="character.origin.name"
				:title="character.origin.name"
				@click.stop="goToOrigin"
			>
			</label>

			<span
				class="species"
				v-text="character.species"
			>
			</span>


		</div>

		<div
			class="card-content"
		>
			<img
				:src="character.image"
			>

			<div
				class="profile"
			>
				<label
					class="location"
					v-html="'<b>Dimension of origin: </b><br>' + profileOrigin"
					@click.stop="goToOrigin"
				>
				</label>
				<label
					class="location"
					v-html="'<b>Last known Location: </b><br>' + profileLocation"
					@click.stop="goToLocation"
				>
				</label>
				<br>
				<span
					v-html="'<b>Status: </b>' + profileStatus"
				>
				</span>
				<span
					v-html="'<b>Gender: </b>' + profileGender"
				>
				</span>
				<span
					v-html="'<b>Sightings: </b>' + profileSightings"
				>
				</span>

			</div>
		</div>
	</div>
</template>

<script>
	import _ from 'lodash'
	import Vue from "vue";

	import * as RickAndMortyApi from "../../Api/RickAndMortyApi";

	export default {
		name: "CharacterCard",
		props: {
			character: {
				default: function () {
					return {
						origin: {
							name: '',
							url: ''
						}
					}
				},
				type: Object
			}
		},
		data () {
			return {
				origin: {
					id: 1,
					name: '',
					url: ''
				},
				location: {
					id: 1,
					name: '',
					url: ''
				}
			}
		},
		mounted () {
			this.getOriginWithUrl()
			this.getLocationWithUrl()
		},
		computed: {
			IsRoutedCharacterId () {
				return this.$route.params.characterId === this.character.id
			},
			OriginIsRoutedLocationId () {
				return this.$route.params.locationId === this.origin.id
			},
			LocationIsRoutedLocationId () {
				return this.$route.params.locationId === this.location.id
			},
			profileStatus () {
				return this.character.status
			},
			profileGender () {
				return this.character.gender
			},
			profileOrigin () {
				let result = ''

				if (this.character &&
					this.character.origin) {
					result = this.character.origin.name
				}

				return result
			},
			profileLocation () {
				let result = ''

				if (this.character &&
					this.character.location) {
					result = this.character.location.name
				}

				return result
			},
			profileSightings () {
				return _.size(this.character.episode)
			}
		},
		methods: {
			getOriginWithUrl () {
				if (this.character &&
					this.character.origin &&
					this.character.origin.url) {
					RickAndMortyApi.getLocationWithUrl({
						locationUrl: this.character.origin.url
					}).then(result => {
						Vue.set(this, 'origin', result)
					})
				}
			},
			getLocationWithUrl () {
				if (this.character &&
					this.character.location &&
					this.character.location.url) {
					RickAndMortyApi.getLocationWithUrl({
						locationUrl: this.character.location.url
					}).then(result => {
						Vue.set(this, 'location', result)
					})
				}
			},
			goToCharacter () {
				if (!this.IsRoutedCharacterId) {
					this.$router.push({
						name: 'Rick and Morty - Character',
						params: {
							characterId: this.character.id
						}
					})
				}
			},
			goToOrigin () {
				if (!this.OriginIsRoutedLocationId) {
					this.$router.push({
						name: 'Rick and Morty - Location',
						params: {
							locationId: this.origin.id
						}
					})
				}
			},
			goToLocation () {
				if (!this.LocationIsRoutedLocationId) {
					this.$router.push({
						name: 'Rick and Morty - Location',
						params: {
							locationId: this.location.id
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

	.character-card {
		border: 1px solid #58585b;
		border-radius: 5px;
		cursor: pointer;
		min-height: 80px;
		margin: 5px 5px 20px 5px;
		text-align: left;
		overflow: hidden;
		width: 400px;

		-webkit-box-shadow: 3px 2px 22px -4px rgba(0,0,0,0.75);
		-moz-box-shadow: 3px 2px 22px -4px rgba(0,0,0,0.75);
		box-shadow: 3px 2px 22px -4px rgba(0,0,0,0.75);

		.card-header {
			display: flex;
			background-color: #97ce4c;
			color: white;
			padding: 2px 10px;
			height: 25px;
			align-items: center;
			justify-content: space-between;

			.name {
				font-size: 18px;
				cursor: pointer;
			}

			.origin {
				cursor: pointer;
				flex: 1 1;
				text-indent: 10px;
				text-align: left;
				font-size: 13px;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;

				&:hover {
					color: #30aa2a;
				}
			}

			.species {
				text-align: right;
				font-size: 13px;
			}
		}

		.card-content {
			display: flex;
			font-size: 13px;
			flex: 1 1;
			padding: 10px 15px 20px;
			overflow-y: auto;

			img {
				height: 100px;
				width: 100px;
			}

			.profile {
				padding: 0 10px;
				display: flex;
				flex-direction: column;

				span,
				label {
					cursor: pointer;
				}

				.location {
					&:hover {
						color: #30aa2a;
					}
				}
			}
		}

		&:hover {

			.card-header {
				background-color: #70ce4c;
			}
		}
	}

</style>