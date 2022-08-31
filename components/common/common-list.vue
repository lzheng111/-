<template>
	<view style="width: 372.5upx;" @tap="openDetail(item)">
	  <image :src="item.cover" lazy-load></image>
	  <view class="p-2 pt-1">
	  	<view class="font-md ">{{item.title}}</view>
	  	<text class="d-block font text-light-muted  text-hidden">{{item.desc}} </text>
	  	<view class="d-flex my-1">
		  	<price>{{item.pprice}}</price>
		    <view class="font-sm text-light-muted line-through ml-1 a-self-end line-h"
		  	>￥{{item.oprice}}</view>
	    </view>
	  </view>
	</view>
</template>
  
<script>
	import price from "@/components/common/price.vue"
	export default {
		props:{
			item:Object,
			index:Number
		},
		components:{
			price
		},
		methods:{
			openDetail(item){
				let resdata = JSON.stringify(item)
				uni.navigateTo({
					url:`/pages/detail/detail?data=${resdata}`,
				})
			}
		}
	}
</script>

<style scoped>
	.text-hidden{
	  text-overflow: -o-ellipsis-lastline;
	        overflow: hidden;
	        text-overflow: ellipsis;
	        display: -webkit-box;
	        -webkit-line-clamp: 2;
	        line-clamp: 2;
	        -webkit-box-orient: vertical;
	}
</style>