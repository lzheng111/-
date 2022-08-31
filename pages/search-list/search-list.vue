<template>
	<view>
		<!-- 排序/筛选 -->
		<view class="d-flex border-top border-bottom a-center" style="height: 100upx;">
			<view class="flex-1 d-flex a-center j-center font-md"
			v-for="(item,index) in screen.list" :key="index"
			@click="changeScreen(index)">
				<text :class="screen.currentIndex === index ?'main-text-color': 'text-light-muted'">{{item.name}}</text>
				<view>
					<view class=" iconfont icon-paixu-shengxu line-h0"
					:class="item.status === 1 ?'main-text-color': 'text-light-muted'"></view>
					<view class=" iconfont icon-paixu-jiangxu line-h0"
					:class="item.status === 2 ?'main-text-color': 'text-light-muted'"></view>
				</view>
			</view>
			<view class="flex-1 d-flex a-center j-center text-light-muted"
			@tap="showDrawer">筛选</view>
		</view>
		
		<!-- 抽屉 -->
		<uni-drawer ref="showRight" mode="right" :mask-click="true" :width = "300">
			<!-- body -->
			<card headTitle = "服务" :headBorderButtom="false" :headTitleWidth="false">
				<!-- 单选按钮 -->
				<uradio-group :label="label" :selected.sync ='label.selected'></uradio-group>
			</card>
			<!-- 底部按钮 -->
			<view class="d-flex position-fixed bottom-0 right-0 w-100 border-top border-light-secondary">
				<view class="flex-1 font-md  py-2 text-center "
				hover-class="bg-light-secondary">重置</view>
				<view class="flex-1 main-bg-color text-white font-md py-2 text-center"
				hover-class="main-bg-hover-color">确定</view>
			</view>
		</uni-drawer>
		
		<!-- 列表-->
		<view class="d-flex j-center a-center font-lg" v-if="list.length === 0">没有找到该商品</view>
		<block v-else v-for="(item,index) in list" :key="index">
		<search-list :item ="item" :index ="index"></search-list>
		</block>
	</view>
</template>

<script>
	import card from "@/components/common/card.vue"
	import uradioGroup from "@/components/common/radio-group.vue"
	import searchList from "@/components/search-list/search-list.vue"
	export default {
    components:{
			card,
			uradioGroup,
			searchList
		},
		onLoad(options) {
			this.list = JSON.parse(options.data);
		},
		
		data(){
			return{
				screen:{
					currentIndex:0,
					list:[
						{name:"综合",status:1},
						{name:"销量",status:0},
						{name:"价格",status:0},
					]
				},
				label:{
					selected:0,
					list:[
						{name:"促销"},
						{name:"分期"},
						{name:"仅看有货"},
					]
				},
				list:[]
			}
		},
		methods:{
			changeScreen(index){
				//判断当前点击是否是激活状态
				let oldIndex = this.screen.currentIndex
				let oldItem = this.screen.list[oldIndex]
				if(oldIndex === index){
				  return oldItem.status = oldItem.status === 1 ? 2 : 1
				}
				let newItem = this.screen.list[index]
				// 移除旧激活状态
				oldItem.status = 0
				this.screen.currentIndex = index
				// 添加新激活状态
				newItem.status = 1
			},
			showDrawer() {
				console.log(this.$refs.showRight);
				this.$refs.showRight.open();
			},
			closeDrawer() {
				this.$refs.showRight.close();
			},
		},
		
		
		
	}
</script>

<style>

</style>