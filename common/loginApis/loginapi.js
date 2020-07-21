import Vue from 'vue'
let vm = new Vue()

//执行登录操作，成功返回true，失败返回false
async function doLogin(submitData){
	return new Promise((resolve, reject) =>{
		// uni.request({
		// 	url: vm.$baseURL,
		// 	method:'POST',
		// 	data:submitData,
		// 	success: (res) => {
		// 		resolve(res)
		// 	},
		// 	fail: (err) => {
		// 		reject(err)
		// 	}
		// })
		setTimeout(()=>{
			console.log(submitData)
			try{
				uni.setStorageSync('token', 'login:ok')
				uni.setStorageSync('session', 'sessiontxt')
				vm.$store.commit('slogin', 'sessiontxt')
				resolve(true)
			}catch(e){
				//TODO handle the exception
				console.log(e)
				reject(false)
			}
		}, 500)
	})
}
//执行登出操作,登出成功返回true，否则返回false
async function doLogout(){
	return new Promise((resolve, reject)=>{
		try{
			uni.clearStorageSync()
			vm.$store.commit('slogout')
			resolve(true)
		}catch(e){
			//TODO handle the exception
			console.log(e)
			reject(false)
		}
	})
}

const loginapi = {
	doLogin: doLogin,
	doLogout: doLogout
}

module.exports = loginapi