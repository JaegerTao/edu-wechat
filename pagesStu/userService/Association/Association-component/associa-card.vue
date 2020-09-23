<!-- 协会卡片 -->
<template>
	<view class="associa-card flex card">
		<view class="left flex-sub">
			<image :style="{width:imgsize +'rpx',height:imgsize+'rpx'}" :src="url" mode="aspectFit"></image>
		</view>
		
		<view class="right flex-twice text-center">
			<view class="card-title">
				{{ title }}
			</view>
			
			<view class="btn-join">
				<button v-if="ifapply==0" class="cu-btn text-blue light">{{ btntxt }}</button>
				<button v-if="ifapply==1" class="cu-btn text-yellow light">已申请</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			url: { //图片链接
				type: String,
				default: ''
			},
			title: { //卡片标题
				type: String,
				default: '鹰火魂彝文化研究协会'
			},
			imgsize:{//图标大小
				type: String,
				default: '70'
			},
			btntxt: {//按钮文字
				type: String,
				default: '加入'
			},
			ifapply: {//是否已加入社团
				type: Number,
				default: 0
			}
		}
	}
</script>

<style lang="less" scoped>
	.associa-card{
		margin: 15rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		border: 1rpx solid rgba(0,0,0,0.1);
		border-radius: 10rpx;
		box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
		
		.left{
			margin-left: 20rpx;
			display: flex;
			justify-content: space-around;
		}
		.right{
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			
			.card-title{
				font-size: 20rpx;
			}
			.btn-join{
				button{
					height: 30rpx;
					font-size: 20rpx;
				}
			}
		}
	}
</style>
