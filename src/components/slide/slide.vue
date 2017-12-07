<template>
	<el-row class="v-slide">
		<ul>
			<li class=v-slide-1>
				<router-link to="/cs">报表统计</router-link>
			</li>
			<li class=v-slide-2>
				<router-link to="/cm">溯源展示</router-link>
			</li>
		</ul>

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
	.v-slide{
		ul{
			li{
				width: 100%;
				height: 70px;
				a{
					display: block;
					width: 100%;
					text-align: center;
					line-height: 70px;
					color: #fff;
					font-size: 22px;
				}

				a.router-link-active{
					background: url('../../assets/img/slide-active.png') no-repeat center;
				}
			}
			li.v-slide-1{
				background: url('../../assets/img/ico-slide-tab-1.png') no-repeat 7.63358778625954% center;
				background-size: 26px 26px;
			}
			li.v-slide-2{
				background: url('../../assets/img/ico-slide-tab-2.png') no-repeat 7.63358778625954% center;
				background-size: 26px 26px;
			}
		}
	}
</style>