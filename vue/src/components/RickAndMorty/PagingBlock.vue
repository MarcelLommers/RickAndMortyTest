<template>
	<div
		class="paging-block"
	>
		<button
			class="nav-button"
			v-text="'<'"
			:disabled="!prevUrl"
			@click="loadPrevious"
		>
		</button>

<!--		todo: implement generic current interaction -->
<!--		<input-->
<!--			v-model="pagingData.current"-->
<!--			class="current-page"-->
<!--			type="number"-->
<!--			disabled-->
<!--		/>-->
<!--		<span-->
<!--			class="total-pages"-->
<!--			v-text="listInfo.pages"-->
<!--		>-->
<!--		</span>-->
		<span
			class="paging-display"
			v-text="pagingData.current + ' / ' + listInfo.pages"
		>
		</span>

		<button
			class="nav-button"
			v-text="'>'"
			:disabled="!nextUrl"
			@click="loadNext"
		>
		</button>
	</div>
</template>

<script>
	import * as BaseApi from '../../Api/baseApi.js'

	export default {
		name: "PagingBlock",
		props: {
			listInfo: {
				default: function () {
					return {
						count: 0,
						next: null,
						pages: 0,
						prev: null
					}
				},
				type: Object
			}
		},
		data () {
			return {
				pagingData: {
					current: 1
				}
			}
		},
		computed: {
			nextUrl () {
				return this.listInfo.next
			},
			prevUrl () {
				return this.listInfo.prev
			}
		},
		methods: {
			emitNewData (newData) {
				this.$emit('newListData', newData)
			},
			loadPrevious () {
				BaseApi.getJson({
					url: this.prevUrl
				}).then(result => {
					this.emitNewData(result)
					this.pagingData.current--
				})
			},
			loadNext () {
				BaseApi.getJson({
					url: this.nextUrl
				}).then(result => {
					this.emitNewData(result)
					this.pagingData.current++
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

	.paging-block {
		display: flex;
		align-items: center;

		.current-page {
			width: 60px;
		}
		.total-pages {
			margin-left: 5px;
		}

		.nav-button {
			margin: 5px;
		}
	}

</style>