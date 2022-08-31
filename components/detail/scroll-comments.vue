<template>
	<view class="p-2">
		<scroll-view scroll-x class="scroll-row">
			
			<view class="scroll-row-item rounded bg-light-secondary mr-2 p-2" style="height:380rpx ;width: 620rpx;"
			v-for="(item,index) in comments" :key="index">
				<!-- header -->
				<view class="d-flex a-center mb-1" >
					<image :src="item.userpic"
					mode="widthFix" style="width: 80rpx; height:80rpx"
					class="rounded-circle"></image>
					<view class="ml-2 d-flex flex-column j-center">
						<text class="font-md line-h-md">{{item.username}}</text>
						<text class="d-block font text-light-muted line-h-md">{{item.create_time}}0</text>
					</view>
					<view class="iconfont icon-dianzan font pl-1" style="color:#d0d0d0;margin-left: auto;">
					  {{item.goods_nums}}
					</view>
				</view>
				<!-- main -->
				<text class="d-block font-md mb-1">
					{{item.context}}
				</text>
				<view class="row">
					<view class="span24-8 px-2"
					v-for="(item2,index2) in item.imglist" :key="index2">
						<image :src="item2"
						mode="widthFix" style="height:115rpx"
						class="rounded"></image>
					</view>
				</view>
				
			</view>
		</scroll-view>
		
		<navigator url="/pages/detail-comment/detail-comment">
			<view class="d-flex j-center py-2 mt-2 text-primary" hover-class="bg-light-secondary">
			  更多评论
			  <view class="iconfont icon-you line-h-md"></view>
		</view>
		</navigator>
		
	</view>
</template>

<script>
	export default{
		props:{
			comments:Array
		}
	}
</script>

<style>
</style>