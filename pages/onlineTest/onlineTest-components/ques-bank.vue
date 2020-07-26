<!-- 题库页面 -->
<template>
	<view class="page">
		<swiper :style="{height:scrollHeight + 'px'}" :current="swiper">
			<!-- 学期选择 -->
			<swiper-item catchtouchmove="catchTouchMove">
				<view class="swiper-item">
					<scroll-view scroll-y :style="{height:scrollHeight + 'px'}">

						<view class="Term">
							<view class="cu-bar bg-white solid-bottom"  @tap='toggleTerm(0)'>
								<view class="action text-bold">
									<text class="cuIcon-calendar" style="color: #17a2b8;"></text>2019-2020学年第二学期
								</view>
								<view class="action">
									<text :class="collapse(0)?'cuIcon-unfold':'cuIcon-right'"></text>
								</view>
							</view>
							<view class="grid col-2 margin-bottom" v-show="collapse(0)">
								<view class="" @tap="changeSwiper">
									<subject-card title="中国近现代史纲要" score="4" type="必修" examtype="考试"></subject-card>
								</view>
								<view class="">
									<subject-card title="毛泽东思想和中国特色社会主义理论体系概论" score="4" type="必修" examtype="考试"></subject-card>
								</view>
							</view>
						</view>
						<view class="Term">
							<view class="cu-bar bg-white solid-bottom" @tap='toggleTerm(1)'>
								<view class="action text-bold">
									<text class="cuIcon-calendar" style="color: #17a2b8;"></text>2019-2020学年第一学期
								</view>
								<view class="action">
									<text :class="collapse(1)?'cuIcon-unfold':'cuIcon-right'"></text>
								</view>
							</view>
							<view class="grid col-2 margin-bottom" v-show="collapse(1)">
								<view class="">
									<subject-card title="中国近现代史纲要" score="4" type="必修" examtype="考试"></subject-card>
								</view>
								<view class="">
									<subject-card title="毛泽东思想和中国特色社会主义理论体系概论" score="4" type="必修" examtype="考试"></subject-card>
								</view>
							</view>
						</view>

					</scroll-view>
				</view>
			</swiper-item>
			<!-- 试题列表 -->
			<swiper-item catchtouchmove="catchTouchMove">
				<view class="swiper-item">
					<scroll-view scroll-y :style="{height:scrollHeight + 'px'}">

						<view class="Search">
							<view class="cu-bar search bg-white">
								<view class="cuIcon-back" @tap="changeSwiper">返回</view>
								<view class="search-form round">
									<text class="cuIcon-search"></text>
									<input :adjust-position="false" type="text" placeholder="试卷名称或关键字(至少2字)" confirm-type="search"></input>
								</view>
								<view class="action">
									<button class="cu-btn bg-green shadow-blur round" @tap="showList">搜索</button>
								</view>
							</view>
						</view>
						<view class="info-nav">
							<scroll-view scroll-x class="bg-white nav">
								<view class="flex text-center">
									<view class="cu-item flex-sub" :class="0==quesTabCur?'text-blue cur':''" @tap="tabSelect" :data-id="0">
										<text class="cuIcon-post"></text>练习
									</view>
									<view class="cu-item flex-sub" :class="1==quesTabCur?'text-blue cur':''" @tap="tabSelect" :data-id="1">
										<text class="cuIcon-write"></text>考试
									</view>
								</view>
							</scroll-view>
						</view>
						<view class="QuesList">
							<view class="cu-list menu sm-border margin-top-sm">
								<view class="cu-item">
									<view class="content">
										<text class="text-grey text-sm">2020年1月中国近代史纲要练习仿真模拟题（1）</text>
									</view>
									<view class="action">
										<button class="cu-btn round shadow text-white text-sm" style="background-color: #17a2b8;">开始做题</button>
									</view>
								</view>
								<view class="cu-item">
									<view class="content">
										<text class="text-grey text-sm">2020年1月中国近代史纲要练习仿真模拟题（2）</text>
									</view>
									<view class="action">
										<button class="cu-btn round shadow text-white text-sm" style="background-color: #17a2b8;">开始做题</button>
									</view>
								</view>
								<view class="cu-item">
									<view class="content">
										<text class="text-grey text-sm">2020年1月中国近代史纲要练习仿真模拟题（3）</text>
									</view>
									<view class="action">
										<button class="cu-btn round shadow text-white text-sm" style="background-color: #17a2b8;">开始做题</button>
									</view>
								</view>
							</view>
						</view>

					</scroll-view>
				</view>
			</swiper-item>
		</swiper>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import minCollapse from '@/components/min-collapse/min-collep.vue'
	import subjectCard from './subject-card.vue'
	export default {
		data() {
			return {
				swiper: 0, //学期与试卷列表页面 0-学期 1-试卷列表

				toggleData: [0], //折叠数组,非手风琴
				toggleIndex: 0, //折叠标志,手风琴
				
				quesTabCur: 0, //试卷列表导航号 0-练习 1-考试
				scrollLeft: 0, //试卷列表导航滚动
			};
		},
		computed: {
			scrollHeight() { //获取设备高度作为scroll-view高度
				return this.$deviceHeight() - 50
			},
			collapse() {//判断是否展开，是返回true，否返回false
				return function(index) {
					// for (let tg of this.toggleData) {
					// 	if (tg == index) return true
					// }
					if(this.toggleIndex == index) return true
					return false
				}
			}
		},
		components: {
			minCollapse,
			subjectCard
		},
		props: {

		},
		methods: {
			//禁止触摸滑动
			catchTouchMove: function(res) {
				return false
			},
			//展开或关闭
			toggleTerm(index) {
				// for (let tg of this.toggleData) {
				// 	if (index == tg) {
				// 		this.removeArray(this.toggleData, index)
				// 		return
				// 	}
				// }
				// this.toggleData.push(index)
				if(this.toggleIndex == index){
					this.toggleIndex = -1
					return
				}
				this.toggleIndex = index
			},
			//切换学期、试卷列表界面
			changeSwiper() {
				if (this.swiper == 0) { //到试卷列表
					this.swiper += 1
				} else if (this.swiper == 1) { //到学期
					this.swiper -= 1
				}
			},
			//导航键选中
			tabSelect(e) {
				this.quesTabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			//删除数组中指定元素
			removeArray(arr, val){
				for (var i = 0; i < arr.length; i++) {
					if (arr[i] == val) {
						arr.splice(i, 1);
						break;
					}
				}
			}

		}
	}
</script>

<style lang="less" scoped>
	.page {
		height: 100vh;
		background-color: #F0F0F0;
		z-index: 1;
	}
</style>
