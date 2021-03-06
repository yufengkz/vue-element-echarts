import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger' //vuex looger打印插件

Vue.use(Vuex)

const debug = true //process.env.NODE_ENV //!== 'production'

const store = new Vuex.Store({
	state: {
		count: 0,
		color: ['#00c6d7', '#0b7bdc'],
		countyLists: [],
		searchData: {},
		showallData: false,
		showallTop: 0,
	},
	mutations: {
		set(state, data){
			state.countyLists = data
		},
		setSearchData(state, data){
			state.searchData = data
		},
		setShowAll(state, data){
			state.showallData = data
		},
		setShowTop(state, data){
			state.showallTop = data
		}
	},
	strict: debug,
	plugins: debug ? [createLogger()] : []
})

export default store
