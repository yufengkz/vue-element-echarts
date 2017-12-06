<template>
	<div id="app">
		<el-container>
			<el-header>Header</el-header>
			<el-container>
				<el-aside width="200px">
					<Slide></Slide>
				</el-aside>
				<el-main>
					<!--面包屑导航组件-->
					<Breadcrumb></Breadcrumb>
					<!--搜索组件-->
					<SearchSlide></SearchSlide>

					<!--路由-->
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import MHeader from './components/header/header'
	import Slide from './components/slide/slide'
	import Breadcrumb from './components/breadcrumb/breadcrumb'
	import SearchSlide from './components/search/search'

	export default {
		name: 'app',
		components: {
			MHeader,
			Slide,
			Breadcrumb,
			SearchSlide
		}
	}
</script>

<style>
	.el-header, .el-footer {
		background-color: #B3C0D1;
		color: #333;
	}

	.el-aside {
		background-color: #D3DCE6;
		color: #333;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
	}
</style>
