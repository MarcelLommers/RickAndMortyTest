<template>
	<div
		class="episode-card"
	>
		<div
			class="card-header"
		>
			<label
				class="name"
				v-text="episode.name"
				@click="goToEpisode"
			>
			</label>

		</div>

		<div
			class="card-content"
		>

			<div
				class="profile"
			>
				<span
					v-html="'<b>episode: </b>' + episode.episode"
				>
				</span>
				<span
					v-html="'<b>original airing: </b>' + episode['air_date']"
				>
				</span>
				<span
					v-html="'<b>characters identified: </b>' + charsIdentified"
				>
				</span>

			</div>
		</div>
	</div>
</template>

<script>
	import _ from 'lodash'

	export default {
		name: "EpisodeCard",
		props: {
			episode: {
				default: function () {
					return {}
				},
				type: Object
			}
		},
		data () {
			return {
			}
		},
		computed: {
			charsIdentified () {
				return _.size(this.episode.characters)
			}
		},
		methods: {
			goToEpisode () {
				this.$router.push({
					name: 'Rick and Morty - Episode',
					params: {
						episodeId: this.episode.id
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

	.episode-card {
		border: 1px solid #58585b;
		border-radius: 5px;
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
				cursor: pointer;
				font-size: 18px;

				&:hover {
					color: #eeeeee;
				}
			}
		}

		.card-content {
			display: flex;
			font-size: 13px;
			flex: 1 1;
			padding: 10px 15px 20px;
			overflow-y: auto;

			.profile {
				padding: 0 10px;
				display: flex;
				flex-direction: column;
			}
		}
	}

</style>