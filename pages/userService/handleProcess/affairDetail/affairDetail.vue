<template>
	<view class="page-affairDetail">
		<view class="header">
			<nav-header></nav-header>
			<view class="header-title">
				<span>转户口</span>
			</view>
			<!-- 步骤条 -->
			<view class="header-steps">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-orange"></text> 流程步骤
					</view>
					<view class="action">
						<button class="btnStep cu-btn bg-green shadow" @tap="ScrollSteps(0)">上一步</button>
						<button class="btnStep cu-btn bg-green shadow" @tap="ScrollSteps(1)">下一步</button>
					</view>
				</view>
				<scroll-view scroll-x class="bg-white padding response cu-steps steps-bottom" :scroll-into-view="'scroll-' + scroll"
				 scroll-with-animation>
					<view class="cu-item padding-lr-xl" :class="index>scroll?'':'text-blue'" v-for="(item,index) in 5" :key="index"
					 :id="'scroll-' + index" @tap="ScrollStepsTap(index)">
						流程 {{index + 1}} <text class="num" :data-index="index + 1"></text>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 流程详情 -->
		<view class="main" id="main-swiper">
			<swiper class="main-swiper" :current="scroll" @change="changeSwiper" :style="{height:scrollHeight + 'px'}">
				<swiper-item v-for="(item, index) in 5" :key="index">
					<scroll-view scroll-y :style="{height:scrollHeight + 'px'}">
						<view class="cu-card article">
							<view class="cu-item shadow">
								<view class="title">
									<view class="text-cut">准备申请资料</view>
								</view>
								<view class="content">
									<image src="https://f11.baidu.com/it/u=3682826506,185093271&fm=76" mode="aspectFill"></image>
									<view class="desc">
										<view class="text-content"> 成都高新区、锦江区、青羊区、金牛区、武侯区、成华区2017-2018年公共租赁住房于2018年1月2日开始进行承租意向登记，登记后的保障对象方可参加该批次公共租赁住房摇号及选房。</view>
										<view>
											<view class="cu-tag bg-red light sm round">住房</view>
											<view class="cu-tag bg-green light sm round">成都</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>

			</swiper>


		</view>
	</view>
</template>

<script>
	import navHeader from '../../../../components/nav-header.vue'
	
	export default {
		data() {
			return {
				scroll: 0, //流程步，从0开始
				scrollHeight: 1000, //scroll的高度
				home_height: 800
			};
		},
		components:{
			navHeader
		},
		onLoad() {
			
		},
		onShow() {
			this.setScrollHeight()
		},
		methods: {
			//步骤条操作
			ScrollSteps(action) { //按钮
				if (action == 0) { //上一步
					this.scroll = this.scroll <= 0 ? 0 : this.scroll - 1
				} else if (action == 1) { //下一步
					this.scroll = this.scroll >= 5-1 ? 5-1 : this.scroll + 1
				}
			},
			ScrollStepsTap(index) { //直接点击步骤条切换
				this.scroll = index
			},
			changeSwiper(e){//swiper的change事件切换步骤条
				// console.log(e)
				this.scroll = e.detail.current
			},
			
			
			//获取手机信息动态设置scroll高度
			setScrollHeight(){
				uni.getSystemInfo({
					success: (res) => {
						// console.log(res)
						this.home_height = res.windowHeight
						let info = uni.createSelectorQuery().select('.header');
						info.boundingClientRect(data =>{
							console.log(data)
							this.scrollHeight = this.home_height - data.height
							// console.log(this.scrollHeight)
						}).exec();
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-affairDetail {
		background-color: #F0F0F0;
		// height: 100%;
	}
	.header{
		
		.header-title {
			// border: 1rpx solid #007AFF;
			// text-align: center;
			height: 80rpx;
			display: flex;
			align-items: center;
			border-radius: 10rpx;
			width: 100%;
		
			span {
				font-size: 45rpx;
				margin-left: 50%;
				transform: translate(-50%);
				font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
				font-weight: 1000;
			}
		}
		
		.header-steps {
			margin-top: 5rpx;
		
			.btnStep {
				margin-left: 10rpx;
			}
		}
		
		padding-bottom: 20rpx;
	}
	

	.main {
		width: 750rpx;
		flex: 1;
		
		.main-swiper{
			// height: 1000rpx
		}
		
		scroll-view{
			// border: 1rpx solid #007AFF;
			padding-bottom: 20rpx;
		}
	}
</style>
