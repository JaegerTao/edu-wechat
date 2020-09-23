<!-- 社团具体介绍页面 -->
<template>
	<view>
		<!-- <nav-header title="社团协会详情"></nav-header> -->
		<view class="main" :style="{backgroundImage: 'url('+bgImgUrl+')'}">
			<view class="header">
				<title-icon title=" < 返回列表" subtitle="Back to List" bgSize="180" @tap="Back()"></title-icon>
				<view class="btn-myprocess text-bold">
					<text class="cuIcon-friendadd text-xxl"></text>
					<text class="text-sm text-black" @click="toJoin()" decode="true">立即加入 -&gt; </text>
				</view>
			</view>
			<view class="associa-content">
				<view class="ass-name text-bold text-center text-xl">
					{{ assName?assName:"加载中" }}
				</view>
				<view class="ass-intro">
					<rich-text :nodes="assIntroduceTrans" space :selectable='true'>
					</rich-text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import Associationapi from '@/common/userServiceApis/Associationapi.js'
	import parseHtml from '@/common/html-parser.js'
	export default{
		data(){
			return{
				bgImgUrl: this.$baseURL + '/StuInfoService/funcAssociation/img/joinbac.jpg',
				minHeight: this.$deviceHeight()-50,
				assIntroduce: null,//介绍内容
				assName: null, //社团名
			}
		},
		computed:{
			assIntroduceTrans(){//将html富文本中的img节点的大小调整为手机屏幕可见
				let deviceWidth = this.$deviceWidth() - 50
				if(!this.assIntroduce) return "加载中..."
				let nodes = this.assIntroduce
				for(let node of nodes){
					if(node.children){
						let children = node.children
						for(let kid of children){
							if(kid.name == 'img'){
								kid.attrs.style = "width:"+ deviceWidth +"px;" + "margin-top:20px;" 
							}
						}
					}
				}
				return nodes
			}
		},
		props:{
			aid:{//社团id
				type: String,
				default: ''
			}
		},
		mounted() {
			console.log(this.aid)
			this.loadAssociaInfo()
		},
		methods:{
			Back(){//返回列表页面
				this.$emit('back', 'showMain')
			},
			toJoin(){
				console.log('info to join') 
				this.$emit('tojoin','tojoin')
			},
			//加载社团信息
			async loadAssociaInfo(){
				this.$showLoading("加载中...")
				try{
					let resinfo = await Associationapi.AssociaInfo(this.aid)
					if(resinfo){
						this.assName = resinfo.AssociationName
						this.assIntroduce = parseHtml(decodeURIComponent(resinfo['Introduction']))
					}
					// console.log(this.assIntroduce)
				}catch(e){
					//TODO handle the exception
					console.log(e)
				}
				uni.hideLoading()
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
			width: 300rpx;
		}
		.btn-myprocess{
			margin-right: 50rpx;
		}
	}
	.associa-content{
		margin-top: 30rpx;
		.ass-name{
			
		}
		.ass-intro{
			margin-top: 50rpx;
			width: 680rpx;
			margin-left: 35rpx;
		}
	}
</style>
