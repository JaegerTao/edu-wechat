<template>
	<view class="page-affairDetail">
		<view class="header bg-img" :style="[{backgroundImage: 'url('+headerImgUrl+')'}]">
			<view class="header-icon" :style="[{backgroundImage: 'url('+stuScoreImgUrl+')'}]">
				<view class="text-bold">服务指南</view>
				<view class="header-icon-sub">SERVICE GUIDE</view>
			</view>
			<view class="header-title">
				<view>{{title}}</view>
			</view>
			<view class="header-detail">
				<text>发布时间:{{date}}</text>
				<text>浏览:{{seeCnt}}</text>
				<text>点赞:{{likeCnt}}</text>
			</view>
		</view>
		<view class="main">
			<rich-text :nodes="sContent" space :selectable='true'></rich-text>
		</view>
		<view class="BtnGood text-center">
			<button class="cu-btn round" @tap="appreciate" :disabled="addLikeDisable">
				<text class="cuIcon-appreciate text-xxl"></text>
			</button>
			<view class="text-gray">内容不错，对我有帮助~</view>
		</view>
	</view>
</template>

<script>
	import hdprcapi from '@/common/userServiceApis/hdPrcapi.js'
	import parseHtml from '@/common/html-parser.js'
	import navHeader from '../../../../components/nav-header.vue'
	
	export default {
		data() {
			return {
				stuScoreImgUrl: this.$baseURL + '/StuInfoService/funcStuGuide/img/stuScore.png',
				headerImgUrl: this.$baseURL + '/StuInfoService/funcStuGuide/img/fwzn.jpg',
				AddNo: null, //指南id
				AffairData: null
			};
		},
		computed:{
			title(){//标题
				if(!this.AffairData) return ''
				return this.AffairData.GName
			},
			date(){//日期
				if(!this.AffairData) return ''
				return this.AffairData.InputTime
			},
			likeCnt(){//点赞数
				if(!this.AffairData) return '0'
				return String(this.AffairData.likeCnt)
			},
			seeCnt(){//浏览量
				if(!this.AffairData) return '0'
				return String(this.AffairData.seeCnt)
			},
			sContent(){//内容
				if(!this.AffairData) return '暂无内容'
				let deviceWidth = this.$deviceWidth() - 50
				let nodes = parseHtml(decodeURIComponent(this.AffairData.Gcontent))
				for(let node of nodes){
					if(node.children){
						let children = node.children
						for(let kid of children){
							if(kid.name == 'img'){
								kid.attrs.style = "width:"+ deviceWidth +"px;" + "margin-top:20px" 
							}
						}
					}
				}
				console.log(nodes)
				return nodes
			},
			addLikeDisable(){//点赞按钮是否禁用
				if(!this.AffairData) return true
				if(this.AffairData.Gcontent.trim() == "暂无指南") return true
				return false
			}
		},
		components:{
			navHeader
		},
		onLoad(e) {
			if(e.AddNo){
				this.AddNo = e.AddNo
				console.log(this.AddNo)
			}
		},
		onShow(e) {
			this.showGuideCon()
		},
		methods: {
			//获取具体内容
			async showGuideCon(){
				let resdata = await hdprcapi.showGuideCon(this.AddNo)
				console.log(resdata)
				if(resdata == null) return
				this.AffairData = resdata
			},
			//点赞
			async appreciate(){
				let addLike = await hdprcapi.addLikeCnt(this.AddNo)
				console.log(addLike)
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-affairDetail {
		// background-color: #F0F0F0;
		// height: 100%;
	}
	.header{
		border-bottom: 1rpx solid #a3f4f4;
		padding-bottom: 10rpx;
		.header-icon{
			height: 90rpx;
			background-repeat: no-repeat;
			background-size: 200rpx;
			display: flex;
			flex-direction: column;
			view{
				margin-top: 5rpx;
				margin-left: 28rpx;
			}
			.header-icon-sub{
				font-size: 17rpx;
			}
		}
		.header-title {
			// text-align: center;
			height: 80rpx;
			width: 100%;
			view {
				text-align: center;
				font-size: 40rpx;
				font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
				font-weight: 1000;
			}
		}
		.header-detail{
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			text{
				color: #44aba4;
			}
		}
	}
	.main {
		padding: 30rpx;
	}
	.BtnGood{
		padding: 20rpx;
		button{
			margin-bottom: 15rpx;
			text{
				font-size: 40rpx;
			}
		}
	}
</style>
