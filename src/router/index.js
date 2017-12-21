import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home'
import CommunityStatistics from '../components/community/community-statistics'
import CommunityMap from '../components/community/community-map'
import Process from '../components/process/'
import Service from '../components/community/service'
import TradePic from '../components/show/tradepic'
import RoutesLine from '../components/show/routes' //车辆路线

import echarts from 'echarts'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/', //index
			name: 'Home',
			component: Home
		},
		{
			path: '/service',  //首页
			name: 'Service',
			component: Service
		},
		{
			path: '/service/cs',  //服务亭统计
			name: 'CommunityStatistics',
			component: CommunityStatistics
		},
		{
			path: '/service/cp',  //打包站统计
			name: 'CommunityMap',
			component: CommunityMap
		},
		{
			path: '/prc',  //溯源展示
			name: 'Process',
			component: Process
		},
		{
			path: '/prc/tradepic', //轮播图
			name: 'TradePic',
			component: TradePic
		},
		{
			path: '/prc/routes', //地图线路规划
			name: 'RoutesLine',
			component: RoutesLine
		},
	]
})
