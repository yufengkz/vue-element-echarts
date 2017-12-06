import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home'
import CommunityStatistics from '../components/community/community-statistics'
import CommunityMap from '../components/community/community-map'

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
	]
})
