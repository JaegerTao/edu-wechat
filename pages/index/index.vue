<template>
	<view class="content">
		<!-- header部分 -->
		<view class="index-header" :style="{backgroundImage: 'url('+imgUrl+')'}">
			<image src="../../static/imgs/sicnu-logo-white.png" mode="aspectFit"></image>
			
			<view class="header-title">
				<view class="header-title-main">学生教育发展指数及评价云服务</view>
				<view class="header-title-vice">四川师范大学师生信息一体化建设</view>
			</view>
			
		</view>

		<!-- 主展示main部分 -->
		<view class="index-main">
			<view class="index-main-funcBtns">
				<!-- 未登录时显示 -->
				<view class="grid col-2 text-center" v-if="!hasLogin">
					<view class="funcBtns" @tap="goItemPage('')">
						<service-card></service-card>
					</view>
					<view class="funcBtns" @tap="goItemPage('')">
						<service-card url="../../static/imgs/到校登记@3x.png" title="专业要求与学籍服务"></service-card>
					</view>
					<view class="funcBtns" @tap="goItemPage('')">
						<service-card url="../../static/imgs/考试安排icon_96.png" title="课外总览与能力评价服务"></service-card>
					</view>
					<view class="funcBtns" @tap="goItemPage('')">
						<service-card url="../../static/imgs/本科生管理@3x.png" title="课程在线考试"></service-card>
					</view>
				</view>
				<!-- 登录后动态加载 -->
				<view class="grid col-2 text-center" v-if="hasLogin && serviceList">
					<block v-for="(item, index) in serviceList" :key='index'>
						<view class="funcBtns" @tap="goItemPage(dicPath('s', item.rorder))">
							<service-card :url="dicPath('img',item.rorder)" :title="item.sename"></service-card>
						</view>
					</block>
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
	import indexapi from '@/common/indexApis/indexApi.js'
	import Dic from './dic.js'
	export default {
		data() {
			return {
				imgUrl : this.$baseURL + "/img/Timg.jpg",
				
				TabCur: 0,//导航号
				scrollLeft: 0,//滚动
				modalName: null, //模态框
				serviceList: null, //服务列表
				servPathMap: null, //字典
			}
		},
		computed:{
			...mapState(['hasLogin','YRole','YLoginId']),
			dicPath(){//计算属性，根据service获取的数据来查询字典返回路径
				return function(type, rorder){
					let that = this
					for(let dicitem of that.servPathMap){
						if(rorder == dicitem.rorder){
							switch(type){
								case 'img': return dicitem.imgpath 
									break
								case 's': return dicitem.spath 
									break
								case 'm': return dicitem.mpath
									break
								default: 
									break;
							}
						}
					}
					return ''
				}
			},
		},
		components:{
		},
		onShow() {
			if(this.serviceList == null){
				this.loadService()
			}
		},
		onLoad() {
			this.servPathMap = Dic.servPathMap
			this.loadService()
			console.log('onload')
		},
		onPullDownRefresh() {
			console.log(this.serviceList)
			this.loadService()
		},
		methods: {
			//跳转页面
			goItemPage(url){
				console.log(this.hasLogin)
				if(!this.hasLogin){
					this.showModal()
					return
				}
				if(url === ''){
					this.$ToastFail('该服务微信端暂未开放，敬请期待')
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
			//收起模态框，跳转登录页
			goLogin(){
				this.hideModal()
				uni.navigateTo({
					url:'../login/login'
				})
			},
			//获取服务
			async loadService(){
				if(!this.hasLogin) return //未登录不需要获取
				this.$showLoading('加载中...')
				let options, serviceData = null
				try{
					options = await indexapi.GetOptions('UserRole&UserID='+this.YLoginId)
					serviceData = await indexapi.loadService()
				}catch(e){
					this.$ToastFail('服务获取失败,请下拉刷新重试')
					return 
				}
				uni.hideLoading()
				this.serviceList = serviceData.rows
				console.log(this.serviceList)
				if(this.serviceList == null){
					this.$ToastFail('暂无服务') 
					return
				} 
				if(this.serviceList.length <= 0) this.$ToastFail('暂无服务')
			},
		}
	}
</script>

<style lang="less" scoped>
	// @baseURL: 'http://localhost:8090';
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.index-header {
		width: 750rpx;
		height: 350rpx;
		// background-image: url('@{baseURL}/img/Timg.jpg');
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
		margin-top: 50rpx;
		height: 120rpx;
	}
	
	.modaltext{
		font-size: 30rpx;
	}
</style>
