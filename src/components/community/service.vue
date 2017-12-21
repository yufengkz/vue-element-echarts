<template>
	<div>
		<!--搜索组件-->
		<div class="v-search">
			<!--面包屑-->
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<span class=v-location><i class=el-icon-caret-right></i>当前位置：</span>
				<a class="v-bread" href="javascript:;">报表统计</a>
			</el-breadcrumb>
			<!--search-->
			<el-form :inline="true" :model="searchData" class="demo-form-inline">
			<span class=v-stre>
				<i class="el-icon-location"></i>
			</span>
				<el-form-item label="所属城市：">
					<el-select v-model="searchData.cityName" placeholder="蚌埠市" :style="{'width': '120px'}">
						<el-option label="蚌埠市" value="445"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属地区：">
					<el-select v-model="searchData.countyName" placeholder="请选择" :style="{'width': '120px'}">
						<el-option label="请选择" value=""></el-option>
						<el-option
								v-for="(item, index) in countyLists"
								:key="item.index"
								:label="item.name"
								:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="时间段：">
					<el-date-picker
							v-model="searchData.startDate"
							type="date"
							placeholder="开始日期">
					</el-date-picker>
				</el-form-item>
				<span>——&nbsp;&nbsp;</span>
				<el-form-item label="">
					<el-date-picker
							v-model="searchData.endDate"
							type="date"
							placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="sd-yellow" @click="onSubmit">确定</el-button>
				</el-form-item>
			</el-form>
		</div>

		<!--内容区域-->
		<div class="main-content">
			<div class="side-wrapper">
				<!--服务厅-->
				<div class="side-box" :class="{'side-top': checkElm}" @click="checkService">
					<h3 ref="serviceTitle" class="title">
						<a href="javascript:;">服务亭</a>
					</h3>
					<div class="content">
						<dl class="clearfix">
							<dt class="pull-left"><span>服务亭总体数据</span></dt>
							<dd class="pull-left">
								<div>
									<p>回收货物量（千克）</p>
									<p>{{serviceData.order_recycle_weight}}</p>
								</div>
								<div>
									<p>发运货物量（千克）</p>
									<p>{{serviceData.net_weight}}</p>
								</div>
							</dd>
						</dl>
					</div>
				</div>
				<!--打包站-->
				<div class="side-box" :class="{'side-top': !checkElm}" @click="checkPack">
					<h3 class="title">打包站</h3>
					<div class="content">
						<dl class="clearfix">
							<dt class="pull-left"><span>打包站总体数据</span></dt>
							<dd class="pull-left">
								<div>
									<p>回收货物量（千克）</p>
									<p>{{packData.order_recycle_weight}}</p>
								</div>
								<div>
									<p>发运货物量（千克）</p>
									<p>{{packData.net_weight}}</p>
								</div>
							</dd>
						</dl>
					</div>
				</div>
			</div>
			<div class="main-wrapper">
				<h3 class="title">
					{{mapTitle}}
					<a v-bind:href="toLink" class="pull-right">查看详情 >></a>
				</h3>
				<div class="content" id="main" style="height: 760px;width: 100%;" :style="{'z-index': serviceSHow}">
					服务亭容器
				</div>
				<div class="content" id="mainPack" style="height: 760px;width: 100%;" :style="{'z-index': packSHow}">
					打包站容器
				</div>
			</div>
		</div>
		<!--list-->
		<div class="main-bottom">
			<h3 class="title">{{oneData.name}}</h3>
			<ul class="table">
				<li>
					<span>回收量（千克）</span>
					<span>交运量（千克）</span>
					<span>用户量（个）</span>
				</li>
				<li>
					<span>{{oneData.weightUser}}</span>
					<span>{{oneData.weight}}</span>
					<span>{{oneData.user_mobile}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import SearchSlide from '../search/search'
	import echarts from 'echarts'
	import bmap from 'echarts/extension/bmap/bmap'
	import china from './../../assets/js/china'
	import axios from 'axios'

	export default {
		data() {
			return {
				optionService: {},
				optionPack: {},
				checkElm: true, //控制切换服务厅还是打包站
				searchData: {
					cityName: '蚌埠市',
					cityId: 103,  //市
					countyName: '请选择',  //区
					countyId: 1024,  //区
					startDate: '',
					endDate: ''
				},
				len: 102,
				mapTitle: '',
				toLink: '#/service/cs',
				mapDataService: [], //地图data
				mapDataPack: [], //地图data
				serviceSHow: 9,  //显示zIndex 服务亭
				packSHow: 8,   //显示zIndex 打包站

				//top search
				formInline: {
					city: '蚌埠市',
					area: '蚌山区'
				},
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},

				//区列表
				countyLists: [],

				//服务亭总数据
				serviceData: {
					order_recycle_weight: 0, //回收货物总重量
					net_weight: 0, //发运货物总重量
					houseNum: `蚌埠市服务亭共计0个`, //服务亭总数量
				},
				//打包站总数据
				packData: {
					order_recycle_weight: 0, //回收货物总重量
					net_weight: 0, //发运货物总重量
					package: '蚌埠市服务亭共计0个', //打包站总数量
				},

				//某个服务亭数据
				oneServiceData: {
					name: '', //服务亭名称
					weightUser: 0, //单个服务亭回收量
					weight: 0, //单个服务亭运输量
					user_mobile: 0, //单个服务亭总用户数
				},
				//某个打包站数据
				onePackData: {
					name: '', //服务亭名称
					weightUser: 0, //单个服务亭回收量
					weight: 0, //单个服务亭运输量
					user_mobile: 0, //单个服务亭总用户数
				},
				oneData: {
					name: '', //服务亭、打包站名称
					weightUser: 0, //单个服务亭、打包站回收量
					weight: 0, //单个服务亭、打包站运输量
					user_mobile: 0, //单个服务亭、打包站总用户数
				},
			}
		},
		methods: {
			//地图option
			convertData(data) {
				var res = [];
				for (var i = 0; i < data.length; i++) {
					var geoCoord = data[i].coordinate //取坐标
					if (geoCoord) {
						res.push({
							name: data[i].name,
							value: geoCoord.concat(data[i].value)
						});
					}
				}
				return res;
			},

			//控制当前选择的是服务亭还是打包站
			checkService() {
				this.checkElm = true
				this.serviceSHow = 9
				this.packSHow = 8
				//设置title
				this.mapTitle = this.serviceData.houseNum
				//设置跳到哪里
				this.toLink = '#/service/cs'
				//点击后设置列表的数据
				this.oneData = this.oneServiceData

			},
			checkPack() {
				this.checkElm = false
				this.serviceSHow = 8
				this.packSHow = 9
				//设置title
				this.mapTitle = this.packData.package
				//设置跳到哪里
				this.toLink = '#/service/cp'
				//点击后设置列表的数据
				this.oneData = this.onePackData

			},

			//获取默认加载的全部数据
			getSubData() {
				//获取服务亭总体数据
				axios.get(`/countdelivery/countnum?cityId=${this.searchData.cityId}&countyId=${this.searchData.countyId}`).then((data) => {
					let res = data.data
					if(res.code != 0) return alert(res.msg)
					//区列表
					this.countyLists = res.data.country
					//console.log(res.data);
					//总数据量
					this.serviceData = {
						order_recycle_weight: res.data.deliveryList.order_recycle_weight || 0, //回收货物总重量
						net_weight: res.data.deliveryList.net_weight || 0, //发运货物总重量
						houseNum: `蚌埠市服务亭共计${res.data.deliveryList.houseNum || 0}个`, //服务亭总数量
					}
					//默认设置地图title
					this.mapTitle = `蚌埠市服务亭共计${res.data.deliveryList.houseNum || 0}个`

				}).catch((e) => {
					console.log(e);
				})
				//获取打包站总体数据
				axios.get(`/countpackage/countsite?cityId=${this.searchData.cityId}&countyId=${this.searchData.countyId}`).then((data) => {
					let res = data.data
					if(res.code != 0) return alert(res.msg)
					//打包站的区列表  蚌埠市的区域列表应该都是一样的
					//this.countyLists = res.data.country
					//console.log(res.data);

					//总数据量
					this.packData = {
						order_recycle_weight: res.data.siteliat.order_recycle_weight || 0, //回收货物总重量
						net_weight: res.data.siteliat.net_weight || 0, //发运货物总重量
						package: `蚌埠市打包站共计${res.data.siteliat.package || 0}个`, //服务亭总数量
					}

				}).catch((e) => {
					console.log(e);
				})

				//调用接口加载默认数据 -- 服务亭
				this.mapDataService = [
					{name: '海门', value: 160, coordinate: [121.15, 31.89]},
					{name: '鄂尔多斯', value: 160, coordinate: [109.781327, 39.608266]},
					{name: '招远', value: 160, coordinate: [120.38, 37.35]},
					{name: '舟山', value: 160, coordinate: [122.207216, 29.985295]},
					{name: '齐齐哈尔', value: 160, coordinate: [123.97, 47.33]},
					{name: '蚌埠市', value: 180, coordinate: [117.385164, 32.922009]}
				]

				//调用接口加载默认数据 -- 打包站
				this.mapDataPack = [
					{name: '海门1', value: 160, coordinate: [121.15, 31.89]},
					{name: '鄂尔多斯1', value: 160, coordinate: [109.781327, 39.608266]},
					{name: '招远1', value: 160, coordinate: [120.38, 37.35]},
					{name: '舟山1', value: 160, coordinate: [122.207216, 29.985295]},
					{name: '齐齐哈尔1', value: 160, coordinate: [123.97, 47.33]},
					{name: '蚌埠市1', value: 180, coordinate: [117.385164, 32.922009]}
				]

			},

			//获取默认单个服务亭、打包站数据
			getOneServiceData(nId){
				//获取服务亭
				let sId = nId || 15
				axios.get('/countdelivery/houseList?id=' + sId).then( (data) => {
					let res = data.data
					this.oneServiceData = {
						name: 'xxxxx服务亭', //服务亭名称
						weightUser: res.weightUser.weight || '未查到信息', //单个服务亭回收量
						weight: res.weight || '未查到信息', //单个服务亭运输量
						user_mobile: res.weightUser.user_mobile || '未查到信息', //单个服务亭总用户数
					}
					//设置列表默认显示的数据
					this.oneData = {
						name: 'xxxxx服务亭', //服务亭名称
						weightUser: res.weightUser.weight || '未查到信息', //单个服务亭回收量
						weight: res.weight || '未查到信息', //单个服务亭运输量
						user_mobile: res.weightUser.user_mobile || '未查到信息', //单个服务亭总用户数
					}

				}).catch((e) => {
					console.log(e);
				})
				//获取打包站
				let pId = nId || 31
				axios.get('/countpackage/siteList?d=' + pId).then( (data) => {
					let res = data.data
					this.onePackData = {
						name: 'xxxxx打包站', //打包站名称
						weightUser: res.weightUser.weight || '未查到信息', //单个打包站回收量
						weight: res.weight || '未查到信息', //单个打包站运输量
						user_mobile: res.weightUser.user_mobile || '未查到信息', //单个打包站总用户数
					}
				}).catch((e) => {
					console.log(e);
				})
			},

			//查询数据
			onSubmit() {
				console.log('查询!');
				console.log(this.searchData)
			},
		},
		components: {

		},
		created() {

		},
		mounted() {
			//

			//调用区县数据 xx
			this.getSubData()

			//获取某个服务亭的数据
			this.getOneServiceData()

			//服务亭
			var dataService = this.mapDataService
			//打包站
			var dataPace = this.mapDataPack

			//服务亭
			this.optionService = {
				//backgroundColor: '#404a59',
				title: {
					text: '',//标题
					subtext: '',//子标题
					sublink: '#',//subtext跳转地址
					left: 'center',
					textStyle: {
						color: '#fff'
					}
				},
				tooltip: {
					trigger: 'item',
					show: true,
					formatter: function (params, ticket, callback) {
						var $pna = params.name;
						console.log($pna);
						var res = '';
						for (var i = 0; i < dataService.length; i++) {
							if (dataService[i].name == $pna) {
								res = `${dataService[i].name}服务亭`;//设置自定义数据的模板，这里的模板是图片
								//console.log(res);
								break;
							}
						}
						setTimeout(function () {
							// 仅为了模拟异步回调
							callback(ticket, res);//回调函数，这里可以做异步请求加载的一些代码
						}, 300)
						return `loading...`;
					}
				},
				bmap: {
					map: 'china',
					center: [104.114129, 37.550339],
					zoom: 5,
					roam: true,
					mapStyle: {
						styleJson: [
							{
								"featureType": "water", //水的颜色
								"elementType": "all",
								"stylers": {
									"color": "#044161"
								}
							},
							{
								"featureType": "land", //地图背景色 调整土地颜色
								"elementType": "all",
								"stylers": {
									"color": "#004981"
								}
							},
							{
								'featureType': 'railway', //铁路线
								'elementType': 'all',
								'stylers': {
									'visibility': 'off'
								}
							},
							{
								"featureType": "boundary", //china轮廓线
								"elementType": "geometry",
								"stylers": {
									"color": "#57d2f9", //地图边框颜色
									"areaColor": '#0e2338', //各区域底色
								}
							},
							{
								"featureType": "highway",  //调整高速道路颜色
								"elementType": "geometry",
								"stylers": {
									"color": "#004981"
								}
							},
							{
								"featureType": "highway",  //调整高速道路颜色
								"elementType": "geometry.fill",
								"stylers": {
									"color": "#005b96",
									"lightness": 1
								}
							},
							{
								"featureType": "highway", //调整高速道路是否可现
								"elementType": "labels",
								"stylers": {
									"visibility": "off"
								}
							},
							{
								"featureType": "arterial",
								"elementType": "geometry",
								"stylers": {
									"color": "#004981"
								}
							},
							{
								"featureType": "arterial",
								"elementType": "geometry.fill",
								"stylers": {
									"color": "#00508b"
								}
							},
							{
								"featureType": "poi",
								"elementType": "all",
								"stylers": {
									"visibility": "off"
								}
							},
							{
								"featureType": "green",
								"elementType": "all",
								"stylers": {
									"color": "#056197",
									"visibility": "off"
								}
							},
							{
								"featureType": "subway", //调整地铁颜色
								"elementType": "all",
								"stylers": {
									"visibility": "off"
								}
							},
							{
								"featureType": "manmade",
								"elementType": "all",
								"stylers": {
									"visibility": "off"
								}
							},
							{
								"featureType": "local",
								"elementType": "all",
								"stylers": {
									"visibility": "off"
								}
							},
							{
								"featureType": "arterial",
								"elementType": "labels",
								"stylers": {
									"visibility": "off"
								}
							},
							{
								"featureType": "boundary", //分界线
								"elementType": "geometry.fill",
								"stylers": {
									"color": "#029fd4"
								}
							},
							{
								"featureType": "building", //调整建筑物颜色
								"elementType": "all",
								"stylers": {
									"color": "#1a5787"
								}
							},
							{
								"featureType": "label",
								"elementType": "all",
								"stylers": {
									"visibility": "off"
								}
							}
						]
					}
				},
				series: [
//          {
//            name: 'pm2.5',
//            type: 'scatter',
//            coordinateSystem: 'bmap',
//            data: this.convertData(data),
//            symbolSize: function (val) {
//              return val[2] / 10;
//            },
//            label: {
//              normal: {
//                formatter: '{b}',
//                position: 'right',
//                show: false
//              },
//              emphasis: {
//                show: true
//              }
//            },
//            itemStyle: {
//              normal: {
//                color: '#ddb926'
//              }
//            }
//          },
					{
						name: '',
						type: 'effectScatter', // 表的类型 这里是散点
						coordinateSystem: 'bmap', // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
						data: this.convertData(dataService),
						symbolSize: function (val) {
							return val[2] / 14;  //圆圈大小
						},
						showEffectOn: 'render', //圆点是否闪烁 是：render 否：emphasis
						rippleEffect: {
							brushType: 'stroke'
						},
						hoverAnimation: true,
						label: {
							normal: {
								formatter: '{b}',
								position: 'right',
								show: true
							}
						},
						itemStyle: {
							normal: {
								color: 'rgb(245, 184, 0)', //圆圈颜色
								shadowBlur: 10,
								shadowColor: '#333'
							}
						},
						zlevel: 1
					},
					{
						type: 'custom',
						coordinateSystem: 'bmap',
						itemStyle: {
							normal: {
								opacity: 0.8
							}
						},
						animation: false,
						silent: true,
						data: [0],
						z: -10
					}
				]
			}
			//打包站
			this.optionPack = {
				//backgroundColor: '#404a59',
				title: {
					text: '',//标题
					subtext: '',//子标题
					sublink: '#',//subtext跳转地址
					left: 'center',
					textStyle: {
						color: '#fff'
					}
				},
				tooltip: {
					trigger: 'item',
					show: true,
					formatter: function (params, ticket, callback) {
						var $pna = params.name;
						console.log($pna);
						var res = '';
						for (var i = 0; i < dataPace.length; i++) {
							if (dataPace[i].name == $pna) {
								res = `${dataPace[i].name}服务亭`;//设置自定义数据的模板，这里的模板是图片
								//console.log(res);
								break;
							}
						}
						setTimeout(function () {
							// 仅为了模拟异步回调
							callback(ticket, res);//回调函数，这里可以做异步请求加载的一些代码
						}, 300)
						return `loading...`;
					}
				},
				bmap: {
					map: 'china',
					center: [104.114129, 37.550339],
					zoom: 5,
					roam: true,
					mapStyle: {
						styleJson: [
							{
								"featureType": "water", //水的颜色
								"elementType": "all",
								"stylers": {
									"color": "#044161"
								}
							},
							{
								"featureType": "land", //地图背景色 调整土地颜色
								"elementType": "all",
								"stylers": {
									"color": "#004981"
								}
							},
							{
								'featureType': 'railway', //铁路线
								'elementType': 'all',
								'stylers': {
									'visibility': 'off'
								}
							},
							{
								"featureType": "boundary", //china轮廓线
								"elementType": "geometry",
								"stylers": {
									"color": "#57d2f9", //地图边框颜色
									"areaColor": '#0e2338', //各区域底色
								}
							},
							{
								"featureType": "highway",  //调整高速道路颜色
								"elementType": "geometry",
								"stylers": {
									"color": "#004981"
								}
							},
							{
								"featureType": "highway",  //调整高速道路颜色
								"elementType": "geometry.fill",
								"stylers": {
									"color": "#005b96",
									"lightness": 1
								}
							},
							{
								"featureType": "highway", //调整高速道路是否可现
								"elementType": "labels",
								"stylers": {
									"visibility": "off"
								}
							},
							{
								"featureType": "arterial",
								"elementType": "geometry",
								"stylers": {
									"color": "#004981"
								}
							},
							{
								"featureType": "arterial",
								"elementType": "geometry.fill",
								"stylers": {
									"color": "#00508b"
								}
							},
							{
								"featureType": "poi",
								"elementType": "all",
								"stylers": {
									"visibility": "off"
								}
							},
							{
								"featureType": "green",
								"elementType": "all",
								"stylers": {
									"color": "#056197",
									"visibility": "off"
								}
							},
							{
								"featureType": "subway", //调整地铁颜色
								"elementType": "all",
								"stylers": {
									"visibility": "off"
								}
							},
							{
								"featureType": "manmade",
								"elementType": "all",
								"stylers": {
									"visibility": "off"
								}
							},
							{
								"featureType": "local",
								"elementType": "all",
								"stylers": {
									"visibility": "off"
								}
							},
							{
								"featureType": "arterial",
								"elementType": "labels",
								"stylers": {
									"visibility": "off"
								}
							},
							{
								"featureType": "boundary", //分界线
								"elementType": "geometry.fill",
								"stylers": {
									"color": "#029fd4"
								}
							},
							{
								"featureType": "building", //调整建筑物颜色
								"elementType": "all",
								"stylers": {
									"color": "#1a5787"
								}
							},
							{
								"featureType": "label",
								"elementType": "all",
								"stylers": {
									"visibility": "off"
								}
							}
						]
					}
				},
				series: [
//          {
//            name: 'pm2.5',
//            type: 'scatter',
//            coordinateSystem: 'bmap',
//            data: this.convertData(data),
//            symbolSize: function (val) {
//              return val[2] / 10;
//            },
//            label: {
//              normal: {
//                formatter: '{b}',
//                position: 'right',
//                show: false
//              },
//              emphasis: {
//                show: true
//              }
//            },
//            itemStyle: {
//              normal: {
//                color: '#ddb926'
//              }
//            }
//          },
					{
						name: '',
						type: 'effectScatter', // 表的类型 这里是散点
						coordinateSystem: 'bmap', // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
						data: this.convertData(dataPace),
						symbolSize: function (val) {
							return val[2] / 14;  //圆圈大小
						},
						showEffectOn: 'render', //圆点是否闪烁 是：render 否：emphasis
						rippleEffect: {
							brushType: 'stroke'
						},
						hoverAnimation: true,
						label: {
							normal: {
								formatter: '{b}',
								position: 'right',
								show: true
							}
						},
						itemStyle: {
							normal: {
								color: 'rgb(232, 33, 79)', //圆圈颜色
								shadowBlur: 10,
								shadowColor: '#333'
							}
						},
						zlevel: 1
					},
					{
						type: 'custom',
						coordinateSystem: 'bmap',
						itemStyle: {
							normal: {
								opacity: 0.8
							}
						},
						animation: false,
						silent: true,
						data: [0],
						z: -10
					}
				]
			}

			// =========================================//
			//初始化服务亭
			// 基于准备好的dom，初始化echarts实例
			var myChartService = echarts.init(document.getElementById('main'));
			// 使用刚指定的配置项和数据显示图表。
			myChartService.setOption(this.optionService);

			// =========================================//
			//初始化打包站
			// 基于准备好的dom，初始化echarts实例
			var myChartPack = echarts.init(document.getElementById('mainPack'));
			// 使用刚指定的配置项和数据显示图表。
			myChartPack.setOption(this.optionPack);

			setTimeout(() => {
				var elm = document.getElementsByClassName('anchorBL')
				for (let i = 0; i < elm.length; i++) {
					elm[i].style.display = 'none'
				}
			}, 100)

			myChartService.on('click', (params) => {
				this.searchData.area = params.data.name //设置默认加载数据的searchData
				alert(params.data.name);
			})

			myChartPack.on('click', (params) => {
				this.searchData.area = params.data.name //设置默认加载数据的searchData
				alert(params.data.name);
			})
		}
	}
