<script>
	import storageEx from './common/storage.js'
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
				console.log('checklogin')
				try{
					let YLoginId = storageEx.getStorageExpire('YLoginId')
					if(YLoginId == null) {
						storageEx.clearExpire()
						return
					}
					this.$store.dispatch('setInfo')
				}catch(e){
					//TODO handle the exception
					console.log(e)
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
