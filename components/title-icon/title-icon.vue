<template>
	<view>
		<view class="header-icon" :style="{backgroundImage: 'url('+stuScoreImgUrl+')',backgroundSize: bgSize + 'rpx'}">
				<view class="text-bold" :style="{fontSize: fontSize + 'rpx'}">{{ title }}</view>
				<view class="header-icon-sub" :style="{fontSize: fontSize-13 + 'rpx'}">{{ subtitle }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stuScoreImgUrl: this.$baseURL + '/StuInfoService/funcStuGuide/img/stuScore.png',
			};
		},
		props:{
			title:{
				type: String,
				default: '服务指南'
			},
			subtitle:{
				type: String,
				default: 'SERVICE GUIDE'
			},
			bgSize: {
				type: Number,
				default: 200
			},
			fontSize: {
				type: Number,
				default: 30
			}
		}
	}
</script>

<style lang="less" scoped>
	.header-icon{
		height: 90rpx;
		background-repeat: no-repeat;
		background-size: 200rpx;
		display: flex;
		flex-direction: column;
		view{
			margin-top: 5rpx;
			margin-left: 28rpx;
		}
		.header-icon-sub{
			font-size: 17rpx;
		}
	}
</style>
