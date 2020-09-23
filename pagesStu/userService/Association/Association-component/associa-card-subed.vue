<!-- 已提交申请社团卡片 -->
<template>
	<view>
		<view class="cu-card case">
			<view class="cu-item shadow bg-gray">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-purple"></text> {{assname}}
					</view>
					<view class="action">
						更新时间：{{ checktime }}
					</view>
				</view>
				<view class="cu-bar">
					<view class="action">
						{{ status }}
					</view>
					<view class="action" @click="showModal">
						<text class="cuIcon-edit text-orange"></text> 点击修改申请
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		computed:{
			status(){
				if(this.ischeck == 0 && this.ispass == 0) return '已提交申请'
				if(this.ischeck == 1) return '审核中'
				if(this.ispass == 0) return '申请已通过'
				return '无状态'
			}
		},
		props:{
			aid:{//社团ID
				type:String,
				default: ''
			},
			assname:{//社团名
				type:String,
				default: '--'
			},
			checktime:{//更新时间
				type: String,
				default: '--'
			},
			ischeck:{//是否审核
				type: Number,
				default: 0
			},
			ispass:{//是否通过
				type:Number,
				default: 0
			}
		},
		methods:{
			showModal(){
				this.$emit('showupdate', this.aid)
			}
		}
	}
</script>

<style lang="less" scoped>
	.cu-card{
		font-size: 25rpx;
	}
</style>
