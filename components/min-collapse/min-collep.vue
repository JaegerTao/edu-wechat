<template>
<view class="min-collapse">

  <view class="card" >
      <view class="card-view" @click="test" >
        <minDescInput :desc="desc"  v-model="value" :sign="sign" :border="border"  :placeholder="placeholder" :disabled="disabled"></minDescInput>
        <!-- <image class="right-arrow p-left-10"  :src="isShow ? '../../static/images/downarrow24.png' : '../../static/images/arrow.png'" /> -->
        <image class="right-arrow "  :class="isShow ? 'animation' : 'right-arrow-a animation' "  src="./arrow.png" />
      </view>
      <view v-if="isArray">
		  <view class="content"  :class="isShow ? 'animation': 'show-list animation' "  :style="{'height':isShow? `${list.length%5 == 0 ? list.length / 5 : Math.round(list.length/5) + 1}00`-100+'rpx' :'0'}">
			<text  class="m-right-20" @click="chioce(index)" :class="current === index ? 'chioce-date-item-active' : 'chioce-date-item' " v-for="(item,index) in list" :key="index">{{item}}</text>
		  </view>
      </view>
      <view v-if="!isArray" >
        <view class="content-txt" :class="isShow ? 'animation ': ' animation' " :style="{'maxHeight':isShow? '120rpx' :'0'}">
          <text  class=" txt" >{{list}}</text>
        </view>
      </view>
      <!-- <text class="m-bottom-20" style="display:block">凌晨</text>
      <view class="content" :class="isShow ? 'animation': 'show animation' "  :style="{'height':isShow? `${list.length%5 == 0 ? list.length / 5 : Math.round(list.length/5) + 1}00rpx` :'0'}">
        <text  class="m-right-20" @click="chioce(index)" :class="current === index ? 'chioce-date-item-active' : 'chioce-date-item' " v-for="(item,index) in data" :key="index">{{item}}</text>
      </view> -->
  </view>
</view>
</template>
<script>
	/*
	* 这里是给不知道怎么注册使用的小伙伴友情提示...
	* main.js中全局注册
	* 注册方法 ： import Cname from '文件路径'
	*            Vue.Component('c-name',Cname)
	* 在页面中直接使用 ： <c-name></c-name>
	* 
	* 页面中注册： 
	* 	import Cname from '文件路径'
	* 	components:{minDescInput}
	* 使用： <c-name></c-name>
	* 		
	*/
	import minDescInput from './min-desc-input.vue'
export default {
	components:{minDescInput},
  props: {
    list: {
      type: [Array, String],
      default: () => []
    },
    desc: {
      type: String,
      default: '预抵时间'
    },
    sign: {
      type: String,
      default: '*'
    },
    placeholder: {
      type: String,
      default: '请选择到店日期'
    },
    disabled: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShow: true,
      current: Number,
      value: ''
      // data: ['8:00', '23:00', '9:00']
    }
  },
  computed: {
    isArray () {
      if (toString.call(this.list) === '[object Array]') {
        return true
      }
      return false
    }
  },
  watch:{
	value(a){
		this.$emit('input',a)
	}
  },
  methods: {
    test () {
      this.isShow = !this.isShow
    },
    chioce (n) {
		if(toString.call(this.list) === '[object Array]'){
			this.current = n
			this.value = this.list[n]
		}
    }
  }
}
</script>
<style lang="scss" scoped>
.min-collapse{
  .right-arrow{
	  //p-left-10
    width: 24rpx;
    height: 24rpx;
    padding-top:10rpx;
    transform: rotate(90deg);
	padding-left:10rpx;
  }
  .right-arrow-a{
    transform:rotate(7deg);
  }
  .card{
    background: #fff;
    border: none;
	 box-shadow: 0 0 10px 4px #EEEEEE;
	.card-view{
		//min-flex min-flex-main-between f28
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		padding: 20rpx;
		padding-bottom: 0;
	}
  }
  .content{
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
	// max-height: 0;
	padding: 0 20rpx;
    .chioce-date-item {
      width: 112rpx;
      height: 58rpx;
      border: 1rpx solid #e7e7e7;
      border-radius: 10rpx;
      font-size: 28rpx;
      text-align: center;
      line-height: 58rpx;
      display: block;
    }
    .chioce-date-item:nth-child(5n) {
      margin: 0;
    }
    .chioce-date-item-active{
      width: 112rpx;
      height: 58rpx;
      background: rgba(255, 224, 1, 1);
      border-radius: 10rpx;
      font-size: 28rpx;
      text-align: center;
      line-height: 58rpx;
    }
    .chioce-date-item-active:nth-child(5n) {
      margin: 0;
    }
	.m-right-20{
		margin-right: 35rpx;
		margin-bottom: 20rpx;
	}
  }
  //在txt中修改左右间距，默认使用父组件外容器的边距
  .content-txt{
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      max-height: 0;
	  padding-left: 20rpx;
	  padding-right: 20rpx;
	  // padding-bottom: 20rpx;
      .txt{
        word-break: break-all;
        white-space: normal;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        // padding:0 20rpx;
        padding-bottom: 20rpx;
		font-size: 28rpx;
		font-weight: normal;
      }
  }
  .show-list{
	  height: 0;
  }
  .show{
    max-height: 0;
	margin-bottom: 20rpx;
  }
  .animation {
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: ease;
  }
}

</style>
