<template>
	<div id="app">
		<el-container>
			<el-header style="height: 222px;">
				<MHeader></MHeader>
			</el-header>
			<el-container class="v-container">
				<el-aside width="13.64583333333333%">
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
	body{
		width: 100%;
		height: 100%;
		background: url('./assets/img/bg.png') no-repeat;
		background-size: 100% 100%;
		background-size: cover;
		position:absolute;
		filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='./assets/img/bg.png',sizingMethod='scale');
	}
	.v-container{
		padding: 0 1.875%;
	}
	.el-aside{
		width: 100%;
		height: 1179px;
		background: url('./assets/img/left-side-bg.png') center no-repeat;
		background-size: 100% 100%;
	}
</style>
