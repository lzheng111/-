<template>
	<view class="container">
		
		<!-- 商品详情轮播图 -->
		<swiper-image :resdata = "banner" height ="750" preview></swiper-image>
		
		<!-- 基础详情 -->
		<base-info :detail="detail"></base-info>
		
		<!-- 滚动商品特性 -->
    <scroll-attrs :baseAttrs = "baseAttrs"></scroll-attrs>
		
		<!-- 属性选择 -->
		<view class="p-2">
			<view class="rounded border bg-light-secondary">
				<uni-list-item link @click="show('attr')">
					<view class="d-flex">
						<text class="mr-2 text-muted">已选</text>
						<text class="mr-1" v-for="(item1, index1) in selects" :key="index1">
						  {{ item1.list[item1.selected].name }}
						</text>
					</view>
				</uni-list-item>
				<uni-list-item link @click="show('express')">
					<view class="d-flex">
						<text class="mr-2 text-muted">配送</text>
						<text class="mr-2">北京 东城区</text>
						<text class="main-text-color">现配</text>
					</view>
				</uni-list-item>
				<uni-list-item  link @click="show('service')">
					<view class="d-flex a-center">
						<view class="d-flex  font a-center mr-2">
							<view class="iconfont icon-finish mr-1" style="color:#FD6801;"></view>
							<text class="text-muted">小米自营</text>
						</view>
						<view class="d-flex font a-center mr-2">
							<view class="iconfont icon-finish mr-1" style="color:#FD6801;"></view>
							<text class="text-muted">小米发货</text>
						</view>
						<view class="d-flex font a-center mr-2">
							<view class="iconfont icon-finish mr-1" style="color:#FD6801;"></view>
							<text class="text-muted">七天无理由发货</text>
						</view>
					</view>
				</uni-list-item>
			</view>
		</view>
		
		<!-- 横向滚动评论 -->
	  <scroll-comments :comments="comments"></scroll-comments>
		
		<!-- 商品详情 -->
	  <view class="py-4">
			<u-parse className="uparse" :content="context" @preview ="preview" @navigate = "navigate"></u-parse>
		</view>
		
		<!-- 热门推荐 -->
		<card headTitle="热门推荐" :headTitleWidth="false" :headBorderButtom="false">
			<view class="row j-sb">
				<common-list v-for="(item,index) in hotList" :key="index"
			 :item="item" :index="index"></common-list>
			</view>
		</card>
		
		<!-- 底部操作条 -->
		<bottom-btn @show = "show('attr')"></bottom-btn>
		
		<!-- 加入购物车弹出框 -->
    <common-popup :popupClass="popup.attr" @hide = "hide('attr')">
			<!-- 商品图片和信息 -->
			<view class="d-flex a-center" style="height: 275rpx;">
				<image :src="detail.cover" mode="widthFix"
				style="width: 180rpx; height:180rpx"
				class="border rounded"></image>
				<view class="pl-2">
					<price priceSize="font-lg" unitSize="font">{{detail.pprice}}</price>
					<view class="d-block mt-2">
						<text class="mr-1" v-for="(item1, index1) in selects" :key="index1">
						  {{ item1.list[item1.selected].name }}
						</text>
					</view>
				</view>
			</view>
			<!-- 表单 -->
			<scroll-view scroll-y="true" class="w-100" style="height: 760rpx;">
				<card :headTitle="item.title" headTitleWidth="false" :headBorderButtom="false"
				v-for="(item,index) in selects" :key="index">
					<uradio-group :label="item" :selected.sync = 'item.selected'></uradio-group>
				</card>
				<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
					<text>购买数量</text>
					<uni-number-box :min="1" :value="detail.num" @change="detail.num = $event"></uni-number-box>
				</view>
			</scroll-view>
			
			<!-- 按钮 -->
			<view class="d-flex a-center j-center main-bg-color text-white font-md " style="height: 100rpx;margin-left: -30rpx;margin-right:-30rpx;" hover-class="main-bg-hover-color"
			@tap.stop="addCart">
				加入购物车
			</view>
		</common-popup>
		
		<!-- 收货地址弹出框 -->
		<common-popup :popupClass="popup.express" @hide = "hide('express')">
			<view class="d-flex font-md j-center a-center border-bottom border-light-secondary" style="height: 100rpx;">收货地址</view>
			<!-- 收货地址表单 -->
			<scroll-view scroll-y="true" class="w-100" style="height: 935rpx;">
				<uni-list-item link v-for="i in 10" :key="i">
					<view class=" iconfont icon-dingwei font-weight font-md">林忠恒</view>
					<view class="font text-light-muted">
						广东省阳江市江城区南排李屋寨
					</view>
				</uni-list-item>
			</scroll-view>
			
			<!-- 按钮 -->
			<view class="d-flex a-center j-center main-bg-color text-white font-md " style="height: 100rpx;margin-left: -30rpx;margin-right:-30rpx;" hover-class="main-bg-hover-color"
			@tap.stop="hide('express')">
				选择新的地址
			</view>
		</common-popup>
		
		<!-- 服务说明弹出框 -->
		<common-popup :popupClass="popup.service" @hide = "hide('service')">
			<view class="d-flex font-md j-center a-center border-bottom border-light-secondary" style="height: 100rpx;">服务说明</view>
			<!-- 收货地址表单 -->
			<scroll-view scroll-y="true" class="w-100" style="height: 935rpx;">
				<view class="py-1">
					<view class="d-flex a-center">
						<view class="iconfont icon-finish mr-1 " style="color: #FD6801;"></view>
						小米自营
					</view>
					<text class="text-light-muted font pl-4 d-block">满1000包邮</text>
				</view>
				<view class="py-1">
					<view class="d-flex a-center">
						<view class="iconfont icon-finish mr-1" style="color: #FD6801;"></view>
						小米发货
					</view>
					<text class="text-light-muted font pl-4 d-block">由小米自营官方发货</text>
				</view>
				<view class="py-1">
					<view class="d-flex a-center">
						<view class="iconfont icon-finish mr-1" style="color: #FD6801;"></view>
						七天无理由退货
					</view>
				</view>
				<view class="py-1">
					<view class="d-flex a-center">
						<view class="iconfont icon-finish mr-1" style="color: #FD6801;"></view>
						运费说明
					</view>
					<text class="text-light-muted font pl-4 d-block">满1000包邮</text>
					<text class="text-light-muted font pl-4 d-block">部分产品单品包邮</text>
				</view>
			</scroll-view>
		</common-popup>
		
		
		
	<!--  -->
	</view>
