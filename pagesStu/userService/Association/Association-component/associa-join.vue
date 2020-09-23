<!-- 加入社团页面 -->
<template>
	<view class="main" :style="{backgroundImage: 'url('+bgImgUrl+')'}">
		<view class="header">
			<view class="btn-myprocess text-bold">
				<text class="cuIcon-back_android text-xxl"></text>
				<text class="text-sm text-black" @click="toInfo()" decode='true'>返回详情</text>
			</view>
			<title-icon title="返回列表" subtitle="Back to List" bgSize="180" @tap="Back()"></title-icon>
		</view>
		<!-- 填写信息 -->
		<view class="info">
			<view class="info-assname">
				<view class="info-icon">
					<title-icon title = "协会申请" subtitle="Application"></title-icon>
				</view>
				<view class="info-assname-content">
					<view class="cu-bar search">
						<view class="cu-btn radius text-blue">协会</view>
						<view class="search-form text-center">
							<input :adjust-position="false" type="text" :value="aname" confirm-type="search" disabled="true"></input>
						</view>
					</view>
				</view>
			</view>
			<view class="info-fill margin-top">
				<view class="info-icon">
					<title-icon title = "信息填写" subtitle="Fill in Info"></title-icon>
				</view>
				<view class="info-fill-content">
					<view class="cu-bar search">
						<view class="cu-btn radius text-blue">学号<text class="text-red">*</text></view>
						<view class="search-form text-center">
							<input :adjust-position="false" type="text" :value="YLoginId" placeholder="填写学号" confirm-type="search" disabled="true"></input>
						</view>
					</view>
					<view class="cu-bar search">
						<view class="cu-btn radius text-blue">姓名<text class="text-red">*</text></view>
						<view class="search-form text-center">
							<input :adjust-position="false" type="text" :value="YUserName" confirm-type="search" disabled="true"></input>
						</view>
					</view>
					<view class="cu-bar search">
						<view class="cu-btn radius text-bold">电话<text class="text-red">*</text></view>
						<view class="search-form text-center">
							<input :adjust-position="false" type="text" v-model="formData[0].rules.value" placeholder="联系电话号码" confirm-type="search"></input>
						</view>
					</view>
					<view class="self-intro margin-top-sm">
						<view class="text-center">
							<view class="cu-btn radius text-bold">自我介绍<text class="text-red">*</text></view>
						</view>
						<view class="cu-form-group">
							<textarea maxlength="500" auto-height="true" @input="textareaInput" placeholder="在此输入自我介绍"></textarea>
						</view>
					</view>
					<view class="btn-submit margin-top text-center">
						<button class="cu-btn radius bg-blue" @click="JoinXh">提交</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Associationapi from '@/common/userServiceApis/Associationapi.js'
	import {mapState} from 'vuex'
	export default{
		data(){
			return{
				bgImgUrl: this.$baseURL + '/StuInfoService/funcAssociation/img/joinbac.jpg',//背景图片
				// stuNo: '',//学号
				// stuName: '',//学生姓名
				phoneNum: '',//电话号码
				formData:[//验证表单
					{
						placeholder:"请输入电话号码",
						label:"电话号码",
						type:"number",
						rules:{
							name:"phone",
							value: "",
							verify: "req|phone"
						}
					}],
				selfIntro: '',//自我介绍
			}
		},
		computed:{
			...mapState(['hasLogin','YUserName','YLoginId'])
		},
		props:{
			aid:{//社团id
				type: String,
				default: ''
			},
			aname: { //社团名
				type: String,
				default: ''
			}
		},
		mounted(){
			this.checkStuNo()
		},
		methods:{
			Back(){//返回列表页面
				this.$emit('back', 'showMain')
			},
			toInfo(){//切换到详情页
				console.log('join to info')
				this.$emit('toinfo','toinfo')
			},
			textareaInput(e){//输入框内容设置
				this.selfIntro = e.detail.value
			},
			async checkStuNo(){//获取电话号码
				try{
					let phonedata = await Associationapi.CheckStuNo(this.YLoginId)
					// this.phoneNum = JSON.parse(phonedata)[0]['Phone']
					this.formData[0].rules.value = JSON.parse(phonedata)[0]['Phone']
				}catch(e){
					//TODO handle the exception
					console.log(e)
				}
			},
			async JoinXh(){//加入社团
				if(!this.selfIntro.trim()){
					this.$ToastFail('请填写自我介绍')
					return
				}
				var otherPra={
					reqEmptyVal:true
				}
				if(this.$vervify({formDate: this.formData, otherPra:otherPra})){
					try{
						let resdata = await Associationapi.JohnXh(this.aid, this.selfIntro, this.formData[0].rules.value)
						if(resdata.errcode == 200){
							this.$ToastSuccess('申请成功')
							this.toInfo()
						}else if(resdata.errcode == 202){
							this.$ToastFail(resdata.msg)
						}
					}catch(e){
						console.log(e)
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.main{
		background-repeat: no-repeat;
		background-size: 750rpx;
		min-height: 1000rpx;
	}
	.header{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		title-icon{
			width: 180rpx;
		}
		.btn-myprocess{
			margin-left: 10rpx;
		}
	}
	.info{
		margin-top: 120rpx;
		.cu-bar{
			width: 650rpx;
			margin-left: 50rpx;
		}
		.self-intro{
			.cu-form-group{
				border: 1px solid rgba(0,0,0,0.1);
				width: 650rpx;
				margin-left: 50rpx;
				margin-top: 12rpx;
				
				textarea{
					height: ;
				}
			}
		}
	}
</style>
