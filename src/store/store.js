import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger' //vuex looger打印插件

Vue.use(Vuex)

const debug = true //process.env.NODE_ENV //!== 'production'

const store = new Vuex.Store({
	state: {
		count: 0,
		color: ['#325B69', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769']
	},
	strict: debug,
	plugins: debug ? [createLogger()] : []
})

export default store