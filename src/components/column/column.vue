<!--柱状图-->
<template>
	<div class="column">

	</div>
</template>
<script>
	import echarts from 'echarts'
	export default {
		props: {
			columnData: Object
		},
		data() {
			return {
				legendArr: [],
				color: this.$store.state.color,
				myChart: {},
				name: '柱状图',
				timeData: [],
				hsData: [],
				fhData: [],
			}
		},
		methods: {
			initColumn(){
				this.timeData = []
				this.hsData = []
				//格式化数据
				this.columnData.huishou.forEach((item, index) => {
					this.timeData.push(item.ctimes)
					this.hsData.push(item.net_weight)
				})
				this.columnData.fahuo.forEach((item, index) => {
					//this.timeData.push(item.dates)
					this.fhData.push(item.net_weight)
				})
				// 基于准备好的dom，初始化echarts实例
				let option = {
					title: {
						show: false
					},
					title: {
						text: "回收／交运量",
						textStyle: {
							color: '#fff', //图表基本样式设置 color,fontStyle,fontWeight,textShadowOffsetX...(http://echarts.baidu.com/option.html#title)
							fontSize: '20px',
						},
						x: "10px",
						y: "10px"
					},
					tooltip: {
						trigger: 'axis'
					},
					toolbox: {
						show: false
					},
					color: this.color,
					legend: {
						//show: true,
						orient: 'horizontal',
						itemWidth: 15,
						itemHeight: 10,
						x: 'right',
						y: 12,
						textStyle: {
							color: '#fff', //设置柱状图代表什么
						},
						data: ['回收量', '交运量'], //,'平均温度'
						selected: {
							'回收量': true,
							'交运量': true,
						}
					},
					calculable: true,
					xAxis: [{
						name: ' ',
						type: 'category',
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						nameTextStyle: {
							color: 'rgba(255, 255, 255, 0.69)'
						},
						axisLabel: {
							textStyle: {
								color: 'white'
							}
						},
						data: this.timeData,//['12/05', '12/06','12/07', '12/08','12/09', '12/10', '12/11']
					}],
					yAxis: [{
						axisLine: {
							show: false
						},
						nameLocation: 'end',
						nameGap: 20,
						nameRotate: 0,
						axisTick: {
							show: false
						},
						splitLine: {
							lineStyle: {
								color: ['rgba(230, 230, 230, 0.2)']  //横线颜色
							}
						},
						axisLabel: {
							formatter: '{value} kg',  //单位
							textStyle: {
								color: 'white',
								fontSize: 14
							}
						},
						name: ' ',
						type: 'value',
						nameTextStyle: {
							color: 'rgba(255, 255, 255, 0.69)'
						}
					}],
					series: [{
						name: '回收量',
						type: 'bar',
						data: this.hsData,//[200, 120, 20, 500,60, 70, 300],
						barWidth: 10,
						barGap: 0
					},{
						name: '交运量',
						type: 'bar',
						data: this.fhData,//[400, 59, 50, 8, 6, 12, 160],
						barWidth: 10,
						barGap: 0
					}],
					//控制边距　
					grid: {
						left: '8%',
						//right:'1%',
						//top: '0%',
						bottom: '6%',
						containLabel: true,
					}
				}
				this.myChart.setOption(option, true)
			}
		},
		mounted() {
			this.myChart = echarts.init(document.querySelector('.columnChart .column'));
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

		.column {
			width: 100%;
			height: calc(478px - 100px);
			background: url(../../assets/img/bg-zhuzhuangtu.png) no-repeat !important;
			background-size: 100% 100% !important;
			canvas{
				width: 100% !important;
			}
		}
	}
</style>
