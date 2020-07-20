let device = {}

// 返回设备信息
device.install = function(Vue){
	//设备高度
	Vue.prototype.$deviceHeight = function(){
		let deviceHeight = 0
		let deviceWidth = 0
		uni.getSystemInfo({
			success: (e) => {
				// console.log(e)
				deviceHeight = e.windowHeight
				deviceWidth = e.windowWidth
			}
		})
		return deviceHeight
	}
}
export default device