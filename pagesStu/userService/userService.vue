<!-- 学生信息采集与服务信息 -->
<template>
	<view class="container">
		<view class="header">
			<nav-header></nav-header>
		</view>

		<view class="main" :style="[{height: deviceHeight + 'px', backgroundImage:'url('+baseURL+'/img/Timg.jpg)'}]">
			<view class="main-funcBtns" >
				<view class="grid col-2 text-center">
					<view class="" @tap="navTo('stuTable/stuTable')">
						<service-card :url="baseURL+'/StuInfoService/img/stuImg1.png'" title="信息采集" vice="学生个人基本信息采集" imgsize="150"></service-card>
					</view>
					<view class="" @tap="navTo('userinfo/userinfo')">
						<service-card :url="baseURL+'/StuInfoService/img/stuImg2.png'" title="学生一张表" vice="查看个人基础信息/学业信息/奖励活动等"
						 imgsize="150"></service-card>
					</view>
					<view class="" @tap="navTo('stuMaterialInfo/stuMaterialInfo')">
						<service-card :url="baseURL+'/StuInfoService/img/stuImg3.png'" title="常见表格自动生成/填写" vice="自动生成并填写贫困生奖助学金申请表、请假条等多类表格" imgsize="150"></service-card>
					</view>
					<view class="" @tap="navTo('handleProcess/handleProcess')">
						<service-card :url="baseURL+'/StuInfoService/img/stuImg4.png'" title="学生办事指南" vice="查看转户口、入党流程、选课流程等多种办事指南" imgsize="150"></service-card>
					</view>
					<view class="" @tap="navTo('Association/Association')">
						<service-card :url="baseURL+'/StuInfoService/img/stuImg5.png'" title="协会与社团信息" vice="查看协会简介,全方位了解社团信息,快来申请加入你心仪的社团吧^_^" imgsize="150"></service-card>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import navHeader from '@/components/nav-header.vue'
	// import serviceCard from '@/components/service-card.vue'
	export default {
		data() {
			return {
				baseURL: this.$baseURL,
				deviceHeight: 800
			};
		},
		components: {
			// navHeader,
			// serviceCard
		},
		onShow() {
			// this.ToggleDelay()
			this.deviceHeight = this.$deviceHeight()
		},
		methods:{
			// 页面跳转
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			// 动画
			ToggleDelay() {
				console.log("动画")
				this.toggleDelay= true;
				setTimeout(()=>{
					this.toggleDelay= false
				}, 1000)
			}
		}
	}
</script>

<style lang="less" scoped>
	// @baseURL: 'http://localhost:8090';
	.main{
		// background-image: url('@{baseURL}/img/Timg.jpg'); //url(http://localhost:8090/img/Timg.jpg);
		background-size: 900rpx;
	}
</style>
