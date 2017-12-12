<template>
	<h3>
		这是首页 - {{msg}}
	</h3>
</template>

<script>
	export default {
		name: 'home',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	h3{
		color: #fff;
	}
</style>
