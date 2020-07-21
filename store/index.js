import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		hasLogin: false,
		session: ''
	},
	mutations:{
		slogin(state, session){
			state.hasLogin = true,
			state.session = session
		},
		slogout(state){
			state.hasLogin = false
			state.session = ''
		}
	},
	actions:{
		
	}
})

export default store