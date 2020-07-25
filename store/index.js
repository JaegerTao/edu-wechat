import Vue from 'vue'
import Vuex from 'vuex'
import storageEx from '../common/storage.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		hasLogin: false,
		STOKEN: '',
		YUserName: '',
		YLoginId: '',
		YRole: '',
		YUType: '',
		YUserUnitId: '',
		YUserGrade: '',
	},
	mutations:{
		slogin(state){
			state.hasLogin = true
		},
		slogout(state){
			state.hasLogin = false
		},
		setInfo(state, InfoJson){
			state.STOKEN = InfoJson.STOKEN
			state.YUserName = InfoJson.YUserName
			state.YLoginId = InfoJson.YLoginId
			state.YRole = InfoJson.YRole
			state.YUType = InfoJson.YUType
			state.YUserUnitId = InfoJson.YUserUnitId
			state.YUserGrade = InfoJson.YUserGrade
		},
		clearInfo(state){
			state.STOKEN = null
			state.YUserName = null
			state.YLoginId = null
			state.YRole = null
			state.YUType = null
			state.YUserUnitId = null
			state.YUserGrade = null
		}
	},
	actions:{
		setInfo: async function({commit, state}){
			console.log('重置state')
			let STOKEN = storageEx.getStorageExpire('STOKEN')
			let YUserName = storageEx.getStorageExpire('YUserName')
			let YLoginId = storageEx.getStorageExpire('YLoginId')
			let YRole = storageEx.getStorageExpire('YRole')
			let YUType = storageEx.getStorageExpire('YUType')
			let YUserUnitId = storageEx.getStorageExpire('YUserUnitId')
			let YUserGrade = storageEx.getStorageExpire('YUserGrade')
			commit('setInfo', {
				STOKEN:STOKEN, 
				YUserName:YUserName, 
				YLoginId:YLoginId, 
				YRole:YRole, 
				YUType:YUType, 
				YUserUnitId:YUserUnitId, 
				YUserGrade:YUserGrade})
			commit('slogin')
		}
	}
})

export default store