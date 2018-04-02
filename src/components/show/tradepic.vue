<template>
	<div class="v-showbox">
		<div class="v-title">
			<h3>服务亭现场交易图片 <a href="javascript:;" onclick="history.back()">关闭</a></h3>
		</div>
		<el-carousel :interval="30000" type="card" height="605px" arrow="always">
			<el-carousel-item v-for="item in picData" :key="item">
				<img :src="item" alt="">
			</el-carousel-item>
		</el-carousel>
	</div>
</template>
<script>
	import axios from 'axios'

	export default {
		data() {
			return {
				picData: []
			}
		},
		mounted() {
			this.getImg()
		},
		methods: {
			getImg(){
				let orderNum = this.$route.params.id
				if( ! orderNum) return
				axios.get(baseUrl + `/userfactory/checkimage?orderNum=${orderNum}`).then( (data) => {
					let res = data.data
					let imageUrl = res.imageUrl
					let imgArr = res.pathList
					this.picData = imgArr.map( (item) => {
						return imageUrl + item
					})
				})
			}
		},
		// watch: {
		// 	'$route': 'getImg'
		// },
		beforeRouteLeave(to, from, next){
			this.$destroy()
			next()
		},
		beforeRouteUpdate(to, from, next){
			this.getImg()
			next()
		}
	}
</script>
<style scoped lang="less">
	.v-showbox{
		width: 96%;
		height: 900px;
		min-height: 900px;
		margin: 0 1.875%;
		margin-bottom: 50px;
		padding-bottom: 5px;
		//border: 1px solid red;
		background: url(../../assets/img/shadow-bg.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		left: 0px;
		top: 222px;
		display: flex;
		flex-direction: column;
		align-items: center;

		.el-carousel{
			flex: 1;
			width: 88%;
			height: 99%;
			margin-top: 100px;
		}

		.v-title{
			width: 100%;
			height: 80px;
			line-height: 80px;
			z-index: 1;
			text-align: center;
			background: url(../../assets/img/show-title.png) no-repeat center;
			h3{
				font-size: 24px;
				color: #00ffd6;

				a{
					color: #00ffd6;
					font-size: 18px;
					float: right;;
					margin-right: 20px;
				}
			}
		}
	}
	.el-carousel__item {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent !important;
		img{
			max-width: 100%;
			max-height: 100%;
		}
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
</style>
