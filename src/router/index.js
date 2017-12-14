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
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/cs',
			name: 'CommunityStatistics',
			component: CommunityStatistics
		},
		{
			path: '/cm',
			name: 'CommunityMap',
			component: CommunityMap
		},
		{
			path: '/prc',
			name: 'Process',
			component: Process
		},
		{
			path: '/service',
			name: 'Service',
			component: Service
		},
		{
			path: '/tradepic',
			name: 'TradePic',
			component: TradePic
		},
		{
			path: '/routes',
			name: 'RoutesLine',
			component: RoutesLine
		},
	]
})
