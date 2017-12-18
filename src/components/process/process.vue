<template>
	<div>
		<div class=pro-box ref="proBox">
			<ul class="v-animate" ref="vAnimate">
				<li>
					<a href="javascript:;">
						<div>
							<img src="../../assets/img/ico_user.png" alt="">
						</div>
						<p>用户</p>
					</a>
				</li>
				<li><div class=v-arrow><img src="../../assets/img/ico-arrow.png" alt=""></div></li>
				<li>
					<a href="javascript:;">
						<div>
							<img src="../../assets/img/ico_service.png" alt="">
						</div>
						<p>服务厅</p>
					</a>
				</li>
				<li><div><img src="../../assets/img/ico-arrow.png" alt=""></div></li>
				<li>
					<a href="javascript:;">
						<div>
							<img src="../../assets/img/ico_logistics.png" alt="">
						</div>
						<p>物流车辆</p>
					</a>
				</li>
				<li><div><img src="../../assets/img/ico-arrow.png" alt=""></div></li>
				<li>
					<a href="javascript:;">
						<div>
							<img src="../../assets/img/ico_packstation.png" alt="">
						</div>
						<p>打包站</p>
					</a>
				</li>
				<li><div><img src="../../assets/img/ico-arrow.png" alt=""></div></li>
				<li>
					<a href="javascript:;">
						<div>
							<img src="../../assets/img/ico_linecar.png" alt="">
						</div>
						<p>干线车辆</p>
					</a>
				</li>
				<li><div><img src="../../assets/img/ico-arrow.png" alt=""></div></li>
				<li>
					<a href="javascript:;">
						<div>
							<img src="../../assets/img/ico_factory.png" alt="">
						</div>
						<p>工厂</p>
					</a>
				</li>
			</ul>
		</div>
		<div ref="vLists" class=v-lists :class="{showall: true, active: showall}">
			<table>
				<tbody>
					<tr v-for="(item, index) in data" :key="item.id">
						<td>
							<p>{{item.id}}</p>
							<p>100513910637877</p>
							<p>No.20171127</p>
						</td>
						<td>
							<p>华美家园服务亭</p>
							<p>No.20171127</p>
							<p>废纸 20kg 共计20元</p>
							<p>创建时间：11-27 15：00</p>
							<router-link to="/tradepic">查看现场交易图片<i class="el-icon-d-arrow-right"></i></router-link>
						</td>
						<td>
							<p>No.1001</p>
							<p>车牌号：京A00001</p>
							<p>司机名称：王博1</p>
							<p>公司：锦秋货运</p>
							<p>发货时间：2017-11-27 18:00</p>
							<p>交货时间：2017-11-27 20:00</p>
							<router-link to="/routes">查看车辆行使轨迹<i class="el-icon-d-arrow-right"></i></router-link>
						</td>
						<td>
							<p>No.1001</p>
							<p>1号打包站-华美</p>
							<router-link to="/tradepic">查看现场交易图片<i class="el-icon-d-arrow-right"></i></router-link>
						</td>
						<td>
							<p>No.2001</p>
							<p>车牌号：京A00002</p>
							<p>司机名称：王博2</p>
							<p>公司：锦秋货运</p>
							<p>发货时间：2017-11-27 18:00</p>
							<p>交货时间：2017-11-27 20:00</p>
							<p>华美-1号打包站-1号工厂</p>
							<router-link to="/routes">查看车辆行使轨迹<i class="el-icon-d-arrow-right"></i></router-link>
						</td>
						<td>
							<p>No.2001</p>
							<p>1号工厂-1号打包站-华美</p>
						</td>
					</tr>
				</tbody>
			</table>

			<div class="showmore">
				<a href="javascript:;" @click="showMore" :class="{active: showall}">点击加载更多 <i class="el-icon-arrow-down"></i></a>
			</div>
		</div>
	</div>
</template>
<script>
	import  axios from 'axios'

	export default {
		data() {
			return {
				data: [],
				loaded: false,
				showall: false
			}
		},
		methods: {
			_getLists() {
				axios.get('../../../static/data/v-lists.json').then((res) => {
					this.data = res.data
				})
			},
			showMore(event) {
				this.showall = !this.showall
				if(this.showall === true) event.currentTarget.innerHTML = '收起 <i class="el-icon-arrow-up"></i>'
				if(this.showall === false) event.currentTarget.innerHTML = '点击加载更多 <i class="el-icon-arrow-down"></i>'
			},
			//图标进场动画
			animated(){
				let aLi = this.$refs.vAnimate.children
				let proBox = this.$refs.proBox
				let vLists = this.$refs.vLists
				function runAsync(elm, t, index) {
						//做一些异步操作
						setTimeout(() => {
							elm.className = 'slideInLeft animated'
							//执行到最后一个
							if(index == aLi.length - 1){
								setTimeout( () => {
									proBox.style.height = '180px'
									vLists.style.display = 'block'
								}, t)
							}
						}, t * index);
				}
				for(let i = 0; i < aLi.length; i ++){
					runAsync(aLi[i], 300 , i)
				}
			}
		},
		mounted() {
			this._getLists()
			this.animated()
		}
	}
</script>
<style scoped lang="less">
	.pro-box{
		height: 450px;
		padding:  0 3.17864% 0 4.16864%;
		background: url(../../assets/img/pro-bg.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		ul{
			display: flex;
			li{
				width: 6.845408%;
				margin-right: 2.246%;
				&:last-child{
					margin-right: 0;
				}
			}
			div{
				width: 100%;
				_height: 47.619048%;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.v-arrow{
				_margin: 0 0.803213%;
			}
			p{
				text-align: center;
				color: #00ffd6;
				margin-top: 20px;
				_line-height: 4.666666667;
			}
		}
	}
	.v-lists{
		display: none;
		width: 100%;
		background: url(../../assets/img/v-lists-bg.png) repeat-y;
		background-size: 100% 100%;
		margin-top: 20px;
		padding: 1px 0 46px 0;

		table{
			width: 100%;
		}
		tr{
			width: 10%;

			td{
				border-bottom: 1px solid #394157;
				border-right: 1px solid #394157;

				&:last-child{
					border-right: none;
				}

				p{
					color: #55d7ff;
					line-height: 30px;
					text-align: center;
					font-size: 16px;
				}
				a{
					display: block;
					text-align: center;
					line-height: 40px;
					color: #00ffd6;
				}
			}
		}

		.showmore{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			text-align: center;
			line-height: 45px;
			background: url(../../assets/img/showmore-bg.png);
			background-size: 100% 100%;
			transition: all 0.5s ease 0s;

			a{
				color: #00ffd6;
			}
			a.active {
				color: #ffab19;
			}
		}
	}
	.showall{
		height: 505px;
		overflow: hidden;
		transition: all 0.5s ease 0s;
	}
	.showall.active{
		height: auto;
		transition: all 0.5s ease 0s;
	}
	.el-icon-arrow-up:before{
		color: #00ffd6 !important;
	}

	//进场动画
	.v-animate{
		li{
			_display: none;
			opacity: 0;
		}
	}
	.animated {
		animation-duration: 0.3s;
		animation-fill-mode: both;
	}

	@keyframes slideInLeft {
		0% {
			transform: translate3d(-100%, 0, 0);
			visibility: visible;
			opacity: 0.2;
		}
		50%{
			transform: scale(1.6);
		}
		100% {
			transform: scale(1) translate3d(0, 0, 0);
			opacity: 1;
		}
	}

	.slideInLeft {
		animation-name: slideInLeft;
	}
</style>
