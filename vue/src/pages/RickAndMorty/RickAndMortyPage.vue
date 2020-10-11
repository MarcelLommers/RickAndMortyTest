<template>
	<div
		class="rick-and-morty-page"
	>
		<h1
			v-text="videoResources[0].title"
		>
		</h1>

		<iframe
			class="plumbus-video"
			:src="videoResources[0].embedUrl"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		>
		</iframe>
	</div>
</template>

<script>
	export default {
		name: "RickAndMortyPage",
		components: {
		},
		data () {
			return {
				videoResources: [
					{
						title: 'Plumbus: How do they they do it',
						embedUrl: 'https://www.youtube.com/embed/eMJk4y9NGvE'
					}
				]
			}
		},
		mounted () {
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>

	.rick-and-morty-page {
		display: flex;
		flex-direction: column;
		padding: 20px;
		align-items: center;
		justify-content: flex-start;
		height: 100%;
		background-color: #fbdac7;

		h1 {
			color: #ebaa96;
		}

		.plumbus-video {
			width: 560px;
			height: 315px;
			background-color: #fa9a9c;
			border-radius: 5px;

			-webkit-box-shadow: 3px 2px 22px -4px rgba(0,0,0,0.75);
			-moz-box-shadow: 3px 2px 22px -4px rgba(0,0,0,0.75);
			box-shadow: 3px 2px 22px -4px rgba(0,0,0,0.75);
		}
	}

</style>