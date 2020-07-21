<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.checkLogin()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			//检查是否登录
			checkLogin(){
				try{
					let token = uni.getStorageSync('token')
					let sessiontxt = uni.getStorageSync('session')
					if(!token || !sessiontxt) return
					this.$store.commit('slogin', sessiontxt)
				}catch(e){
					//TODO handle the exception
				}
			},
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./colorui/main.css");
	@import url("./colorui/icon.css");
	
	page{
		background-color: #FFFFFF;
		height: 100%;
	}
</style>