</script>

<style lang="less">
	.main-content {
		margin-top: 20px;
		display: flex;
		.side-wrapper {
			flex: 0 0 402px;
			margin-right: 18px;

			.side-box {
				width: 402px;
				height: auto;
				background: url('../../assets/img/service-sm-bg.png') no-repeat 0 0;
				background-size: 100% 100%;
				margin-bottom: 18px;
				.title {
					height: 52px;
					line-height: 52px;
					text-align: center;
					font-size: 20px;
					color: #00ffd6;
					border-top-left-radius: 15px;
					border-top-right-radius: 15px;
					a {
						color: #00ffd6;
					}
				}
				.content {
					height: 344px;
					border-top: 1px solid #3a4762;
					dl {
						font-size: 16px;
						dt {
							width: 100px;
							height: 254px;
							text-align: center;
							border-right: 1px solid #3a4762;
							padding-top: 90px;
							span {
								display: inline-block;
								width: 30px;
								color: #00ffd6;
							}
						}
						dd {
							width: 301px;
							height: 100%;
							& > div {
								width: 100%;
								height: 122px;
								text-align: center;
								padding-top: 50px;
								&:nth-of-type(1) {
									border-bottom: 1px solid #3a4762;
								}
								p {
									line-height: 30px;
									color: #f5b800;
								}
							}
						}
					}
				}
			}
			.side-top {
				.title {
					background: rgba(255, 255, 255, .15);
				}
			}
		}

		.main-wrapper {
			flex: 1;
			height: 812px;
			background: url('../../assets/img/service-big-bg.png') no-repeat 0 0;
			background-size: 100% 100%;
			position: relative;
			.title {
				position: absolute;
				left: 0;
				top: 0;
				z-index: 2;
				width: 100%;
				height: 52px;
				line-height: 52px;
				text-align: center;
				font-size: 18px;
				color: #00ffd6;
				background: rgba(255, 255, 255, .1);
				a {
					color: #ffab19;
					font-size: 16px;
					margin-right: 18px;
				}
			}
			.content {
				position: absolute;
				left: 0;
				top: 52px;
				z-index: 1;
			}
		}
	}

	.main-bottom {
		height: 280px;
		background: url('../../assets/img/service-bottom-bg.png') no-repeat 0 0;
		background-size: 100% 100%;
		.title {
			height: 84px;
			line-height: 84px;
			text-align: center;
			font-size: 18px;
			color: #00ffd6;
		}
		.table {
			li {
				height: 95px;
				line-height: 95px;
				border-top: 1px solid #3a4762;
				display: flex;
				span {
					flex: 1;
					text-align: center;
					color: #ffab19;
					border-right: 1px solid #3a4762;
					&:last-child {
						border-right: 0;
					}
				}
			}
		}
	}

	.anchorBL {
		display: none;
		opacity: 0;
	}

	/*search*/
	.v-search {
		height: 128px;
		background: url('../../assets/img/searchslide-bg.png');
		background-size: 100% 100%;
		color: #fff;
		padding: 0 20px;

		.el-breadcrumb {
			height: 60px;
			line-height: 60px;

			.v-location {
				float: left;
				font-size: 16px;
				.el-icon-caret-right {
					color: #28b51f;
					font-size: 20px;
				}
			}

			.v-bread {
				font-size: 16px;
				font-weight: normal !important;
				color: #00ffd6 !important;
			}
			a.v-bread:last-child {
				color: #fff !important;
			}
		}

	}

	.el-form{
		margin-top: 10px;
	}
	.v-stre {
		line-height: 40px;
		.el-icon-location{
			color: #ffab19;
		}
	}

	.el-form-item__label {
		color: #fff !important;
	}
	//面包屑
	.el-breadcrumb__inner, .el-breadcrumb__inner a {
		font-weight: normal;
		-webkit-transition: color .2s cubic-bezier(.645, .045, .355, 1);
		transition: color .2s cubic-bezier(.645, .045, .355, 1);
		color: #00ffd6;
	}
	//日历
	.el-date-picker{
		background: url(../../assets/img/data-picker-bg.png) no-repeat;
		background-size: 100% 100%;
		border: transparent;
	}
	.el-picker-panel__icon-btn, .el-date-picker__header-label{
		color: #fff;
	}
	.el-date-table td.next-month, .el-date-table td.prev-month{
		//color: #666;
	}
	.el-date-table td.current:not(.disabled) span{
		background: #ffab19;
	}
	.el-date-table td.available:hover{
		color: #fff;
	}
	.el-date-table td.today span{
		color: #fff;
	}
	.el-icon-date{
		font-size: 20px;
		color: #ffab19;
	}
	.el-input__inner{
		background: transparent;
		border: 1px solid #999;
		color: #fff;
	}
	//picker宽度
	.el-date-editor.el-input, .el-date-editor.el-input__inner{
		width: 140px;
	}
	.el-icon-arrow-up:before{
		color: #ffab19;
	}
	//弹出框箭头
	.el-popper .popper__arrow{
		display: none;
	}

	//下拉框
	.el-select-dropdown__list{
		background: url(../../assets/img/select-bg.png) repeat-y;
		background-size: 100% 100%;
	}
	.el-select-dropdown__item.selected{
		color: #ffab19;
	}
	.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
		background: url(../../assets/img/select-hover-bg.png) repeat-x;
		background-size: 100% 100%;
		color: #ffab19;
	}
	.el-select-dropdown{
		box-shadow: none;
		background-color: transparent;
		border: 1px solid transparent;
	}
	.el-select-dropdown__item{
		color: #fff;
	}
	//按钮颜色
	.el-button--sd-yellow{
		width: 100px;
		background: #ffab19;
		color: #fff;
		border: 1px solid #ffab19;
	}
	.el-button:focus, .el-button:hover{
		background: #ffab19;
		color: #fff;
		border: 1px solid #ffab19;
	}
</style>
