<!-- 忘记密码 -->
<template>
	<view>
		<nav-header title="找回/修改密码"></nav-header>
		<swiper :style="{height: scorllHeight + 'rpx'}" :current="swiper">
			<swiper-item catchtouchmove="catchTouchMove">
				<view class="swiper-item">
					<scroll-view scroll-y="true" :style="{height: scorllHeight + 'rpx'}">
						<view>
							<title-icon title="①身份验证" subtitle="Authentication" bgSize="235"></title-icon>
							<view class="padding-xl">
								<form>
									<view class="cu-form-group" v-for="(item,index) in formID" :key="index">
										<view class="title">{{item.label}}</view>
										<input class="text-center" :type="item.type" :placeholder="item.placeholder" v-model="item.rules.value" />
									</view>
								</form>
							</view>
							<view class="btns">
								<button class="cu-btn bg-blue" @click="checkIDNext">下一步</button>
								<button class="cu-btn" @click="navBack">返回登录</button>
							</view>
						</view>
					</scroll-view>
				</view>
			</swiper-item>
			<swiper-item catchtouchmove="catchTouchMove">
				<view class="swiper-item">
					<scroll-view scroll-y="true" :style="{height: scorllHeight + 'rpx'}">
						<view>
							<title-icon title="身份验证" subtitle="Authentication"></title-icon>
							<view class="btns">
								<button class="cu-btn bg-blue" @click="changeSwiper(1)">下一步</button>
								<button class="cu-btn bg-blue" @click="navBack">返回登录</button>
							</view>
						</view>
					</scroll-view>
				</view>
			</swiper-item>
			<swiper-item catchtouchmove="catchTouchMove">
				<view class="swiper-item">
					<scroll-view scroll-y="true" :style="{height: scorllHeight + 'rpx'}">
						<view>
							<title-icon title="身份验证" subtitle="Authentication"></title-icon>
							<view class="btns">
								<button class="cu-btn bg-blue" @click="changeSwiper(1)">下一步</button>
								<button class="cu-btn bg-blue" @click="navBack">返回登录</button>
							</view>
						</view>
					</scroll-view>
				</view>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	import loginapi from '@/common/loginApis/loginapi.js'
	export default {
		data() {
			return {
				swiper: 0,//步骤页0/1/2
				stuRoleNo: 9, 
			
				formID:[//步骤1学号和身份证号表单
					{ 
					placeholder: "请输入学号",
					label:"学号",
					type:"number",
					rules:{
						name:"user",
						value: "",
						verify: "req|number"
					}
				},{
					placeholder: "请输入身份证号",
					label:"身份证号",
					type:"number",
					rules:{
						name:"idcard",
						value: "",
						verify: "req|idcard"
					},
				}],
			};
		},
		computed:{
			scorllHeight(){
				let ratio = 2
				ratio = this.$deviceHeight() / this.$deviceWidth()
				let height = 750 * ratio - 100
				console.log(ratio, height)
				return height
			}
		},
		onLoad() {
			this.getSysRole()
		},
		methods:{
			//禁止触摸滑动
			catchTouchMove: function(res) {
				return false
			},
			async checkIDNext(){//表单
				let check = this.Verify(this.formID)
				if(!check) return
				try{
					let resdata = await loginapi.isUserRole(this.formID[0].rules.value, this.formID[1].rules.value)
					console.log(resdata)
				}catch(e){
					//TODO handle the exception
				}
				this.changeSwiper(1)
			},
			changeSwiper(e){//步骤 e:1-下一步,-1-上一步
				if(this.swiper < 0 || this.swiper > 2) return
				this.swiper += e
			},
			navBack(){//返回之前页面
				uni.navigateBack({
					delta:1
				})
			},
			async getSysRole(){//获取系统角色
				try{
					let res = await loginapi.getSysRole()
					console.log(res)
				}catch(e){
					//TODO handle the exception
					console.log(e)
				}
			},
			// 验证表单,验证成功返回序列化表单，验证失败返回false
			Verify(formData){
				var otherPra = { reqEmptyVal: true }
				if(this.$vervify({formDate: formData, otherPra:otherPra})){
					let submitData = JSON.stringify(this.$submitForm(formData))
					return submitData
				}else{
					return false
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.cu-form-group {
		margin-top: 20rpx;
		border-radius: 5rpx;
		box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.1);
		
		.title {
			text-align: center;
			// font-size: 38rpx;
			min-width: calc(4em + 15px);
		}
	}
	.cu-form-group:hover{
		background-color: #e1e1e1;
	}
	.btns{
		display: flex;
		flex-direction: column;
		button{
			margin-bottom: 30rpx;
			width: 650rpx;
			margin-left: 50rpx;
		}
	}
</style>
