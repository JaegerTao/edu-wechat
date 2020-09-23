<!-- 我的招新进度 -->
<template>
	<view class="main" :style="{backgroundImage: 'url('+bgImgUrl+')'}">
		<view class="header">
			<title-icon title=" < 返回列表" subtitle="Back to List" bgSize="180" @tap="Back()"></title-icon>
		</view>
		<view class="margin-top">
			<!-- <title-icon title="协会申请进度" subtitle="Application Progress" bgSize="220"></title-icon> -->
			<!-- 基本信息 -->
			<view class="info">
				<view class="info-assname">
					<view class="info-icon text-center">
						<text class="text-bold">基本信息</text>
					</view>
					<view class="info-assname-content">
						<view class="cu-bar search text-bold">
							<view class="cu-btn radius">姓名</view>
							<view class="search-form text-center">
								<input :adjust-position="false" type="text" :value="YUserName" confirm-type="search" disabled="true"></input>
							</view>
						</view>
						<view class="cu-bar search text-bold">
							<view class="cu-btn radius">学号</view>
							<view class="search-form text-center">
								<input :adjust-position="false" type="text" :value="YLoginId" confirm-type="search" disabled="true"></input>
							</view>
						</view>
						<view class="cu-bar search text-bold">
							<view class="cu-btn radius ">电话</view>
							<view class="search-form text-center">
								<input :adjust-position="false" type="text" :value="phoneNum" confirm-type="search" disabled="true"></input>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 已提交申请协会 -->
			<view class="asslist margin-top-sm">
				<view class="text-center">
					<text class="text-bold">已提交申请协会</text>
				</view>
				<view v-if="myProcessList">
					<view v-for="(item,index) in myProcessList" :key="index">
						<associa-card-subed @showupdate="showUpdate" :aid="item['AssociationID']" :assname="item['AssociationName']" :checktime="item['checkTime']" :ischeck="item['isCheck']" :ispass="item['ispass']"></associa-card-subed>
					</view>	
				</view>
				<!-- 弹出框 -->
				<view class="cu-modal" :class="modalName=='update'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">修改申请表</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
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
									<view class="search-form text-center bg-white">
										<input :adjust-position="false" type="text" v-model="formData[0].rules.value" placeholder="联系电话号码" confirm-type="search"></input>
									</view>
								</view>
								<view class="self-intro margin-top-sm">
									<view class="text-center">
										<view class="cu-btn radius text-bold">自我介绍<text class="text-red">*</text></view>
									</view>
									<view class="cu-form-group margin-top">
										<textarea maxlength="500" auto-height="true" v-model="textareaInput" placeholder="在此输入自我介绍"></textarea>
									</view>
								</view>
								<view class="btn-submit margin-top text-center">
									<button class="cu-btn radius bg-blue" @click="editJoinXh">提交</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Associationapi from '@/common/userServiceApis/Associationapi.js'
	import {mapState} from 'vuex'
	import associaCardSubed from './associa-card-subed.vue'
	export default {
		data() {
			return {
				bgImgUrl: this.$baseURL + '/StuInfoService/funcAssociation/img/joinbac.jpg',
				// sname: '',
				// sNo: '',
				phoneNum: '',
				testImg: this.$baseURL + "/StuInfoService/funcAssociation/img/xlogo.png",
				myProcessList: null,
				modalName: '',//update-打开模态框
				textareaInput: '',//自我介绍文本框内容
				curaid: '',//当前选中的社团id
				// curphone: '',//当前选中的电话号码
				formData:[{//验证表单
						placeholder:"请输入电话号码",
						label:"电话号码",
						type:"number",
						rules:{
							name:"phone",
							value: "",//当前选中的电话号码
							verify: "req|phone"
						}
					}],
			}
		},
		computed:{
			...mapState(['YUserName','YLoginId']),
		},
		components:{
			associaCardSubed
		},
		mounted(){
			this.checkStuNo()
			this.SearchMyJoinAss()
		},
		methods: {
			Back() { //返回列表页面
				this.$emit('back', 'showMain')
			},
			async checkStuNo(){//获取电话号码
				try{
					let phonedata = await Associationapi.CheckStuNo(this.YLoginId)
					this.phoneNum = JSON.parse(phonedata)[0]['Phone']
				}catch(e){
					//TODO handle the exception
					console.log(e)
				}
			},
			async SearchMyJoinAss(){
				try{
					let myAsses = await Associationapi.SearchMyJoinAss(this.YLoginId)
					this.myProcessList = myAsses.rows
				}catch(e){
					//TODO handle the exception
					console.log(e)
				}
			},
			async SearchMyThisJoin(){
				try{
					let mythisjoin = await Associationapi.SearchMyThisJoin(this.YLoginId, this.curaid)
					console.log(mythisjoin)
					if(!mythisjoin.rows || mythisjoin.rows.length !== 1) return
					let mtjitem = mythisjoin.rows[0]
					this.textareaInput = mtjitem.Introduction
					this.formData[0].rules.value = mtjitem.Phone
				}catch(e){
					//TODO handle the exception
					console.log(e)
				}
			},
			async editJoinXh(){
				if(!this.textareaInput.trim()){
					this.$ToastFail('请填写自我介绍')
					return
				}
				var otherPra={
					reqEmptyVal:true
				}
				if(this.$vervify({formDate: this.formData, otherPra:otherPra})){
					try{
						let res = await Associationapi.editJoinXh(this.curaid, this.textareaInput, this.formData[0].rules.value)
						console.log(res)
						if(res.msg == "成功"){
							this.$ToastSuccess("修改成功")
							this.hideModal()
							this.checkStuNo()
							this.SearchMyJoinAss()
						}
					}catch(e){
						//TODO handle the exception
						console.log(e)
						this.$ToastFail("修改失败，请稍后重试")
					}
				}
			},
			showUpdate(e){//显示弹出框
				this.modalName = 'update'
				// console.log(e)
				this.curaid = e
				this.SearchMyThisJoin()
			},
			hideModal(){//关闭弹出框
				this.modalName = ''
				// this.curaid = ''
				// this.curphone = ''
				// this.textareaInput = ''
			}
		}
	}
</script>

<style lang="less" scoped>
	.main {
		background-repeat: no-repeat;
		background-size: 750rpx;
		min-height: 1000rpx;
	}
	.info{
		margin-top: 50rpx;
		.cu-bar{
			width: 650rpx;
			margin-left: 50rpx;
			view{
				background-color: rgba(0,0,0,0.1);
			}
		}
	}
</style>
