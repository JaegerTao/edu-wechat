<!-- 学生信息采集与服务信息 -->
<template>
	<view class="container">
		<view class="header">
			<nav-header></nav-header>
		</view>

		<view class="main" :style="[{height: deviceHeight + 'px'}]">
			<view class="main-funcBtns">
				<view class="grid col-2 text-center">
					<view :class="toggleDelay?'animation-slide-bottom':''" :style="[{animationDelay: '1s'}]" @tap="goStuTable">
						<service-card url="http://localhost:8083/StuInfoService/img/stuImg1.png" title="信息采集" vice="学生个人基本信息采集" imgsize="150"></service-card>
					</view>
					<view class="" @tap="goUserinfo">
						<service-card url="http://localhost:8083/StuInfoService/img/stuImg2.png" title="学生一张表" vice="学生一张表包含个人基础信息/组织关系信息/履历信息等"
						 imgsize="150"></service-card>
					</view>
					<view class="" @tap="ToggleDelay()">
						<service-card url="http://localhost:8083/StuInfoService/img/stuImg3.png" title="常见表格自动生成/填写" vice="提供贫困生奖助学金申请表、入党申请书、请假条等多类表格自动生成与填写服务" imgsize="150"></service-card>
					</view>
					<view class="" @tap="goHandleProcess">
						<service-card url="http://localhost:8083/StuInfoService/img/stuImg4.png" title="学生办事指南" vice="包含转户口、入党流程、选课流程等多种办事指南" imgsize="150"></service-card>
					</view>
					<view class="">
						<service-card url="http://localhost:8083/StuInfoService/img/stuImg5.png" title="协会团体信息" vice="学校全部社团相关简介信息" imgsize="150"></service-card>
					</view>
					<view class="">
						<service-card url="http://localhost:8083/StuInfoService/img/stuImg6.png" title="社团申报" vice="快来申请加入你心仪的社团吧！" imgsize="150"></service-card>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navHeader from '../../components/nav-header.vue'
	import serviceCard from '../../components/service-card.vue'
	
	export default {
		data() {
			return {
				toggleDelay:false,
				deviceHeight: 800
			};
		},
		components: {
			navHeader,
			serviceCard
		},
		onShow() {
			// this.ToggleDelay()
			this.deviceHeight = this.$deviceHeight()
		},
		methods:{
			// 页面跳转
			goStuTable(){//信息采集页面
				uni.navigateTo({
					url:'stuTable/stuTable'
				})
			},
			goUserinfo(){//学生一张表
				uni.navigateTo({
					url:'userinfo/userinfo'
				})
			},
			goHandleProcess(){//学生办事指南
				uni.navigateTo({
					url:'handleProcess/handleProcess'
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
	.main{
		background-image: url(http://localhost:8083/img/Timg.jpg);
		background-size: 900rpx;
	}
</style>
