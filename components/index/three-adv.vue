<template>
	<view class="d-flex">
		<image :src="resdata.big.src"
		       lazy-load="true"
					 style="width: 373upx;height: 530upx;  border-right: 2upx solid #f5f5f5;"
					 @tap="event(resdata.big)"></image>
		<view class="d-flex flex-column">
			<image :src="resdata.samlltop.src"
				     style="width: 375upx;height: 264upx;border-bottom: 2upx solid #f5f5f5;"
				     @tap="event(resdata.samlltop)"></image>
			<image :src="resdata.samllbotton.src" 
			       style="width: 375upx;height: 264upx;"
			       @tap="event(resdata.samllbotton)"></image>
		</view>			
	</view>
</template>

<script>
	export default{
		props:{
			resdata:Object
		},
		methods:{
			event(obj){
				console.log('123',obj);
			}
		}
	}
</script>

<style>
</style>