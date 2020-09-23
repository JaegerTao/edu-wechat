<!-- 学业成绩与活动总览 -->
<template>
	<view class="page">
		<view class="Header">
			<view class="cu-bar search bg-white">
				<view class="margin-left"><text class="cuIcon-rank"></text><text>学期</text></view>
				<view class="search-form round">
					<input class="text-center" disabled="true" v-model="currentOption['termName']" :adjust-position="false" type="text"
					 placeholder="请选择学期" confirm-type="search"></input>
				</view>
				<view class="action" @tap="toggleModal">
					<text>选择</text>
					<text :class="pickerVisible?'cuIcon-triangleupfill':'cuIcon-triangledownfill'"></text>
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='DialogModal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">选择学期</view>
						<view class="action" @tap="toggleModal">
							<text class="cuIcon-roundcheck text-red"></text>
						</view>
					</view>
					<view class="bg-white">
						<picker-view :indicator-style="indicatorStyle" :value="pickerValue" @change="bindChange">
							<picker-view-column>
								<view class="item" v-for="(item,index) in optionsList" :key="index">{{item.termName}}</view>
							</picker-view-column>
						</picker-view>
					</view>
					<view class="cu-bar bg-gray justify-end">
						<view class="action">
							<button class="cu-btn bg-green margin-left" @tap="toggleModal">确定</button>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 成绩 -->
		<view class="cu-list menu border">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-post text-blue"></text>
					<text class="text-black text-bold">学期成绩</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">个人选课成绩记录</text>
				</view>
			</view>
		</view>
		<scroll-view scroll-x="true">
			<block v-if="hasGrade">
				<view class="Main Main-1 cu-card case">
					<view class="cu-item shadow">
						<view class="TableHead flex align-center text-bold">
							<view class="flex-treble">
								课程代码
							</view>
							<view class="flex-fifth">
								课程名称
							</view>
							<view class="flex-twice">
								学分
							</view>
							<view class="flex-twice">
								成绩
							</view>
							<view class="flex-treble">
								班级位置(%)
							</view>
						</view>
						<view class="TableItem flex align-center" v-for="(grade, index) in gradeList" :key="index">
							<view class="flex-treble">
								{{ grade.Cno }}
							</view>
							<view class="flex-fifth">
								{{ grade.CName }}
							</view>
							<view class="flex-twice">
								{{ grade.Credit }}
							</view>
							<view class="flex-twice">
								{{ grade.Score?grade.Score:'--' }}
							</view>
							<view class="flex-treble">
								{{ grade.Location?grade.Location:'--' }}
							</view>
						</view>
					</view>
				</view>
			</block>
			<block v-else>
				<view class="Empty flex align-center justify-center">
					<image :src="emptyImg" mode="aspectFit"></image>
					<text>暂无相关数据！</text>
				</view>
			</block>
		</scroll-view>

		<!-- 活动 -->
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-selection text-green"></text>
					<text class="text-black text-bold">课外活动总览 (<text class="text-orange text-lg">{{actTotal}}</text>/得分) </text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">个人参与的所有课外活动</text>
				</view>
			</view>
		</view>
		<scroll-view scroll-x="true">
			<block v-if="hasAct">
				<view class="Main Main-2 cu-card case">
					<view class="cu-item shadow">
						<view class="TableHead flex align-center text-bold">
							<view class="flex-ninth">
								活动名称
							</view>
							<view class="flex-treble">
								成果等级
							</view>
							<view class="flex-treble">
								参与形式
							</view>
							<view class="flex-twice">
								得分
							</view>
							<view class="flex-treble">
								项目负责人
							</view>
							<view class="flex-fourth">
								负责人学号
							</view>
							<view class="flex-fourth">
								负责人学院
							</view>
							<view class="flex-fifth">
								项目成员
							</view>
							<view class="flex-fourth">
								学院审核结果
							</view>
							<view class="flex-fourth">
								学校审核结果
							</view>
						</view>
						<view class="TableItem flex align-center" v-for="(act, index) in actList" :key="index">
							<view class="flex-ninth">
								{{act.actName}}
							</view>
							<view class="flex-treble">
								{{act.achiveName?act.achiveName:'--'}}
							</view>
							<view class="flex-treble">
								{{act.singleOrTeam==0?'个人':'团体'}}
							</view>
							<view class="flex-twice">
								{{act.achivescore?act.achivescore:'--'}}
							</view>
							<view class="flex-treble">
								{{act.stuName}}
							</view>
							<view class="flex-fourth">
								{{act.stuNo?act.stuNo:'--'}}
							</view>
							<view class="flex-fourth">
								{{act.UName}}
							</view>
							<view class="flex-fifth">
								{{act.stuMember}}
							</view>
							<view class="flex-fourth">
								{{act.sCheckRst==-1?'待审核':(act.sCheckRst==0?'不通过':'通过')}}
							</view>
							<view class="flex-fourth">
								{{act.uCheckRst==-1?'待审核':(act.uCheckRst==0?'不通过':'通过')}}
							</view>
						</view>
					</view>
				</view>
			</block>
			<block v-else>
				<view class="Empty flex align-center justify-center">
					<image :src="emptyImg" mode="aspectFit"></image>
					<text>暂无相关数据！</text>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	import userinfoapi from '@/common/userServiceApis/userinfoapi.js'
	export default {
		data() {
			return {
				emptyImg: this.$baseURL + '/StuInfoService/funcStuTab/img/empty.png',
				modalName: null, //模态框打开关闭参数
				currentOption: { //当前选择学期，形式为json对象
					termCode: null,
					termName: null
				},
				optionsList: [], //学期数组
				pickerValue: [0], //第几项
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`, //Picker动态高度
				gradeList: [], //成绩列表
				actList: [], //活动列表
				actTotal: 0
			}
		},
		computed: {
			pickerVisible() { //Picker是否可见
				if (this.modalName == null) {
					return false
				} else {
					return true
				}
			},
			hasGrade() { //成绩单长度是否大于0，是返回true 否返回false
				if (this.gradeList.length <= 0) return false
				return true
			},
			hasAct(){//活动列表长度是否大于0
				if(this.actList.length <= 0) return false
				return true
			}
		},
		mounted() {
			this.loadAll()
		},
		methods: {
			//切换选择器
			bindChange: function(e) {
				const val = e.detail.value
				this.currentOption = this.optionsList[val[0]]
				this.pickerValue[0] = val[0]
			},
			//初始化当前选项是数组中第几项
			pickerValueInit() {
				for (let i = 0; i < this.optionsList.length; i++) {
					if (this.currentOption.termCode == this.optionsList[i].termCode) {
						this.pickerValue[0] = i
					}
				}
			},
			//打开关闭Picker模态框
			async toggleModal(e) {
				if (this.modalName == null) {
					this.modalName = 'DialogModal'
				} else {
					this.modalName = null
					this.$showLoading('加载中...')
					await this.searchGrade()
					await this.getActInfo()
					uni.hideLoading()
				}
			},
			//加载数据
			async loadAll() {
				this.$showLoading('加载中...')
				await this.GetOptions()
				await this.searchGrade()
				await this.getActInfo()
				this.pickerValueInit()
				uni.hideLoading()
			},
			//获取当前学期和学期列表
			async GetOptions() {
				let crtOpt = await userinfoapi.GetOptions('currentTerm')
				let resOpts = await userinfoapi.GetOptions('termName')
				if (!crtOpt || !resOpts) {
					this.$ToastFail('加载失败，请重试')
					return
				}
				this.fillOption(crtOpt, 'currentTerm')
				this.fillOption(resOpts, 'termName')
			},
			//转换选项格式,resOpts-选项字符串，转换为json数组
			fillOption(resOpts, type) {
				this.optionsList = []
				let opts = resOpts.split(';')
				// console.log(opts)
				for (let opt of opts) {
					let Option = {
						termCode: null,
						termName: null
					}
					try {
						let sItem = opt.split(':')
						// console.log(sItem)
						Option.termCode = sItem[0]
						Option.termName = sItem[1]
						if (type == 'currentTerm') {
							this.currentOption = Option
							return
						}
						this.optionsList.push(Option)
					} catch (e) {
						continue
					}
				}
			},
			//获取成绩单
			async searchGrade() {
				try {
					let resGrade = await userinfoapi.searchGrade(this.currentOption.termCode)
					if (!resGrade) {
						this.$ToastFail('加载失败，请重试')
						return
					}
					this.gradeList = resGrade.rows
				} catch (e) {
					//TODO handle the exception
					console.log(e)
					this.$ToastFail('加载失败，请重试')
					return
				}
			},
			//获取活动列表
			async getActInfo() {
				try{
					let resAct = await userinfoapi.getActApplyInfo(this.currentOption.termCode)
					if (!resAct) {
						this.$ToastFail('加载失败，请重试')
						return
					}
					this.actList = resAct.rows
					this.actTotal = resAct.total
				}catch(e){
					//TODO handle the exception
					console.log(e)
					this.$ToastFail('加载失败，请重试')
					return
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.page {}

	.Header {
		border: 1rpx solid rgba(0, 0, 0, 0.1);

		.cuIcon-rank {
			color: #449d44;
			font-size: 40rpx;
		}

		picker-view {
			width: 100%;
			height: 250rpx;
			margin-top: 10rpx;

			.item {
				line-height: 100rpx;
				text-align: center;
			}
		}

	}

	.Main {
		// background-color: #F0F0F0;

		.TableHead,
		.TableItem {
			border: 1rpx solid rgba(0, 0, 0, 0.1);

			view {
				text-align: center;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			}
		}

		.TableHead {
			view {
				background-color: #20d6cd;
				height: 80rpx;
			}
		}

		.TableItem {
			view {
				min-height: 80rpx;
			}
		}

		.TableItem:hover {
			background-color: #F5F5F5;
		}
	}

	.Empty {
		image {
			width: 200rpx;
		}
	}

	.Main-1 {
		width: 1200rpx;
	}

	.Main-2 {
		width: 2500rpx;
	}
	
	scroll-view{
		border: 1rpx solid rgba(0,0,0,0.1);
		border-radius: 10rpx;
	}
</style>
