<template>
	<view>
		<view class="cu-card case text-center">
			<view class="cu-item shadow padding bg-white">
				<view class="solid-bottom">
					{{title}}
				</view>
				<view class="text-gray text-sm padding">
					<text class="cu-btn sm round text-yellow">{{type}}</text>
					学分:{{score}}
				</view>
				<view class="text-gray text-sm">成绩考核:{{examtype}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			title: { //标题
				type: String,
				default: ''
			},
			score: { //学分
				type: [Number, String],
				default: 0
			},
			type: { //课程类别
				type: String,
				default: ''
			},
			examtype: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="less" scoped>

</style>
