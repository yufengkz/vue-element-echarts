<template>
	<div id="app">
		<el-container>
			<el-header style="height: 222px;">
				<MHeader></MHeader>
			</el-header>
			<el-container class="v-container">
				<el-aside width="262px">
					<Slide></Slide>
				</el-aside>
				<el-main>
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

	export default {
		name: 'app',
		components: {
			MHeader,
			Slide
		}
	}
</script>

<style lang="less">
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
		width: 262px;
		height: 1179px;
		background: url('./assets/img/left-side-bg.png') center no-repeat;
		background-size: 100% 100%;
	}
	.el-main{
		padding: 0;
		margin-left: 15px;
	}
</style>
