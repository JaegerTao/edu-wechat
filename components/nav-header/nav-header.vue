<!-- 头部组件 -->
<template>
	<view class="header">
		<view class="header-title">
			<image src="../../static/imgs/sicnu-logo-white.png" mode="aspectFit"></image>
			<view class="header-title-main">
				{{title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			title:{
				type: String,
				default: '学生信息采集与信息服务'
			}
		}
	}
</script>

<style lang="less" scoped>
	.header-title{
		width: 100%;
		height: 100rpx;
		background-color: #17a2b8;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		
		image{
			margin-left: 20rpx;
			height: 50rpx;
			width: 300rpx;
		}
		.header-title-main{
			width: 450rpx;
			text-align: center;
			font-size: 30rpx;
			font-weight: 800;
		}
		
	}
</style>
