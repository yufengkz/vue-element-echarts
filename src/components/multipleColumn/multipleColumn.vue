<!--折线图-->
<template>
	<div class="multipleColumn">

	</div>
</template>
<script>
	import echarts from 'echarts'
	export default {
		props: {
			multipleColumnData: Array
		},
		data() {
			return {
				legendArr: [],
				color: this.$store.state.color,
				myChart: {},
				geoCoordMap: {},
				name: '散点图'
			}
		},
		methods: {
			//初始化散点图  基于准备好的dom，初始化echarts实例
			initColumn(){
				this.timeData = []
				//格式数据
				this.userCount = []
				this.multipleColumnData.forEach((item, index) => {
					this.timeData.push(item.dates)
					this.userCount.push(item.userCount)
				})
				//echarts
				this.myChart = echarts.init(document.querySelector('.multipleColumn'));
				let option = {
					title: {
						text: "对应数量",
						textStyle: {
							color: '#fff', //图表基本样式设置 color,fontStyle,fontWeight,textShadowOffsetX...(http://echarts.baidu.com/option.html#title)
							fontSize: '20px'
						},
						x: "10px", //标题偏移量
						y: "10px"
					},
					tooltip: {
						trigger: "item",
						formatter: "{b} : {c}" //"{a} <br/>{b} : {c}"
					},
					legend: {
						x: 'left',
						textStyle: {
							color: '#fff', //设置柱状图代表什么
						},
						data: ['', ''] //显示上标识
					},
					xAxis: [
						{
							type: "category",
							name: " ",
							//splitLine: {show: false},//去除网格线
							splitArea : {show : false},//去除网格区域
							axisLabel: {
								textStyle: {
									color: '#fff'  //坐标刻度文字颜色
								}
							},
							data: this.timeData//['12/05', '12/06','12/07', '12/08','12/09', '12/10', '12/12'], //长度 7
						}
					],
					yAxis: [
						{
							type: "log",
							name: " ",
							//splitLine: {show: true},//去除网格线
							//splitArea : {show : false},//去除网格区域
							splitLine: {
								lineStyle: {
									color: ['rgba(230, 230, 230, 0.2)']  //横线颜色
								}
							},
							axisLabel: {
								textStyle: {
									color: '#fff'  //坐标刻度文字颜色
								}
							},
						}
					],
					toolbox: {
						show: false,  //是否显示下载 刷新按钮
						feature: {
							mark: {
								show: true
							},
							dataView: {
								show: true,
								readOnly: true
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: false
							}
						}
					},
					color: ['#00ffde'], //折线、点颜色
					calculable: true,
					series: [
						{
							name: "",
							type: "line",
							data: this.userCount,//[2, 2223, 81, 247, 741, 1000, 6669], //长度7
							itemStyle : { normal: {label : {show: true}}}
						}
					],
					//控制边距　
					grid: {
						left: '8%',
						//right:'1%',
						//top: '0%',
						bottom: '6%',
						containLabel: true,
					}
				};

				this.myChart.setOption(option);
			}
		},
		mounted() {
			this.initColumn()
			/*this.myChart.setOption({
				//全局文本样式
				textStyle: {
					color: '#fff'
				},
				title: {
					text: 'ECharts 折柱混合', //图表标题
					show: true, //控制title显示true 隐藏false
					textStyle: {
						color: '#fff', //图表基本样式设置 color,fontStyle,fontWeight,textShadowOffsetX...(http://echarts.baidu.com/option.html#title)
					}
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#fff'
						}
					}
				},
				toolbox: {
					feature: {
						dataView: {show: true, readOnly: false},
						magicType: {show: true, type: [ 'line', 'bar']},
						restore: {show: true},
						saveAsImage: {show: true}
					}
				},
				color: this.color,
				legend: {
					textStyle: {
						color: '#fff', //设置柱状图代表什么
					},
					data: ['蒸发量', '降水量'] //,'平均温度'
				},
				xAxis: [
					{
						type: 'category',
						data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
						axisPointer: {
							type: 'shadow'
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						name: '水量',
						min: 0,
						max: 250,
						interval: 50,
						axisLabel: {
							formatter: '{value} ml'  //单位
						}
					},
//          {
//            type: 'value',
//            name: '温度',
//            min: 0,
//            max: 25,
//            interval: 5,
//            axisLabel: {
//              formatter: '{value} °C'
//            }
//          }
				],
				series: [
					{
						name: '蒸发量',
						type: 'bar',
						data: [50.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
						barWidth: 30, ////设置柱子的宽度
						itemStyle: { //设置柱子颜色
							normal: {
								color: function (params) {
									var colorList = [
										'#E87C25'
									];
									return colorList[params.dataIndex]
								}
							}
						}
					},
					{
						name: '降水量',
						type: 'bar',
						data: [50.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
						barWidth: 30, ////设置柱子的宽度
						itemStyle: { //设置柱子颜色
							normal: {
								color: function (params) {
									var colorList = [
										'#27727B'
									];
									return colorList[params.dataIndex]
								}
							}
						}
					},
//          {
//            name:'平均温度',
//            type:'line',
//            yAxisIndex: 1,
//            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
//          }
				],
				//控制边距　
				grid: {
					left: '0%',
					right:'0%',
					//top: '0%',
					containLabel: true,
				},
			})*/
		}
	}
</script>
<style scoped lang="less">
	.columnChart {
		width: 100%;
		background-size: 100% 100%;
		color: white;

		.multipleColumn {
			width: 100%;
			height: calc(478px - 100px);
			_margin-top: -15px;
			background: url(../../assets/img/bg-zhuzhuangtu.png) no-repeat !important;
			background-size: 100% 100% !important;
			canvas{
				width: 100% !important;
			}
		}
	}
</style>
