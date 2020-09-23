<!-- 常见事务指南页面 -->
<template>
	<view class="page-handleProcess">
		<view class="header">
			<nav-header title="常见事务指南"></nav-header>
		</view>
		<view class="Search">
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input v-model="match" :adjust-position="false" type="text" placeholder="输入指南名称或关键字" confirm-type="search"></input>
					<text class="cuIcon-roundclose" v-show="match.length > 0" @tap="doCancel()"></text>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow-blur round" @tap="showList('search')">搜索</button>
				</view>
			</view>
		</view>
		<view class="affair-list">
			<view class="cu-list menu sm-border margin-top-sm">
				<view class="Affair cu-item" v-for="(affair, index) in affairList" :key="index" @tap="goAffairDetail(affair.AddNo)">
					<view class="content">
						<text class="cuIcon-favorfill" :class="[IconColor(index+1)]"></text>
						<text class="text-bold">{{ affair.GName }}</text>
					</view>
					<view class="action">
						<view class="cuIcon-footprint" :class="[IconColor(index+1)]">{{" " + affair.seeCnt }}</view>
						<view class="cu-tag round ">{{affair.InputTime }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="Pagination" v-show="affairList">
			<uni-pagination :show-icon="true" :total="total" @change="pageChange"/>
		</view>
	</view>
</template>

<script>
	import hdprcapi from '@/common/userServiceApis/hdPrcapi.js'
	// import navHeader from '@/components/nav-header.vue'
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	export default {
		data() {
			return {
				affairList:null,//事务名列表
				InputBottom: 0,
				match: '',//搜索关键词
				currentPage: 1,//当前页码
				currentSearchType: 'showList',//当前的换页搜索模式 showList:全局列表换页 search:搜索结果列表换页
			};
		},
		components:{
			// navHeader,
			uniPagination
		},
		computed:{
			IconColor(){//图标颜色
				return function(index){
					if(index == 1 || index == 2 ){
						return 'text-red'
					}else if(index == 3 || index == 4){
						return 'text-yellow'
					}else{
						return 'text-gray'
					}
				}
			},
			total(){//总数
				let total = null
				try{
					total = this.affairList[0].total
				}catch(e){
					console.log(e)
				}
				if(!total) return 0
				return total
			}
		},
		onLoad() {
		},
		onShow() {
			this.showList('showList')
		},
		methods:{
			//跳转到事务办理详情页面
			async goAffairDetail(AddNo){
				let addres = await hdprcapi.addSeeCnt(AddNo)
				console.log(addres)
				uni.navigateTo({
					url:'./affairDetail/affairDetail?AddNo='+AddNo
				})
			},
			//获取事务列表
			async showList(flagAddr){
				this.$showLoading('加载中...')
				try{
					if(flagAddr === 'showList'){
						let listData = await hdprcapi.ulFenSearch('showList', this.currentPage , '')
						this.currentSearchType = 'showList' //当前换页的搜索模式改为showList
						this.affairList = listData.rows
					}else if( flagAddr === 'search'){
						let listData = await hdprcapi.ulFenSearch('search', this.currentPage , this.match)
						this.currentSearchType = 'search'
						this.affairList = listData.rows
					}
					
				}catch(e){
					//TODO handle the exception
					console.log(e)
					this.$ToastFail('列表加载失败')
				}
				uni.hideLoading()
			},
			pageChange(e){
				console.log(e.current)
				this.currentPage = e.current
				this.showList(this.currentSearchType)
			},
			doCancel(){//取消搜索
				this.match = ''
				this.showList('showList')
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-handleProcess{
		height: 100%;
	}
	.header{
	}
	.Affair{
		.action{
			width: 300rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
	}
	.Pagination{
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: center;
		padding: 30rpx;
		font-size: 14rpx;
		background-color: #ffffff;
	}
</style>
