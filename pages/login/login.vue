<!-- 登录页 -->
<template>
	<view class="login-container">
		<view class="header">
			<image :src="logoImgUrl" mode="aspectFit"></image>
			<view class="header-title">
				学生教育发展指数及评价云服务小程序
			</view>
		</view>
		
		<view class="main">
			<view class="info-nav">
				<scroll-view scroll-x class="bg-white nav">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="0==TabCur?'text-blue cur':''"  @tap="tabSelect"
						 :data-id="0">
							学生登录
						</view>
						<view class="cu-item flex-sub" :class="1==TabCur?'text-blue cur':''"  @tap="tabSelect"
						 :data-id="1">
							管理登录
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="FormLogin padding-xl">
				<form>
					<view class="cu-form-group">
						<view class="title cuIcon-people"></view>
						<input type="number" :placeholder="TabCur==0?'学号':'职工号'" v-model="formData[0].rules.value" />
					</view>
					<view class="cu-form-group Captcha">
						<view class="title cuIcon-unlock"></view>
						<input type="password" placeholder="密码(默认身份证后六位)"  v-model="formData[1].rules.value" />
					</view>
					<view class="cu-form-group Captcha">
						<view class="title cuIcon-same"></view>
						<input type="text" placeholder="验证码"  v-model="formData[2].rules.value" />
						<image :src="verifyImg?'data:image/png;base64,'+verifyImg:'../../static/imgs/valicodefail.png'" mode="aspectFit" @tap="loadValiCode"></image>
					</view>
				</form>
			</view>
			<view class="cu-bar bg-white text-center">
				<button class="BtnLogin cu-btn bg-blue" @tap="doLogin">登录</button>
			</view>
			<view class="bg-white text-center padding-top padding-bottom">
				<text class="cuIcon-question text-gray">忘记密码</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import loginapi from '../../common/loginApis/loginapi.js'
	export default {
		data() {
			return {
				logoImgUrl: this.$baseURL + '/img/xlogo.png',
				
				TabCur: 0, //导航标识 0-学生登录 1-管理员登录
				
				verifyImg: null,//验证码图片
				
				formData:[//验证表单
					{
						placeholder:"请输入学号",
						label:"学号",
						type:"number",
						rules:{
							name:"user",
							value: "20181303002",
							verify: "req|number"
						}
					},{
						placeholder:"6-20个字符",
						label:"密码",
						type:"password",
						rules:{
							name:"pwd",
							value:"123456",
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
							verify:"req|enNum4",
							errMess:"验证码不正确"
						}
					},
				]
			};
		},
		onLoad() {
			this.loadValiCode()
		},
		computed:{
			loginType:function(){//是学生登录或管理登录
				if(this.TabCur == 0){
					return 'S'
				}else if(this.TabCur == 1){
					return 'M'
				}
			}
		},
		methods:{
			//切换导航栏
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				if(this.TabCur == 1){
					this.formData[0].rules.value = '20030083'
				}
				this.loadValiCode()
			},
			async Verify(){//验证表单,成功返回序列化数据，失败返回false
				var otherPra={
					reqEmptyVal:true
				}
				//验证表单
				if(this.$vervify({formDate: this.formData, otherPra:otherPra})){
					//验证码
					let imgflag = await loginapi.getVerCodeFlag(this.formData[2].rules.value)
					if(!imgflag) {
						this.ToastFail('验证码错误')
						this.loadValiCode()
						return false
					}
					// 表单序列化
					let submitData=JSON.stringify(this.$submitForm(this.formData)) //序列化数组
					// console.log(submitData)
					return submitData
				}else{
					return false
				}
			},
			async doLogin(){//执行登录
				let submitData = await this.Verify()
				if(!submitData) return //验证失败
				await loginapi.doLogin(submitData, this.loginType).then(res =>{
					console.log(res)
					if(res == 'login:ok'){
						uni.showToast({
							title:'登录成功'
						})
						uni.switchTab({//登录成功
							url:'../index/index'
						})	
					}
				}).catch(err=>{
					console.log(err)
					this.ToastFail(err)
				})
			},
			//加载验证码图片
			async loadValiCode(){
				await loginapi.loadValiCode().then(res=>{
					this.verifyImg = wx.arrayBufferToBase64(res)
				}).catch(err=>{
					this.verifyImg = null
					this.ToastFail('获取验证码失败，请重试')
					console.log(err)
				})
			},
			//显示提示信息
			ToastFail(text){
				uni.showToast({
					icon:'none',
					title: text
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.header{
		height: 400rpx;
		text-align: center;
		
		image{
			margin-top: 50rpx;
			width: 250rpx;
			height: 250rpx;
		}
		
		.header-title{
			margin-top: 30rpx;
			font-size: 30rpx;
			font-weight: 550;
		}
	}
	.NavLogin{
		
		view{
			text-align: center;
			width: 50%;
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
		box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.1);
		
		.title {
			text-align: center;
			font-size: 38rpx;
			min-width: calc(4em + 15px);
		}
		
		image{
			height: 60rpx;
			width: 150rpx;
		}
	}
	
	.cu-form-group:hover{
		background-color: #e1e1e1;
	}
	
	.FormLogin{
		margin-top: 20rpx;
		
		.Captcha{
			margin-top: 20rpx;
		}
	}
	
	.BtnLogin{
		width: 400rpx;
		font-size: 35rpx;
	}
</style>
