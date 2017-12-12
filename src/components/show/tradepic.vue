<template>
	<div class="v-showbox">
		<div class="v-title">
			<h3>服务亭现场交易图片</h3>
		</div>
		<el-carousel :interval="30000" type="card" height="605px" arrow="always">
			<el-carousel-item v-for="item in 8" :key="item">
				<img src="../../assets/img/poly1.jpg" alt="">
			</el-carousel-item>
		</el-carousel>
	</div>
</template>
<script>
	export default {}
</script>
<style scoped lang="less">
	.v-showbox{
		width: 96%;
		height: 900px;
		min-height: 900px;
		margin: 0 1.875%;
		margin-bottom: 50px;
		//border: 1px solid red;
		background: url(../../assets/img/shadow-bg.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		left: 0px;
		top: 222px;
		display: flex;
		align-items: center;
		justify-content: center;

		.el-carousel{
			width: 90%;
		}

		.v-title{
			position: absolute;
			top: 40px;
			left: 0;
			width: 100%;
			z-index: 1;
			text-align: center;
			background: url(../../assets/img/show-title.png) no-repeat center;
			h3{
				font-size: 24px;
				color: #00ffd6;
			}
		}
	}


	.el-carousel__item {
		img{
			width: 100%;
			height: 100%;
		}
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
</style>
