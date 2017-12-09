<!-- 柱状图 -->
<template>
	<div class="columnChart">
		<!--搜索组件-->
		<SearchSlide></SearchSlide>
		<!--图表-->

    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div class="main">

          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <div class="main1">

          </div>
        </div>
      </el-col>
    </el-row>

	</div>

</template>

<script>
	import SearchSlide from '../search/search'
	import echarts from 'echarts'

	export default {
		created() {
			//console.log(this.$store.state.color)
		},
		data() {
			return {
				legendArr: [],
				color: this.$store.state.color,
				myChart: {},
				name: '柱状图'
			}
		},
		methods: {},
		components: {
			SearchSlide
		},
		mounted() {
			// 基于准备好的dom，初始化echarts实例
			this.myChart = echarts.init(document.querySelector('.columnChart .main'));
			this.myChart.setOption({
				title: {
					show: false
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					show: false
				},
				toolbox: {
					show: false
				},
				color: this.color,
				calculable: true,
				xAxis: [{
					name: '产品',
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
					data: ['12/05', '12/06','12/07', '12/08','12/09', '12/10', '12/11']
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
					name: '重量',
					type: 'value',
					nameTextStyle: {
						color: 'rgba(255, 255, 255, 0.69)'
					}
				}],
				series: [{
					name: '标签1',
					type: 'bar',
					data: [2.0, 4.9, 20, 50,60, 70, 30],
					barWidth: 16,
					barGap: 0
				},{
          name: '标签2',
          type: 'bar',
          data: [4.0, 5.9, 5, 8, 6, 12, 16],
          barWidth: 16,
          barGap: 0
        }]
			});
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

		.main {
			width: 100%;
			height: calc(478px - 100px);
			margin-top: -15px;
		}
	}
</style>
