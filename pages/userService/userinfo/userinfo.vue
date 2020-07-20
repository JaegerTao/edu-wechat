<!-- 个人信息界面 -->
<template>
	<view>
		<view>
			<nav-header></nav-header>
		</view>
		<view class="user-header bg-gray light">
			<view class="avatar-box">
				<image src="http://localhost:8083/StuInfoService/img/girl.png" mode="aspectFit"></image>
			</view>
			<view class="header-content">
				<view class="header-name text-black">
					蒋滔
				</view>
				<view class="header-grd text-black">
					2017级 / 计算机科学学院
				</view>
			</view>
		</view>
		<view class="user-main">
			<view class="info-nav">
				<scroll-view scroll-x class="bg-white nav">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="0==TabCur?'text-blue cur':''"  @tap="tabSelect"
						 :data-id="0">
							基本信息
						</view>
						<view class="cu-item flex-sub" :class="1==TabCur?'text-blue cur':''"  @tap="tabSelect"
						 :data-id="1">
							其它信息
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="basic-info" v-show="TabCur==0">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-orange"></text> 个人基础信息
					</view>
				</view>
				<view class="cu-list menu sm-border">
					<block>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">学号</text>
							</view>
							<view class="action">
								<text class="text-black">{{basicInfo.stuID}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">姓名</text>
							</view>
							<view class="action">
								<text class="text-black">{{basicInfo.Name}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">性别</text>
							</view>
							<view class="action">
								<text class="text-black">{{basicInfo.Gender}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">出生日期</text>
							</view>
							<view class="action">
								<text class="text-black">{{basicInfo.BirthDay}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">民族</text>
							</view>
							<view class="action">
								<text class="text-black">{{basicInfo.Nation}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">身份证号</text>
							</view>
							<view class="action">
								<text class="text-black">{{basicInfo.ID}}</text>
							</view>
						</view>
					</block>
				</view>
			</view>
			
			
			<view class="extend-info" v-show="TabCur==1">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-orange"></text> 学籍信息
					</view>
				</view>
				<view class="cu-list menu sm-border">
					<block>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">学籍状态</text>
							</view>
							<view class="action">
								<text class="text-black">{{extendInfo.status}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">院系</text>
							</view>
							<view class="action">
								<text class="text-black">{{extendInfo.college}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">专业</text>
							</view>
							<view class="action">
								<text class="text-black">{{extendInfo.major}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">年级</text>
							</view>
							<view class="action">
								<text class="text-black">{{extendInfo.grd}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">班级</text>
							</view>
							<view class="action">
								<text class="text-black">{{extendInfo.cls}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">学制</text>
							</view>
							<view class="action">
								<text class="text-black">{{extendInfo.studysys}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">学生类别</text>
							</view>
							<view class="action">
								<text class="text-black">{{extendInfo.stutype}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">学习形式</text>
							</view>
							<view class="action">
								<text class="text-black">{{extendInfo.stuform}}</text>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import userinfo from './userinfotest.js'
	import navHeader from '../../../components/nav-header.vue'
	
	export default {
		data() {
			return {
				TabCur: 0,//导航号
				scrollLeft: 0,//滚动
				// userinfoList: null,
				basicInfo: null,//基本信息json
				extendInfo: null
			};
		},
		components:{
			navHeader
		},
		onLoad(){
			// this.userinfoList = userinfo.UserinfoList
			this.basicInfo = userinfo.UserinfoList.basicInfo
			this.extendInfo = userinfo.UserinfoList.extendInfo
		},
		methods:{
			//导航键选中
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style lang="less" scoped>
	.user-header{
		height: 300rpx;
		border-bottom: 1rpx solid #cccccc;
		width: 750rpx;
		
		.avatar-box{
			border: 1rpx solid #cecece;
			height: 155rpx;
			width: 155rpx;
			border-radius: 50%;
			padding: 5rpx;
			position: relative;
			left: 50%;
			top: 25rpx;
			transform: translate(-50%);
			
			image{
				border: 1rpx solid #cecece;
				border-radius: 50%;
				height: 100%;
				width: 100%;
			}
		}
		
		.header-content{
			// border: 1rpx solid #cecece;
			margin-left: 50%;
			margin-top: 45rpx;
			transform: translate(-50%);
			text-align: center;
			
			.header-name{
				font-size: 35rpx;
				font-weight: 1000;
				font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif
			}
			
			.header-grd{
				
			}
		}
	}
</style>
