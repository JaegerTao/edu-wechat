<template>
	<view>
		<view class="Top light">
			<view class="circlePercent">
				<circle-percent bg="#9d9d9d" :percent="accuracy"></circle-percent>
			</view>
			<view class="statInfo">
				<view class="problem">
					<text class="pTitle">做题总数</text>
					<text class="pNum">{{ questionNum }}个</text>
				</view>
				<view class="paper">
					<text class="pTitle">已做题卷</text>
					<text class="pNum">{{ paperNum }}套</text>
				</view>
			</view>
		</view>
		<view class="Main">
			
		</view>
		
		<view class="text-center margin-top">
			<view class="cu-btn bg-blue round" @tap="navTo()">
				测试入口
			</view>
		</view>
	</view>
</template>

<script>
	import circlePercent from '../../components/circle-percent/circle-percent.vue'
	export default {
		data() {
			return {
				// accuracy: '0',
				questionNum: 100,//已做题目总数
				rightQNum: 20,//正确题目总数
				paperNum: 0,//已做试卷套数
			};
		},
		computed:{
			accuracy:function(){//正确率
				let that = this
				if(that.questionNum <= 0) return 0
				let percent = Number(that.rightQNum / that.questionNum * 100).toFixed(1)
 				return percent
			}
		},
		components:{
			circlePercent
		},
		methods:{
			navTo(){
				uni.reLaunch({
					url:'./examFrame/examFrame'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.Top{
		height: 320rpx;
		border-radius: 30rpx 30rpx 0rpx 0rpx;
		position: relative;
		background-color: #808080;
		
		.circlePercent {
			position: absolute;
			top: 20rpx;
			left: 260rpx;
		}
		.statInfo{
			position: relative;
			font-weight: 100;
			color: #FFFFFF;
		}
		.problem{
			position: relative;
			top: 60rpx;
			left: 50rpx;
			font-size: 35rpx;
		}
		.paper{
			position: relative;
			top: 60rpx;
			left: 550rpx;
			font-size: 35rpx;
		}
		.pTitle{
			position: absolute;
		}
		.pNum{
			position: absolute;
			top: 80rpx;
			left: 50rpx;
		}
	}
</style>
