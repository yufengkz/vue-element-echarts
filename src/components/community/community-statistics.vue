<!-- 柱状图 -->
<template>
	<div class="columnChart">
		<!--搜索组件-->
		<SearchSlide></SearchSlide>
		<!--图表-->
		<el-row>
			<el-col :span="12">
				<div class="grid-content bg-purple">
					<!--柱状图-->
					<column></column>
				</div>
			</el-col>
			<el-col :span="12" :style="{'margin-left': '20px'}">
				<div class="grid-content bg-purple-light">
					<!--折线图-->
					<multipleColumn></multipleColumn>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="list_bd">
					<!--list-->
					<lists></lists>
				</div>
			</el-col>
			<el-col :span="12" :style="{'margin-left': '20px'}">
				<div class="list_bd">
					<!--list-->
					<lists></lists>
				</div>
			</el-col>
		</el-row>

	</div>

</template>

<script>

	import SearchSlide from '../search/search'
	import column from '../column/column'
	import multipleColumn from '../multipleColumn/multipleColumn'
	import lists from './lists'

	export default {
		created() {
			//console.log(this.$store.state.color)
		},
		methods: {},
		components: {
			SearchSlide,
			column, //柱状图
			multipleColumn, //折线图
			lists //lists
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
	.list_bd{
		border: 1px solid #385585;
		margin-top: 20px;
		padding-top: 15px;
		background: #051030;
	}
</style>
