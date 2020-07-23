<template>
	<view class="content">
		<!-- header部分 -->
		<view class="index-header">
			<image src="../../static/imgs/sicnu-logo-white.png" mode="aspectFit"></image>
			
			<view class="header-title">
				<view class="header-title-main">学生教育发展指数及评价云服务</view>
				<view class="header-title-vice">四川师范大学师生信息一体化建设</view>
			</view>
			
		</view>

		<!-- 主展示main部分 -->
		<view class="index-main">
			<view class="index-main-funcBtns">
				<view class="grid col-2 text-center">
					<view class="funcBtns" @tap="goItemPage('../userService/userService')">
						<service-card></service-card>
					</view>
					<view class="funcBtns" @tap="goItemPage('../onlineTest/onlineTest')">
						<service-card url="../static/imgs/本科生管理@3x.png" title="在线模考与练习服务"></service-card>
					</view>
					<view class="funcBtns" @tap="goItemPage(3)">
						<service-card url="../static/imgs/到校登记@3x.png" title="课程认证评估与学籍服务"></service-card>
					</view>
					<view class="funcBtns" @tap="goItemPage(4)">
						<service-card url="../static/imgs/考试安排icon_96.png" title="课外总览与能力评价服务"></service-card>
					</view>
				</view>
			</view>
			
			<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
				<view class="cu-dialog modaltext">
					<view class="cu-bar bg-white">
						<view class="action text-green" @tap="goLogin">去登录</view>
						<view class="action text-blue" @tap="hideModal">取消</view>
					</view>
					<view class="bg-white padding-xl">
						登录后可使用服务，是否去登录？
					</view>
				</view>
			</view>
		</view>

		<!-- footer部分 -->
		<view class="index-footer">
			<view class="footer-title">
				精心打造的在线服务平台
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import noticeList from './testdata.js'
	import serviceCard from '../../components/service-card.vue'
	export default {
		data() {
			return {
				TabCur: 0,//导航号
				scrollLeft: 0,//滚动
				modalName: null, //模态框
			}
		},
		computed:{
			...mapState(['hasLogin'])
		},
		components:{
			serviceCard
		},
		onLoad() {
		},
		onShow() {
		},
		methods: {
			//跳转页面
			goItemPage(url){
				console.log(this.hasLogin)
				if(!this.hasLogin){
					this.showModal()
					return
				}
				uni.navigateTo({
					url: url
				})
			},
			
			//未登录时模态框操作
			showModal() {
				this.modalName = 'bottomModal'
			},
			hideModal(e) {
				this.modalName = null
			},
			goLogin(){
				this.hideModal()
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.index-header {
		width: 750rpx;
		height: 350rpx;
		background-image: url(http://localhost:8083/img/Timg.jpg);
		background-size: 750rpx 350rpx;
		border-radius:0rpx 0rpx 30rpx 30rpx;
		box-shadow: 0rpx 10rpx 5rpx #e2e2e2;
		
		image {
			margin-top: 15rpx;
			margin-left: 15rpx;
			height: 75rpx;
			width: 375rpx;
		}
		
		.header-title{
			margin-top: 30rpx;
			color: #ffffff;
			
			.header-title-main{
				font-size: 45rpx;
				font-weight: 1000;
				margin-left: 60rpx;
			}
			
			.header-title-vice{
				margin-top: 30rpx;
				margin-left: 150rpx;
				font-size: 30rpx;
			}
		}
	}

	.index-main {
		margin-top: 10rpx;
		width: 750rpx;

		// border: 1rpx solid rgba($color: #000000, $alpha: 1.0);

		.index-main-funcBtns {
			margin-top: 10rpx;
			width: 700rpx;
			margin-left: 25rpx;
		}
	}
	
	.index-footer{
		margin-top: 20rpx;
		height: 120rpx;
	}
	
	.modaltext{
		font-size: 30rpx;
	}
</style>
