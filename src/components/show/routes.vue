<template>
	<div class="v-showbox">
		<div class="v-title">
			<h3>服务厅-打包站车辆轨迹 <a href="javascript:;" onclick="history.back()">关闭</a></h3>
		</div>
		<div class=v-allmap id=v-allmap>
			地图加载失败，请检查网络或刷新网页...
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	let posiIco = require('../../assets/img/posi.png')
	let posiIco1 = require('../../assets/img/posi1.png')
	export default {
		name: '',
		data() {
			return {
				map: ''
			}
		},
		methods: {
			initMap(data){
				// 百度地图API功能
				// 创建Map实例
				this.map = new BMap.Map("v-allmap", {enableMapClick: true})
				let x = data[0].lng
				let y = data[0].lat
				this.map.centerAndZoom(new BMap.Point(x, y), 14) //中心点 蚌埠 117.395639, 32.921375 根据第一个确定中心点
				this.map.enableScrollWheelZoom(true) //滚轮放大缩小
				this.map.setMapStyle({style:'grayscale'}) //设置地图主题
				//map.enableScrollWheelZoom(true);  //启用滚轮放大缩小
			}
		},
		mounted() {
			let that = this

			function showPoly(pointList, houseName) {
				//循环显示点对象
				for (let c = 0; c < pointList.length; c ++) {
					//设置定位图标
					var myPosIcon = new BMap.Icon(posiIco, new BMap.Size(19, 25))
					var marker = new BMap.Marker(pointList[c], { icon: myPosIcon })
					that.map.addOverlay(marker); //画出marker
					marker.setAnimation(BMAP_ANIMATION_DROP) //设置marker进场动画
					//将途经点按顺序添加到地图上  显示该点的名称

					//设置旗点和路径点 都是服务亭
					if(c !== pointList.length - 1){
						let start
						if(c == 0) {
							start = '起点：'
						} else{
							start = ''
						}

						var label = new BMap.Label(start + houseName[c], {
							offset: new BMap.Size(20, -2) //偏移量
						});
					}else{
						//最后一个点是终点 打包站
						var label = new BMap.Label('终点：' + houseName[c], {
							offset: new BMap.Size(20, -2) //偏移量
						});
					}
					label.setStyle({
						color: '#fff',
						backgroundColor: 'rgba(0, 0, 0, 0.6)',
						'border-radius': '10px',
						border: 0,
						padding: '4px 5px',

					})
					marker.setLabel(label)
				}

				var group = Math.floor(pointList.length / 11)
				var mode = pointList.length % 11;

				var driving = new BMap.DrivingRoute(that.map, {
					onSearchComplete: function (results) {
						if (driving.getStatus() == BMAP_STATUS_SUCCESS) {
							var plan = driving.getResults().getPlan(0);
							var num = plan.getNumRoutes();
							//alert("plan.num ：" + num);
							for (var j = 0; j < num; j++) {
								var pts = plan.getRoute(j).getPath(); //通过驾车实例，获得一系列点的数组
								var polyline = new BMap.Polyline(pts,  {strokeColor: '#f83d3d', strokeWeight:6, strokeOpacity:0.8});
								that.map.addOverlay(polyline);
							}
						}
					}
				})
				for (var i = 0; i < group; i++) {
					var waypoints = pointList.slice(i * 11 + 1, (i + 1) * 11);
					//注意这里的终点如果是11的倍数的时候，数组可是取不到最后一位的，所以要注意终点-1 **
					driving.search(pointList[i * 11], pointList[(i + 1) * 11 - 1], {
						waypoints: waypoints
					}) //waypoints表示途经点
				}
				if (mode != 0) {
					var waypoints = pointList.slice(group * 11, pointList.length - 1); //多出的一段单独进行search
					driving.search(pointList[group * 11], pointList[pointList.length - 1], {
						waypoints: waypoints
					})
				}

			}

			// ======================================================== //
			//map地图画点
			let orderNum = this.$route.params.id //这个单号有数据30033481512695867208
			let type = this.$route.params.type //type 根据不同的type调用不同的接口

			let endP = {}
			let packName
			let houseName = []
			let url
			if(type == 0) url = baseUrl + `/userfactory/checkcartrack?orderNum=${orderNum}`
			if(type == 1) url = baseUrl + `/userfactory/checkarterycartrack?orderNum=${orderNum}`
			axios.get(url).then( (data) => {
				let arrayList = []
				let res = data.data.geographyList
				res.forEach((item, index) => {
					let P = new BMap.Point(item.houseX, item.houseY)  //服务亭 - 打包站
					endP =  new BMap.Point(item.siteX, item.siteY) //打包站 - 工厂
					arrayList.push(P) //把map点放到数组中
					houseName.push(item.houseName) //把名称放到数组中

					packName = item.siteName
				})

				arrayList.push(endP)
				houseName.push(packName)

				return arrayList
			}).then( (data) => {
				this.initMap(data)
				//显示轨迹
				showPoly(data, houseName)
			})
			// ======================================================== //

			//将28个百度坐标点放入数据中
//			var p1 = new BMap.Point(121.443532, 31.24603)
//			var p2 = new BMap.Point(121.481477, 31.240103)
//			arrayList.push(p5)

			//拖动地图后返回原来位置
//			setTimeout( () => {
//				var b = new BMap.Bounds(p1, p5)
//				try {
//					BMapLib.AreaRestriction.setBounds(map, b)
//				} catch (e) {
//					alert(e)
//				}
//			}, 500)

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

		.v-allmap{
			flex: 1;
			width: 99%;
			height: 99%;
			margin-top: 5px;
			color: #fff;
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

</style>
