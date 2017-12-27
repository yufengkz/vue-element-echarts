<template>
	<div>
		<div class=pro-box    ref="proBox">
			<ul class="v-animate" ref="vAnimate">
				<li>
					<a href="javascript:;">
						<div>
							<img src="../../assets/img/ico_user.png" alt="">
						</div>
						<p>用户</p>
					</a>
				</li>
				<li>
					<div class=v-arrow><img src="../../assets/img/ico-arrow.png" alt=""></div>
				</li>
				<li>
					<a href="javascript:;">
						<div>
							<img src="../../assets/img/ico_service.png" alt="">
						</div>
						<p>服务厅</p>
					</a>
				</li>
				<li>
					<div><img src="../../assets/img/ico-arrow.png" alt=""></div>
				</li>
				<li>
					<a href="javascript:;">
						<div>
							<img src="../../assets/img/ico_logistics.png" alt="">
						</div>
						<p>物流车辆</p>
					</a>
				</li>
				<li>
					<div><img src="../../assets/img/ico-arrow.png" alt=""></div>
				</li>
				<li>
					<a href="javascript:;">
						<div>
							<img src="../../assets/img/ico_packstation.png" alt="">
						</div>
						<p>打包站</p>
					</a>
				</li>
				<li>
					<div><img src="../../assets/img/ico-arrow.png" alt=""></div>
				</li>
				<li>
					<a href="javascript:;">
						<div>
							<img src="../../assets/img/ico_linecar.png" alt="">
						</div>
						<p>干线车辆</p>
					</a>
				</li>
				<li>
					<div><img src="../../assets/img/ico-arrow.png" alt=""></div>
				</li>
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
		<div ref="vLists" class=v-lists    :class="{showall: true, active: showall}">
			<div v-if="data.length > 0">
				<table>
					<tbody>
					<tr v-for="(item, index) in data" :key="index">
						<!--第一列-->
						<td v-if="item.orderNum">
							<p>{{item.userName}}</p>
							<p>{{item.userMobile}}</p>
							<p>{{item.address}}</p>
							<p>{{item.orderNum}}</p>
							<p>No.{{item.recycleOrderCtime | formatDate}}</p>
						</td>
						<td v-else="item.orderNum" :style="style">
							<p>——</p>
						</td>
						<!--第二列-->
						<td v-if="item.orderNum">
							<p>{{item.orderNum}}</p>
							<p>No.{{item.orderNum}}</p>
							<div>
							<span class="v-more" @mouseover="_getRecycleDetail(item.orderNum)"> 查看回收品类 >
								<div class="v-more-lists">
									<div>
										<p v-for="(items, index) in classIfyData">
											{{items.recycleTypeTitle}} {{items.weight}}KG 共计{{items.totalPrice}}元
										</p>
									</div>
								</div>
							</span>
							</div>
							<p>创建时间：{{item.recycleOrderCtime | formatDate}}</p>
							<router-link :to="'/prc/tradepic/'+item.orderNum">查看现场交易图片<i
									class="el-icon-d-arrow-right"></i></router-link>
						</td>
						<td v-else="item.orderNum" :style="style">
							<p>——</p>
						</td>
						<!--第三列-->
						<td v-if="item.flowOrderNum">
							<p>No.{{item.flowOrderNum}}</p>
							<p>车牌号：{{item.carrierCarnum}}</p>
							<p>司机名称：{{item.shipMentCarrierName}}</p>
							<!--<p>公司</p>-->
							<p>发货时间：{{item.sendTime | formatDate}}</p>
							<p>交货时间：{{item.arriveTime | formatDate}}</p>
							<router-link :to="'/prc/routes/0/'+item.flowOrderNum">查看车辆行使轨迹<i
									class="el-icon-d-arrow-right"></i></router-link>
						</td>
						<td v-else="item.flowOrderNum" :style="style">
							<p>——</p>
						</td>
						<!--第四列-->
						<td v-if="item.flowOrderNum">
							<p>No.{{item.flowOrderNum}}</p>
							<p>{{item.substationName}}</p>
							<router-link :to="'/prc/tradepic/'+item.flowOrderNum">查看现场交易图片<i
									class="el-icon-d-arrow-right"></i></router-link>
						</td>
						<td v-else="item.flowOrderNum" :style="style">
							<p style="{width: 180px}">——</p>
						</td>
						<!--第五列-->
						<td v-if="item.arteryOrderNum">
							<p>No.{{item.arteryOrderNum}}</p>
							<p>车牌号：{{item.otcarNum}}</p>
							<p>司机名称：{{item.carrierName}}</p>
							<p>公司：{{item.carCompany}}</p>
							<p>发货时间：{{item.sendTransportTime | formatDate}}</p>
							<p>交货时间：{{item.transportArriveTime | formatDate}}</p>
							<p>{{item.houseName}}-{{item.substationName}}</p>
							<router-link :to="'/prc/routes/1/'+item.arteryOrderNum">查看车辆行使轨迹<i class="el-icon-d-arrow-right"></i></router-link>
						</td>
						<td v-else="item.arteryOrderNum" :style="style">
							<p>——</p>
						</td>
						<!--第六列-->
						<td v-if="item.arteryOrderNum">
							<p>No.{{item.arteryOrderNum}}</p>
							<p>{{item.houseName}}-{{item.substationName}}</p>
						</td>
						<td v-else="item.arteryOrderNum" :style="style">
							<p>——</p>
						</td>
					</tr>
					</tbody>
				</table>


				<div v-if="data.length > 2" class="showmore">
					<a href="javascript:;" @click="showMore" :class="{active: showall}">点击加载更多 <i class="el-icon-arrow-down"></i></a>
				</div>
			</div>
			<div v-else class="v-nomore">暂无数据...</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import formatDate from '../../assets/js/formatDate'

	export default {
		props: {
			searchData: Object
		},
		data() {
			return {
				data: [],
				classIfyData: [],
				loaded: false,
				showall: false,
				style: {
					width: '160px',
					height: '210px'
				}
			}
		},
		created (){

		},
		filters: {
			formatDate(time){
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm')
			}
		},
		methods: {
			//获取列表信息
			_getLists() {
				let data = this.searchData
				axios.post(baseUrl + '/userfactory/usertofactorys', data).then((data) => {
					//调试先反转一下
					this.data = data.data.userList
				}).catch((e) => {
					console.log(e);
				})
			},
			//查看回收品分类
			_getRecycleDetail(orderNum) {
				if(!orderNum){
					this.classIfyData = [{recycleTypeTitle: '没有查到信息'}]
					return
				}
				axios.get(baseUrl + '/userfactory/recycledetail?orderNum=' + orderNum).then((data) => {
					let res = data.data.recycleList
					if (res.length == 0) res = [{recycleTypeTitle: ' ', weight: '-', totalPrice: '-'}]
					this.classIfyData = res
				}).catch((e) => {
					console.log(e);
				})
			},
			showMore(event) {
				this.showall = !this.showall
				if (this.showall === true) event.currentTarget.innerHTML = '收起 <i class="el-icon-arrow-up"></i>'
				if (this.showall === false) event.currentTarget.innerHTML = '点击加载更多 <i class="el-icon-arrow-down"></i>'
			},
			//图标进场动画
			animated() {
				let aLi = this.$refs.vAnimate.children
				let proBox = this.$refs.proBox
				let vLists = this.$refs.vLists

				function runAsync(elm, t, index) {
					//做一些异步操作
					setTimeout(() => {
						elm.className = 'slideInLeft animated'
						//执行到最后一个
						if (index == aLi.length - 1) {
							setTimeout(() => {
								proBox.style.height = '180px'
								vLists.style.display = 'block'
							}, t)
						}
					}, t * index);
				}

				for (let i = 0; i < aLi.length; i++) {
					(function (n) {
						runAsync(aLi[i], 300, n)
					})(i)
				}
			},

		},
		mounted() {
			//获取数据列表
			this._getLists()
			//调用动画
			this.animated()
		}
	}
