<!-- 登录页 -->
<template>
	<view class="login-container">
		<view class="header">
			<image :src="logoImgUrl" mode="aspectFit"></image>
			<view class="header-title">
				学生教育发展指数及评价云服务平台
			</view>
		</view>
		
		<view class="main">
			<button class="cu-btn bg-blue shadow-blur" @click="showIdLogin">学号登录</button>
			<button class="cu-btn bg-green shadow-blur">微信登录</button>
		</view>
		
		<view class="cu-modal" :class="modalName=='loginModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">学号登录</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="FormLogin padding-xl">
					<form>
						<view class="cu-form-group">
							<view class="title">学号</view>
							<input type="number" placeholder="请输入学号" v-model="formData[0].rules.value" />
						</view>
						<view class="cu-form-group Captcha">
							<view class="title">密码</view>
							<input type="password" placeholder="请输入密码"  v-model="formData[1].rules.value" />
						</view>
						<view class="cu-form-group Captcha">
							<view class="title">验证码</view>
							<input type="number" placeholder="请输入验证码"  v-model="formData[2].rules.value" />
							<image src="../../static/imgs/考试安排icon_96.png" mode="aspectFit"></image>
						</view>
					</form>
				</view>
				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="BtnLogin cu-btn bg-blue" @tap="doLogin">立即登录</button>
					</view>
				</view>
				<view class="bg-white justify-center padding-top padding-bottom">
					<view class="action">
						<text class="cuIcon-question text-gray" @tap="hideModal">忘记密码</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgImgUrl:'http://localhost:8083/img/Login.png',
				logoImgUrl: this.$baseURL + 'img/xlogo.png',
				
				modalName: null,
				
				formData:[
					{
						placeholder:"请输入学号",
						label:"学号",
						type:"number",
						rules:{
							name:"id",
							value: "",
							verify: "req|number"
						}
					},{
						placeholder:"6-20个字符",
						label:"密码",
						type:"password",
						rules:{
							name:"pwd",
							value:"",
							verify:"req|pwd6to20",
							errMess:"密码格式不正确"
						}
					},{
						placeholder:"输入验证码",
						label:"验证码",
						type:"number",
						rules:{
							name:"captcha",
							value:"",
							verify:"req|num4",
							errMess:"验证码不正确"
						}
					},
				]
			};
		},
		methods:{
			//学号登录
			showIdLogin(){//展示登录模态框
				this.modalName = 'loginModal'
			},
			hideModal() {//隐藏登录框
				this.modalName = null
			},
			doLogin(){
				var otherPra={
					reqEmptyVal:true
				}
				//验证表单
				if(this.$vervify({formDate: this.formData, otherPra:otherPra})){
					uni.showToast({
					    title: "验证通过",
					    duration: 2000,
						icon:"none"
					});
					// 表单序列化
					let submitData="序列化数组："+JSON.stringify(this.$submitForm(this.formData))
					console.log(submitData)
					try{
						uni.setStorageSync('token','login')
						uni.switchTab({
							url:'../index/index'
						})
					}catch(e){
						//TODO handle the exception
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.header{
		height: 500rpx;
		
		image{
			margin-top: 50rpx;
			margin-left: 250rpx;
			width: 250rpx;
			height: 250rpx;
		}
		
		.header-title{
			margin-top: 30rpx;
			margin-left: 135rpx;
			font-size: 30rpx;
			font-weight: 550;
		}
	}
	
	.main{
		display: flex;
		flex-direction: column;
		
		button{
			margin-left: 187.5rpx;
			width: 375rpx;
			margin-bottom: 50rpx;
			font-size: 33rpx;
		}
	}
	
	.cu-form-group {
		border-radius: 5rpx;
		
		.title {
			min-width: calc(4em + 15px);
		}
		
		image{
			height: 50rpx;
			width: 150rpx;
			border: 1px solid black;
		}
	}
	
	.cu-form-group:hover{
		box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
		background-color: #e1e1e1;
	}
	
	.FormLogin{
		
		.Captcha{
			margin-top: 20rpx;
		}
	}
	
	.BtnLogin{
		width: 400rpx;
		font-size: 35rpx;
	}
</style>
