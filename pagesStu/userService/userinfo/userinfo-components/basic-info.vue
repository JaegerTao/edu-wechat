<!-- 基本信息 -->
<template>
	<view class="page">
		<view class="user-header cu-card case">
			<view class="cu-item" style="{}">
				<view class="flex align-center">
					<view class="flex-sub padding-sm margin-xs radius">
						<view class="cu-avatar radio xl padding" :style="{backgroundImage: 'url('+ baseURL +'/StuInfoService/funcStuTab/img/userface.gif);'}">
						</view>
						<!-- <view class="cu-avatar radius xl padding" :style="{backgroundImage:'url('+basicInfo? baseURL+basicInfo['headphoto']: baseURL+'/StuInfoService/funcStuTab/img/userface.gif'+')'}">
						</view> -->
					</view>
					<view class="flex-twice padding-sm margin-xs radius">
						<view class="header-content">
							<view class="header-name text-black text-bold">
								{{ basicInfo?basicInfo['PName']:'--'}}
							</view>
							<view class="header-grd text-black">
								<text space="nbsp">{{ basicInfo?basicInfo['Sex']:'--'}}     {{ basicInfo?basicInfo['Nation']:'--'}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="basic-info">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 个人基本信息
				</view>
			</view>
			<view class="cu-list menu sm-border">
				<view class="cu-item" v-for="(info, index) in basicInfoDic" :key='index'>
					<view class="content">
						<text class="text-grey">{{info.name}}</text>
					</view>
					<view class="action">
						<text class="text-black">{{basicInfo?basicInfo[info.val]:'--'}}</text>
					</view>
				</view>
				<!-- <view class="cu-item">
					<view class="content">
						<text class="text-grey">姓名</text>
					</view>
					<view class="action">
						<text class="text-black">{{basicInfo.Name}}</text>
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
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import userinfoDic from '../userinfoDic.js'
	import userinfoapi from '@/common/userServiceApis/userinfoapi.js'
	export default {
		data() {
			return {
				baseURL: this.$baseURL,
				basicInfoDic: null, //显示字典
				basicInfo: null,//基本信息json
			}
		},
		mounted() {
			this.getBasicInfo()
			this.basicInfoDic = userinfoDic.basicInfoDic
		},
		methods:{
			//获取基本信息
			async getBasicInfo(){
				this.$showLoading('加载中...')
				let binfo = null
				try{
					binfo = await userinfoapi.getBasicInfo()
				}catch(e){
					//TODO handle the exception
					console.log(e)
					this.$ToastFail('加载失败，请重试')
					return
				}
				uni.hideLoading()
				this.basicInfo = binfo
			},
		}
	}
</script>

<style lang="less" scoped>
	.page{
		background-color: #F0F0F0;
	}
	.user-header{
		.cu-item{
			box-shadow: 0rpx 10rpx 10rpx rgba(0,0,0,0.1);
			.cu-avatar{
				height: 150rpx;
				width: 150rpx;
				margin-left: 15rpx;
			}
			.header-content{
				// border: 1px solid black;
				height: 130rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.header-name{
					font-size: 35rpx;
				}
				.header-grd{
					
				}
			}
		}
	}
	.basic-info{
		.cu-list,.cu-bar{
			width: 690rpx;
			margin-left: 30rpx;
			box-shadow: 10rpx 10rpx 10rpx rgba(0,0,0,0.1);
			border-radius: 5rpx;
		}
	}
</style>
