<template>
	<el-row class="tac">
		<el-col :span="24">
			<el-menu
					default-active="2"
					class="el-menu-vertical-demo"
					@open="handleOpen"
					@close="handleClose">
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>统计</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="1-1">
							<router-link to="/cs">服务亭统计</router-link>
						</el-menu-item>
						<el-menu-item index="1-2">
							<router-link to="/cm">服务亭map</router-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>溯源</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="2-1">选项1</el-menu-item>
						<el-menu-item index="2-2">选项2</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>
<style scoped lang="less">
	.el-menu-item{
		a{
			display: block;
		}
	}
	.el-menu-item.is-active{
		a{
			color: red;
		}
	}
</style>