</template>

<script>
	import swiperImage from "@/components/index/swiper-image.vue"
	import baseInfo from "@/components/detail/base-info.vue"
	import scrollAttrs from "@/components/detail/scroll-attrs.vue"
	import scrollComments from "@/components/detail/scroll-comments.vue"
	import uParse from "@/components/u-parse/u-parse.vue"
	import card from "@/components/common/card.vue"
	import commonList from "@/components/common/common-list.vue"
	import bottomBtn from "@/components/detail/bottom-btn.vue"
	import commonPopup from "@/components/common/common-popup.vue"
	import price from "@/components/common/price.vue"
	import uradioGroup from "@/components/common/radio-group.vue"
	import {mapMutations} from "vuex"
	export default{
		components:{
			swiperImage,
			baseInfo,
			scrollAttrs,
			scrollComments,
			uParse,
			card,
			commonList,
			bottomBtn,
			commonPopup,
			price,
			uradioGroup
		},
		data(){
			return{
				selects:[],
				popup:{
					attr:"none",
					express:"none",
					service:"none"
				},
				context: `<p>
				<img  style="display:block;" src="https://cdn.cnbj1.fds.api.mi-img.com/product-images/redmik50u/4056.jpg?x-fds-process=image/resize,q_90,f_webp">
				<img  style="display:block;" src="https://cdn.cnbj1.fds.api.mi-img.com/product-images/redmik50u/3598.jpg?x-fds-process=image/resize,q_90,f_webp">
				<img  style="display:block;" src="https://cdn.cnbj1.fds.api.mi-img.com/product-images/redmik50u/3610.png?123?x-fds-process=image/resize,q_90,f_webp">
				<img  style="display:block;" src="https://cdn.cnbj1.fds.api.mi-img.com/product-images/redmik50u/3699.png?x-fds-process=image/resize,q_90,f_webp">
				<img  style="display:block;" src="https://cdn.cnbj1.fds.api.mi-img.com/product-images/redmik50u/3728.jpg?x-fds-process=image/resize,q_90,f_webp">
				</p>`,
				banner:[],
				detail:{},
				baseAttrs:[
					{
						icon:"icon-cpu",
					  title:"CPU",
						desc:"晓龙8+"
					},
					{
						icon:"icon-cpu",
					  title:"超大屏",
						desc:"6.67英寸"
					},
					{
						icon:"icon-cpu",
					  title:"超长待机",
						desc:"5000mAh"
					},
					{
						icon:"icon-cpu",
					  title:"双卡",
						desc:"双卡双待"
					},
					{
						icon:"icon-cpu",
					  title:"屏幕材质",
						desc:"OLED"
					},
					{
						icon:"icon-cpu",
					  title:"摄像头",
						desc:"1亿像素"
					}
				],
				comments:[
					{
						userpic:"../../static/images/demo/demo6.jpg",
						username:"林忠恒",
						create_time:"2022-08-10",
						goods_nums:"123",
						context:"评论内容",
						imglist:[
							"../../static/images/demo/demo6.jpg",
							"../../static/images/demo/demo6.jpg",
							"../../static/images/demo/demo6.jpg",
						]
					},
					{
						userpic:"../../static/images/demo/demo6.jpg",
						username:"林忠恒",
						create_time:"2022-08-10",
						goods_nums:"123",
						context:"评论内容",
						imglist:[
							"../../static/images/demo/demo6.jpg",
							"../../static/images/demo/demo6.jpg",
							"../../static/images/demo/demo6.jpg",
						]
					},
					{
						userpic:"../../static/images/demo/demo6.jpg",
						username:"林忠恒",
						create_time:"2022-08-10",
						goods_nums:"123",
						context:"评论内容",
						imglist:[
							"../../static/images/demo/demo6.jpg",
							"../../static/images/demo/demo6.jpg",
							"../../static/images/demo/demo6.jpg",
						]
					},
					{
						userpic:"../../static/images/demo/demo6.jpg",
						username:"林忠恒",
						create_time:"2022-08-10",
						goods_nums:"123",
						context:"评论内容",
						imglist:[
							"../../static/images/demo/demo6.jpg",
							"../../static/images/demo/demo6.jpg",
							"../../static/images/demo/demo6.jpg",
						]
					}
				],
			  hotList:[
			  	{
			  		cover:"../../static/images/demo/list/1.jpg",
			  		title:"米家空调",
			  		desc:"1.5匹变频",
			  		oprice:"2699",
			  		pprice:"1688"
			  	},
			  	{
			  		cover:"../../static/images/demo/list/1.jpg",
			  		title:"米家空调",
			  		desc:"1.5匹变频",
			  		oprice:"2699",
			  		pprice:"1688"
			  	},
			  	{
			  		cover:"../../static/images/demo/list/1.jpg",
			  		title:"米家空调",
			  		desc:"1.5匹变频",
			  		oprice:"2699",
			  		pprice:"1688"
			  	},
			  	{
			  		cover:"../../static/images/demo/list/1.jpg",
			  		title:"米家空调",
			  		desc:"1.5匹变频",
			  		oprice:"2699",
			  		pprice:"1688"
			  	},
			  ]
			}
		},
		
		onLoad(options) {
			let data=JSON.parse(options.data);
      this.selects = data.selects
			this.banner = data.banner
      this.detail.id = data.id,
			this.detail.title = data.title,
			this.detail.desc = data.desc,
			this.detail.cover = data.cover,
			this.detail.pprice = data.pprice,
			this.detail.num = data.num,
			this.detail.max = data.max
		},
		
		// 监听页面返回事件
		onBackPress(e) {
			console.log(e);
			if(e.from === 'backbutton'){
				uni.navigateBack()
			}
			//关闭模态框
			for(let key in this.popup){
				if(this.popup[key] !== 'none'){
					this.hide(key)
					return true
				}
			}			
			return true
		},
		
		methods:{
			...mapMutations([
				'addGoodsToCart'
			]),
			 preview(src, e) {
			      // do something
			},
			navigate(href, e) {
			      // do something
			},
			show(key){
				this.popup[key] = 'show'
			},
			hide(key){
				this.popup[key] = 'hide'
				setTimeout(() =>{
					this.popup[key] = 'none'
				},200)
			},
			// 加入购物车
			addCart(){
				// 合并数据
				let goods = this.detail
				goods['checked'] = false
				goods['attrs'] = this.selects
				console.log(goods);
				// 加入购物车
				this.addGoodsToCart(goods)
				// 隐藏筛选框
				this.hide('attr')
				// 成功提示
				uni.showToast({
					title:'加入购物车成功'
				})
			}
		}
	}
	
</script>

<style lang="scss">
	.uparse{
		padding: 0!important;
		view:{
			line-height: 0!important;
		}
	}
	
	// 隐藏滚动条
	.container {
		height: 100vh; 
		overflow: auto;
	}
	
	.container::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}
</style>