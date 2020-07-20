<!-- 信息填写 -->
<template>
	<view>
		<view class="header">
			<nav-header></nav-header>
		</view>

		<!-- 分类列表 -->
		<view class="MenuLeft">
			<view class="cu-modal drawer-modal justify-start" :class="modalName=='DrawerModalL'?'show':''" @tap="hideModal">
				<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in menuList" :key="index" @tap="chooseItem(index)">
							<text :class="item.icon" class="text-xxl"></text>
							<view class="content margin-top margin-bottom text-lg margin-left">
								<view :class="index==currentIndex?'text-blue':''">{{item.name}} </view>
								<view class="">
									[<text :class="item.percent<100?'text-orange':'text-blue'">{{item.percent}}</text>/100]
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="MainTop">
			<!-- 头像区 -->
			<view class="avatar-box">
				<image :src="avatarURL" mode="aspectFit"></image>
			</view>
			<view class="MainTop-content">
				<view class="">学号：2015110415</view>
				<view class="">信息完整度：
					<view class="cu-progress round striped active">
						<view class="bg-orange" :style="[{ width:loading?'80%':''}]">80%</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 展开分类按钮 -->
		<view class="BtnShowMenu bg-white">
			<view class="" @tap="showModal" data-target="DrawerModalL">
				<text class="cuIcon-right"></text>展开分类
			</view>
		</view>

		<view class="MainContent">
			<view class="MainContent-title">
				{{menuList[currentIndex].name}}
			</view>

			<!-- 个人基本信息 -->
			<view class="baseInfo" v-show="currentIndex==0">
				<view class="cu-list menu sm-border">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">学号</text>
						</view>
						<view class="action">
							<text class="text-black">2015110415</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">姓名</text>
						</view>
						<view class="action">
							<text class="text-black">雷蒙</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">性别</text>
						</view>
						<view class="action">
							<text class="text-black">男</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">出生日期</text>
						</view>
						<view class="action">
							<text class="text-black">1997/01/12</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">民族</text>
						</view>
						<view class="action">
							<text class="text-black">汉族</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">身份证件类型</text>
						</view>
						<view class="action">
							<text class="text-black">居民身份证</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">身份证号</text>
						</view>
						<view class="action">
							<text class="text-black">510603199802201510</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">出生地</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">生源地</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">户口所在地</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">国家地区</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">入学前户口性质</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">港澳台侨</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">政治面貌</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">婚姻状态</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">一卡通号</text>
						</view>
						<view class="action">
							<text class="text-black">2017110414</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">健康状况</text>
						</view>
						<view class="action">
							<text class="text-black">良好</text>
						</view>
					</view>
				</view>
				<form>
					<view class="cu-form-group margin-top-sm">
						<view class="title">是否独生子女</view>
						<picker :range="singleSonPicker" @change="singleSonChange" :value="singleSonPickerIndex">
							<view class="picker">
								{{singleSonPickerIndex>-1?singleSonPicker[singleSonPickerIndex]:'选择是否独生子女'}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">手机号码</view>
						<input placeholder="手机号码" name="input"></input>
						<view class="cu-capsule radius">
							<view class='cu-tag bg-blue '>
								+86
							</view>
							<view class="cu-tag line-blue">
								中国大陆
							</view>
						</view>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">电子邮箱</view>
						<input placeholder="邮箱地址" name="input"></input>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">QQ号</view>
						<input placeholder="QQ号" name="input"></input>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">家庭地址</view>
						<input placeholder="家庭地址" name="input"></input>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">家庭地址区划</view>
						<input placeholder="家庭地址区划" name="input"></input>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">家庭地址邮编</view>
						<input placeholder="家庭地址邮编" name="input"></input>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">校内住宿地址</view>
						<input placeholder="校内住宿地址" name="input"></input>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">辅导员</view>
						<input placeholder="辅导员" name="input"></input>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">辅导员电话</view>
						<input placeholder="辅导员电话" name="input"></input>
					</view>
				</form>
			</view>

			<!-- 学籍信息 -->
			<view class="" v-show="currentIndex==1">
				<view class="cu-list menu sm-border">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">学籍状态</text>
						</view>
						<view class="action">
							<text class="text-black">正常</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">培养方式</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">院系</text>
						</view>
						<view class="action">
							<text class="text-black">计算机科学学院</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">专业</text>
						</view>
						<view class="action">
							<text class="text-black">计算机科学与技术</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">现在年级</text>
						</view>
						<view class="action">
							<text class="text-black">2017</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">班级</text>
						</view>
						<view class="action">
							<text class="text-black">计算机科学学院2017级4班</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">学制</text>
						</view>
						<view class="action">
							<text class="text-black">4</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">学生类别</text>
						</view>
						<view class="action">
							<text class="text-black">本专科生</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">培养层次</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">预期毕业日期</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">实际毕业日期</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">导师职工号</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">专业大类</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
				</view>
			</view>

			<!-- 入学信息 -->
			<view class="" v-show="currentIndex==2">
				<view class="cu-list menu sm-border">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">考生号</text>
						</view>
						<view class="action">
							<text class="text-black">106369077500065</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">考生类别</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">入学年月</text>
						</view>
						<view class="action">
							<text class="text-black">2019/09/01</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">入学前单位</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">入学方式</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">入学季节</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">通知书号</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">考试总分</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
				</view>
			</view>

			<!-- 组织关系 -->
			<view class="" v-show="currentIndex==3">
				<view class="cu-list menu sm-border">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">政治面貌</text>
						</view>
						<view class="action">
							<text class="text-black">预备党员</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">职务</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">目前转入组织</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">转入时间</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">接收原因</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">转入前单位</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">转来单位上级组织</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">预备/正式（党员）</text>
						</view>
						<view class="action">
							<text class="text-black">预备</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">转正日期</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 履历信息 -->
			<view class="" v-show="currentIndex==4">
				<view class="cu-list menu sm-border margin-bottom">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">教育时间</text>
						</view>
						<view class="action">
							<text class="text-black">2015/09/01</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">院校名称</text>
						</view>
						<view class="action">
							<text class="text-black">四川师范大学</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">专业</text>
						</view>
						<view class="action">
							<text class="text-black">软件工程</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">证书</text>
						</view>
						<view class="action">
							<text class="text-black">学士学位证书</text>
						</view>
					</view>
				</view>
				

				<view class="cu-list menu sm-border margin-top">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">教育时间</text>
						</view>
						<view class="action">
							<text class="text-black">2015/09/01</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">院校名称</text>
						</view>
						<view class="action">
							<text class="text-black">四川师范大学</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">专业</text>
						</view>
						<view class="action">
							<text class="text-black">软件工程</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">证书</text>
						</view>
						<view class="action">
							<text class="text-black">学士学位证书</text>
						</view>
					</view>
				</view>

				<view class="cu-list menu sm-border margin-top">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">工作时间</text>
						</view>
						<view class="action">
							<text class="text-black">2015/09/01</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">工作单位</text>
						</view>
						<view class="action">
							<text class="text-black">四川师范大学</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">岗位</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">离职原因</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 家庭成员 -->
			<view class="" v-show="currentIndex==5">
				<view class="cu-list menu sm-border margin-bottom">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">姓名</text>
						</view>
						<view class="action">
							<text class="text-black">雷俊昌</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">关系</text>
						</view>
						<view class="action">
							<text class="text-black">父女</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">单位</text>
						</view>
						<view class="action">
							<text class="text-black">管理局</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">联系电话</text>
						</view>
						<view class="action">
							<text class="text-black">17745692264</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">是否紧急联系人</text>
						</view>
						<view class="action">
							<text class="text-black">是</text>
						</view>
					</view>
				</view>
				
				<view class="cu-list menu sm-border margin-bottom">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">姓名</text>
						</view>
						<view class="action">
							<text class="text-black">朱周丽</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">关系</text>
						</view>
						<view class="action">
							<text class="text-black">母女</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">单位</text>
						</view>
						<view class="action">
							<text class="text-black">管理局</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">联系电话</text>
						</view>
						<view class="action">
							<text class="text-black"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">是否紧急联系人</text>
						</view>
						<view class="action">
							<text class="text-black">是</text>
						</view>
					</view>
				</view>
				
				
			</view>
		
		</view>
	</view>
</template>

<script>
	import navHeader from '../../../components/nav-header.vue'
	import stuTable from './stutable.js'

	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				modalName: null,
				menuList: null,
				currentIndex: 0,

				avatarURL: 'http://localhost:8083/StuInfoService/funcStuInfo/img/userface.gif',
				loading: false,

				singleSonPicker: ['是', '否'],
				singleSonPickerIndex: 0,
			};
		},
		components: {
			navHeader
		},
		onShow() {
			this.menuList = stuTable.menuList
			this.setLoading()
		},
		methods: {
			//左侧模态列表
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			chooseItem(index) {
				console.log(index)
				this.hideModal()
				this.currentIndex = index
			},

			//进度条
			setLoading() {
				setTimeout(() => {
					this.loading = true
				}, 500)
			},

			//表单
			singleSonChange(e) {
				this.singleSonPickerIndex = e.detail.value
			}
		}
	}
</script>

<style lang="less" scoped>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.BtnShowMenu {
		// border: 1px solid black;
	}

	.MainTop {
		display: flex;

		.avatar-box {
			margin: 25rpx;

			image {
				height: 125rpx;
				width: 125rpx;
				border-radius: 50%;
			}
		}

		.MainTop-content {
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			width: 550rpx;
			margin-top: 25rpx;
		}
	}

	.MainContent {

		.MainContent-title {
			text-align: center;
		}
	}
</style>
