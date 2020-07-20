<template>
	<view class="container">
		<view class="header">
			<view class="avatar-box">
				<image :src="isLogin?avatarURL:'../../static/imgs/img_25832_0_2.png'" mode="aspectFill"></image>
			</view>
			<view class="header-content" v-if="isLogin">
				<view class="username">
					蒋滔
				</view>
				<view class="userid">
					2017110414
				</view>
			</view>
			<view class="header-content" v-else>
				<view class="BtnGoLogin" @tap="navTo('../login/login')">
					请登录
				</view>
			</view>
		</view>
		
		<view class="main">
			<view class="cu-list menu">
				<view class="cu-item arrow" v-if="isLogin">
					<view class="content">
						<text class="cuIcon-list"></text>
						<text class="text-black">账号管理</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-question"></text>
						<text class="text-black">帮助中心</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="footer">
			<button v-if="isLogin" class="cu-btn text-white shadow shadow-blur" @tap="logout">退出账号</button>
			<button v-else class="cu-btn text-white shadow shadow-blur" @tap="navTo('../login/login')">去登陆</button>
		</view>
	</view>
</template>

<script>
	import navHeader from '../../components/nav-header.vue'
	
	export default {
		data() {
			return {
				isLogin:false,
				avatarURL:'http://localhost:8083/StuInfoService/img/girl.png'
			};
		},
		components:{
			navHeader
		},
		onShow() {
			this.checkLogin()
		},
		methods:{
			//检查是否登录
			checkLogin(){
				try{
					uni.getStorage({
						key:'token',
						success: (res) => {
							console.log(res)
							if(res.data.trim()!=''){
								this.isLogin = true
							}
						}
					})
				}catch(e){
					//TODO handle the exception
				}
			},
			
			//跳转页面
			navTo(url){
				uni.navigateTo({
					url:url
				})
			},
			
			//退出登录
			logout(){
				try{
					uni.clearStorage()
					uni.reLaunch({
						url:'../index/index'
					})
				}catch(e){
					//TODO handle the exception
				}
			}
			
		}
	}
</script>

<style lang="less" scoped>
	.container{
		
	}
	.header{
		height: 250rpx;
		background-image: url(http://localhost:8083/img/Timg.jpg);
		background-size: 800rpx 300rpx;
		border-radius:0rpx 0rpx 30rpx 30rpx;
		box-shadow: 0rpx 10rpx 5rpx #e2e2e2;
		display: flex;
		
		.avatar-box{
			margin: 62.5rpx;
			
			image{
				// border: 1rpx solid #1CBBB4;
				border-radius: 50%;
				width: 125rpx;
				height: 125rpx;
				background-color: #ffffff;
			}
		}
		
		.header-content{
			// border: 1px solid white;
			height: 125rpx;
			margin-top: 62.5rpx;
			font-size: 35rpx;
			color: #FFFFFF;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
	}
	
	.main{
		margin-top: 25rpx;
	}
	
	.footer{
		margin-top: 30rpx;
		text-align: center;
		
		button{
			width: 300rpx;
			font-size: 35rpx;
			border-radius: 30rpx;
			background-color: #808080;
		}
	}
</style>