</script>
<style scoped lang="less">
	.pro-box {
		height: 450px;
		padding: 0 3.17864% 0 4.16864%;
		background: url(../../assets/img/pro-bg.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		ul {
			display: flex;
			li {
				width: 6.845408%;
				margin-right: 2.246%;
				&:last-child {
					margin-right: 0;
				}
			}
			div {
				width: 100%;
				_height: 47.619048%;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.v-arrow {
				_margin: 0 0.803213%;
			}
			p {
				text-align: center;
				color: #00ffd6;
				margin-top: 20px;
				_line-height: 4.666666667;
			}
		}
	}

	.v-lists {
		display: none;
		width: 100%;
		background: url(../../assets/img/v-lists-bg.png) repeat-y;
		background-size: 100% 100%;
		margin-top: 20px;
		padding: 1px 0 46px 0;

		table {
			width: 100%;
		}
		tr {
			min-height: 210px;

			td {
				min-height: 210px;
				border-bottom: 1px solid #394157;
				border-right: 1px solid #394157;

				&:last-child {
					border-right: none;
				}

				p, div {
					color: #55d7ff;
					line-height: 30px;
					text-align: center;
					font-size: 14px;

					.v-more {
						position: relative;
						top: 0px;
						left: 0px;
						color: #00ffd6;
						font-size: 14px;
						cursor: pointer;
						display: inline-block;

						.v-more-lists {
							display: none;
							position: absolute;
							top: -56px;
							left: 100px;
							min-width: 220px;
							height: 150px;
							padding: 0 10px;
							overflow-y: auto;
							background: url(../../assets/img/more-bg.png) repeat-y;
							background-size: 100% 100%;
							div {
								padding: 10px 0;
								span {
									font-size: 12px;
								}
							}
						}

						&:hover {
							.v-more-lists {
								display: block;
							}
						}
					}
				}
				a {
					display: block;
					text-align: center;
					line-height: 40px;
					color: #00ffd6;
					font-size: 14px;
				}
			}
		}

		.showmore {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			text-align: center;
			line-height: 45px;
			background: url(../../assets/img/showmore-bg.png);
			background-size: 100% 100%;
			transition: all 0.5s ease 0s;

			a {
				color: #00ffd6;
			}
			a.active {
				color: #ffab19;
			}
		}

		.v-nomore{
			color: #fff;
			font-size: 14px;
			padding: 10px;
		}
	}

	.showall {
		height: 505px;
		overflow: hidden;
		transition: all 0.5s ease 0s;
	}

	.showall.active {
		height: auto;
		transition: all 0.5s ease 0s;
	}

	.el-icon-arrow-up:before {
		color: #00ffd6 !important;
	}

	//进场动画
	.v-animate {
		li {
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
		50% {
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
