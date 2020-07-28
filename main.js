import Vue from 'vue'
import App from './App'
import store from './store'  //使用Vuex
import verification from 'common/verify/verification.js' //自定义表单验证
import device from 'common/device.js'//设备信息

Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(verification)
Vue.use(device)

Vue.prototype.$store = store //挂载vuex
Vue.prototype.$baseURL = 'http://localhost:8083'
Vue.prototype.$contentType = 'application/x-www-form-urlencoded; charset=UTF-8'

const app = new Vue({
	store,
    ...App
})
app.$mount()
