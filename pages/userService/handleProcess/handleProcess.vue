<template>
	<view class="page-handleProcess">
		<view class="header">
			<nav-header></nav-header>
		</view>
		<view class="affair-list">
			<view class="cu-list menu sm-border card-menu margin-top-sm">
				<view class="cu-item arrow" v-for="(affair, index) in affairList" :key="index" @tap="goAffairDetail(index)">
					<view class="content">
						<text class="cuIcon-circlefill text-grey"></text>
						<text class="text-grey">{{ affair.affairname }}</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import hpTestdata from './hpTestdata.js'
	import navHeader from '../../../components/nav-header.vue'
	
	export default {
		data() {
			return {
				affairList:[] //事务名列表
			};
		},
		components:{
			navHeader
		},
		onLoad() {
			this.affairList = hpTestdata.affairList
		},
		methods:{
			//跳转到事务办理详情页面
			goAffairDetail(index){
				uni.navigateTo({
					url:'./affairDetail/affairDetail'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-handleProcess{
		background-color: #F0F0F0;
		height: 100%;
	}
	.header{
	}
</style>
