<!-- 社团列表 -->
<template>
	<view>
		<!-- 列表界面 -->
		<view class="Main" v-if="showMain">
			<view class="fixed-top">
				<nav-header title="社团协会列表"></nav-header>
				<view class="header">
					<title-icon title="协会列表" subtitle='Association List'></title-icon>
					<view class="btn-myprocess text-bold" @click="doShowMyProcess()">
						<text class="cuIcon-myfill text-xxl text-orange"></text>
						<text class="text-sm text-black">我的招新进度</text>
					</view>
				</view>
				<view class="Search">
					<view class="cu-bar search bg-white">
						<view class="search-form round">
							<text class="cuIcon-search"></text>
							<input v-model="matchTxt" :adjust-position="false" type="text" placeholder="输入协会名称或关键字" confirm-type="search" @confirm="doSearch()"></input>
							<text class="cuIcon-roundclose" v-show="matchTxt.length > 0" @tap="doCancel()"></text>
						</view>
						<view class="action">
							<button class="cu-btn bg-green shadow-blur round" @tap="doSearch()">搜索</button>
						</view>
					</view>
				</view>
			</view>
			<scroll-view scroll-y class="list" :style="{height: listHeight + 'rpx'}">
				<view class="grid col-2" v-if="associaList">
					<view v-for="(item, index) in associaList" :key="index" @click="doShowInfo(item['AssociationID'], item['AssociationName'])">
						<associa-card :title="item['AssociationName']" :url="item.ImgBase?'data:image/png;base64,'+item.ImgBase: testImg" :ifapply="item.ifapply"></associa-card>
					</view>
				</view>
				<view v-else class="text-center margin-top">
					暂无内容
				</view>
			</scroll-view>
		</view>
		<!-- 社团具体信息和加入社团 -->
		<view class="AssociaInfo" v-if="showInfo">
			<swiper :style="{height: windowHeight + 'px'}" :current="curitem" @change="change">
				<swiper-item item-id="info">
					<view class="swiper-item">
						<scroll-view scroll-y="true" :style="{height: windowHeight + 'px'}">
							<view>
								<associa-info @back="doBack()" @tojoin="doInfotoJoin()" :aid="currentInfoID"></associa-info>
							</view>
						</scroll-view>
					</view>
				</swiper-item>
				<swiper-item item-id="join">
					<view class="swiper-item">
						<scroll-view scroll-y="true" :style="{height: windowHeight + 'px'}">
							<view>
								<associa-join @back="doBack()" @toinfo="doJointoInfo()" :aid="currentInfoID" :aname="currentInfoName"></associa-join>
							</view>
						</scroll-view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 我的招新进程 -->
		<view class="AssociaMyProcess" v-if="showMyProcess">
			<associa-myprocess @back="doBack()"></associa-myprocess>
		</view>
		
	</view>
</template>

<script>
	import Associationapi from '../../../common/userServiceApis/Associationapi.js'
	import associaCard from './Association-component/associa-card.vue'
	import associaInfo from './Association-component/associa-info.vue'
	import associaJoin from './Association-component/associa-join.vue'
	import associaMyprocess from './Association-component/associa-myprocess.vue'
 	export default{
		data(){
			return{
				testImg: this.$baseURL + "/StuInfoService/funcAssociation/img/xlogo.png",
				associaList: null,//社团列表
				matchTxt:'',//搜索关键词
				
				showMain: true,//切换社团主页
				showInfo: false, //是否切换到具体信息页面 
				showJoin: false, //切换到加入页面
				showMyProcess: false, //切换到我的招新进度页面
				currentInfoID: null, //当前查看详情的社团ID
				currentInfoName: null,//当前查看详情的社团名
				
				windowHeight: this.$deviceHeight(),
				curitem: 0, //0 or 1
			}
		},
		computed:{
			listHeight(){//list列表scroll的高度
				let ratio = 2
				ratio = this.$deviceHeight() / this.$deviceWidth()
				let height = 750 * ratio - 300
				console.log(ratio, height)
				return height
			}
		},
		components:{
			associaCard,
			associaInfo,
			associaJoin,
			associaMyprocess
		},
		onLoad() {
			this.loadAsscia('')
		},
		onPullDownRefresh() {
			this.loadAsscia(this.matchTxt)
		},
		methods:{
			//加载服务,match--搜索关键词
			async loadAsscia(match){
				this.$showLoading("加载中...")
				try{
					let resdata = await Associationapi.SearchAssociaI(match)
					if(resdata){
						this.associaList = resdata.rows
					}
				}catch(e){
					//TODO handle the exception
					console.log(e)
					this.$ToastFail('列表加载失败，下拉刷新')
				}
				uni.hideLoading()
			},
			//执行搜索
			doSearch(){
				this.loadAsscia(this.matchTxt)
			},
			//取消搜索
			doCancel(){
				this.matchTxt = ''
				this.loadAsscia('')
			},
			//页面切换
			doShowInfo(AssociationID, AssociationName){//列表页进入详情页，传入社团ID
				console.log(AssociationID)
				this.currentInfoID = AssociationID
				this.currentInfoName = AssociationName
				this.showMain = false
				this.showInfo = true
			},
			doInfotoJoin(){//详情页打开加入页
				this.curitem = 1
			},
			doJointoInfo(){//加入页返回详情页
				this.curitem = 0
			},
			change(e){//滑动swiper触发
				// console.log(e)
				this.curitem = e.detail.current
			},
			doBack(msg){//详情页和进度页返回列表页
				console.log(msg)
				this.showInfo = false
				this.showMyProcess = false
				this.showMain = true
				this.currentInfoID = null
			},
			doShowMyProcess(){//我的招新进度页面
				this.showMain = false
				this.showMyProcess = true
			}
		}
	}
</script>

<style lang="less" scoped>
	.fixed-top{
		height: 300rpx;
	}
	.header{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		title-icon{
			width: 300rpx;
		}
		.btn-myprocess{
			margin-right: 50rpx;
		}
	}
	.list{
		box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
		padding: 5rpx;
		margin-bottom: 10rpx;
	}
</style>
