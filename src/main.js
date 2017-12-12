// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../static/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/change.css'
import Vue from 'vue'
import store from './store/store'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'


Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
