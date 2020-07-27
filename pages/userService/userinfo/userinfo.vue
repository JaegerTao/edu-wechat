<!-- 个人信息界面 -->
<template>
	<view>
		<view>
			<nav-header title="学生一张表"></nav-header>
		</view>
		
		<view class="user-main">
			<basic-info v-if="navCur==0"></basic-info>
			
			<grade-info v-if="navCur==1"></grade-info>
			
			<actapply-info v-if="navCur==2"></actapply-info>
			
			<view class="cu-tabbar-height"></view>
		</view>
		
		<view class="cu-bar tabbar bg-gray foot">
			<view class="action" :class="navCur==0?'text-blue':'text-gray'" @tap="NavChange" data-cur="0">
				<view class="cuIcon-my"></view>个人基本信息
			</view>
			<view class="action" :class="navCur==1?'text-blue':'text-gray'" @tap="NavChange" data-cur="1">
				<view class="cuIcon-selection"></view>学业成绩与活动总览
			</view>
			<!-- <view class="action" :class="navCur==2?'text-blue':'text-gray'" @tap="NavChange" data-cur="2">
				<view class="cuIcon-selection"></view>活动总览
			</view> -->
		</view>
	</view>
</template>

<script>
	import navHeader from '@/components/nav-header.vue'
	import basicInfo from './userinfo-components/basic-info.vue'
	import gradeInfo from './userinfo-components/grade-info.vue'
	export default {
		data() {
			return {
				navCur: 0,//底部导航标识 0 1 2
			};
		},
		components:{
			navHeader,
			basicInfo,
			gradeInfo
		},
		onLoad(){
			
		},
		methods:{
			// 底部导航栏
			NavChange: function(e) {
				this.navCur = e.currentTarget.dataset.cur
			},
		}
	}
</script>

<style lang="less" scoped>
	
</style>
