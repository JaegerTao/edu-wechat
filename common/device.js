let device = {}

// 返回设备信息或提示
device.install = function(Vue){
	let deviceHeight = 0
	let deviceWidth = 0
	uni.getSystemInfo({
		success: (e) => {
			// console.log(e)
			deviceHeight = e.windowHeight
			deviceWidth = e.windowWidth
		}
	})
	//设备高度
	Vue.prototype.$deviceHeight = function(){
		return deviceHeight
	},
	//设备宽度
	Vue.prototype.$deviceWidth = function(){
		return deviceWidth
	},
	//显示失败提示信息
	Vue.prototype.$ToastFail = function(text){
		uni.showToast({
			icon:'none',
			title: text
		})
	},
	//显示加载
	Vue.prototype.$showLoading = function(text){
		uni.showLoading({
			title:text,
			mask:true
		})
	}
}
export default device