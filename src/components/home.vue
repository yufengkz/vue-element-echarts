<template>
	<h3 class="v-home">
		{{msg}}
	</h3>
</template>

<script>
	export default {
		name: 'home',
		data() {
			return {
				msg: '欢迎来到桑德新环卫'
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.v-home{
		height: 800px;
		background: url(../assets/img/pro-bg.png) no-repeat;
		background-size: 100% 100%;
		color: #fff;
		text-align: center;
		line-height: 800px;
		font-size: 50px;
	}
</style>
