<!-- 柱状图 -->
<template>
	<div class="columnChart">
		<!--搜索组件-->
		<SearchSlide></SearchSlide>
		<!--图表-->
		<el-row>
			<el-col :span="24">
				<div>
					<ProcessLists></ProcessLists>
				</div>
			</el-col>
		</el-row>

	</div>

</template>

<script>
	import SearchSlide from '../search/search'
	import ProcessLists from './process'

	export default {
		created() {
			//console.log(this.$store.state.color)
		},
		methods: {},
		components: {
			SearchSlide,
			ProcessLists
		},

	}
</script>

<style scoped lang="less">
	.el-row {
		margin-top: 20px;
	}

	.el-col-12 {
		width: 49.1%;
	}
</style>
