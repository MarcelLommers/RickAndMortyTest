<template>
	<div
		class="location-card"
		@click="goToLocation"
	>
		<div
			class="card-header"
		>
			<label
				class="name"
				v-text="location.name"
			>
			</label>

			<label
				class="dimension"
				v-text="location.dimension"
				:title="location.dimension"
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
					v-html="'<b>Type: </b>' + location.type"
				>
				</span>
				<span
					v-html="'<b>Name: </b>' + location.name"
				>
				</span>
				<span
					v-html="'<b>Dimension: </b>' + location.dimension"
				>
				</span>
				<span
					v-html="'<b>residents registered: </b>' + residentCount"
				>
				</span>

			</div>
		</div>
	</div>
</template>

<script>
	import _ from 'lodash'

	export default {
		name: "LocationCard",
		props: {
			location: {
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
			IsRoutedLocationId () {
				return this.$route.params.locationId === this.location.id
			},
			residentCount () {
				return _.size(this.location.residents)
			}
		},
		methods: {
			goToLocation () {
				if (!this.IsRoutedLocationId) {
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

	.location-card {
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
			background-color: #70ce4c;
			color: white;
			padding: 2px 10px;
			height: 25px;
			align-items: center;
			justify-content: space-between;

			.name {
				cursor: pointer;
				font-size: 18px;
			}

			.dimension {
				cursor: pointer;
				flex: 1 1;
				text-indent: 10px;
				text-align: left;
				font-size: 13px;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
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

		&:hover {

			.card-header {
				background-color: #30aa2a;
			}
		}
	}

</style>