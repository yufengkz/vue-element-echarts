<!-- 柱状图 -->
<template>
  <div class="columnChart">
    <div class="main"></div>
  </div>

</template>

<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {
        legendArr: [],
        color: '#ccc',
        myChart: {},
        name: '柱状图'
      }
    },
    methods: {

    },
    components: {},
    mounted() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.querySelector('.columnChart .main'));
      this.myChart.setOption({
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
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          textStyle: {
            color: '#fff', //设置柱状图代表什么
          },
          data:['蒸发量','降水量'] //,'平均温度'
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
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
            name:'蒸发量',
            type:'bar',
            data:[50.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name:'降水量',
            type:'bar',
            data:[50.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          },
//          {
//            name:'平均温度',
//            type:'line',
//            yAxisIndex: 1,
//            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
//          }
        ]
      })
    }
  }
</script>

<style scoped lang="less">
  .columnChart {
    width: 100%;
    height: 800px;
    background: url('../../assets/bg.jpg') no-repeat;
    background-size: 100% 100%;
    color: white;

    .main {
      width: 100%;
      height: calc(800px - 100px);
      margin-top: -15px;
    }
  }
</style>
