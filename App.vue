<script>
	import storageEx from './common/storage.js'
	import loginapi from './common/loginApis/loginapi.js'
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
			async checkLogin(){
				console.log('checklogin')
				try{
					let YLoginId = storageEx.getStorageExpire('YLoginId')
					//检查本地缓存，若本地缓存过期，则需重新登录
					if(YLoginId == null) {
						this.clearLogin()
						return
					}
					this.$store.dispatch('setInfo')
					//检查当前登录,如果已登录,则需重新登录
					let checkUser = await loginapi.checkUser('ONLINEMARK')
					if(checkUser !== 'ONLINEMARK'){
						this.clearLogin()
						return
					}
				}catch(e){
					//TODO handle the exception
					console.log(e)
					this.clearLogin()
				}
			},
			//清除登录状态
			clearLogin(){
				storageEx.clearExpire()
				this.$store.commit('slogout')
				this.$store.commit('clearInfo')
			}
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
