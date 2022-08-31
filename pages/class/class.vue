<template>
	<view class="d-flex border-top bg-light-secondary" style="height: 100%;box-sizing: border-box;">
		
		<!-- loading加载 -->
		<loading :show = "showLoading"></loading>
		
		<!-- 左边分类栏 -->
		<scroll-view id="leftScroll" scroll-y style="flex:1;height: 100%;" class="border-right bg-light-secondary"
		:scroll-top="leftStrollTop">
			<view class="border-bottom bg-light-secondary py-1 left-scroll-item"
			hover-class="bg-light-secondary"
			v-for="(item,index) in cate" :key="index"
			@tap="changeCate(index)">
				<view class="d-flex py-1 font-md  text-muted a-center j-center"
				:class="activeIndex === index ?'class-active' : ''">
				 {{item.name}}
				</view>
			</view>
		</scroll-view>
		
		<!-- 右边商品栏 -->
		<scroll-view scroll-y style="flex:3.5;height: 100%;"
		:scroll-top="rightScrollTop"
		:scroll-with-animation="true"
		@scroll="onRightScroll">
			<view class="row right-scroll-item" v-for="(item2,index2) in list" :key="index2">
				<view class="span24-8 text-center py-2" v-for="(item3,index3) in item2.list" :key="index3">
		  	  <image :src="item3.src" style="width: 150upx;height: 150upx;"></image>
			  	<text class="d-block">{{item3.name}}</text>
			  </view>
			</view>
		</scroll-view>
			
	</view>
</template>

<script>
	export default {
		data(){
			return{
				showLoading:true,
				activeIndex:0,
				cate:[
					{name:"推荐"},
					{name:"手机"},
					{name:"穿戴"},
					{name:"平板"},
					{name:"笔记本"},
					{name:"电视"},
					{name:"门锁"},
					{name:"路由器"},
					{name:"打印机"},
					{name:"数码配件"},
					{name:"家用电器"},
					{name:"家庭影音"},
					{name:"运动户外"},
					{name:"只能家装"},
					{name:"教育玩具"},
					{name:"小米服务"},
					{name:"小米有品"},
				],
				list:[],
			  leftDomsTop:[],
				rightDomsTop:[],
				rightScrollTop:0,
				leftStrollTop:0,
				cateItemHeight:0
			}
		},
		onLoad() {
			this.$nextTick(() =>{
				this.showLoading = false
			})
		},
		onShow() {
			uni.request({
				url:'https://www.fastmock.site/mock/b480a535168d1ac1b5ca1f5f7e83269c/uni/api/class',
				success: (res) => {
					this.list = res.data.data
					this.$nextTick(()=>{
											this.getElInfo({
												all:'left',
												size:true,
												rect:true
											}).then(data=>{
												this.leftDomsTop = data.map(v=>{
													this.cateItemHeight = v.height
													return v.top
												})
											})
									
					this.getElInfo({
												all:'right',
												size:false,
												rect:true
											}).then(data=>{
												this.rightDomsTop = data.map(v=> v.top)
											})
											this.showLoading = false
					})
			}
		})
		},

		methods:{
			changeCate(index){
				this.activeIndex = index
				//右边的scrool-view滚动到指定位置
				this.rightScrollTop = this.rightDomsTop[index]
			},
			//监听右边滚动事件
			async onRightScroll(e){
				//匹配索引 rightDomsTop
				this.rightDomsTop.forEach((v,k) =>{
					if(v < e.detail.scrollTop +3){
						this.activeIndex = k
						return false 
					}
				})
			},
				// 获取节点信息
						getElInfo(obj = {}){
							return new Promise((res,rej)=>{
								let option = {
									size:obj.size ? true : false,
									rect:obj.rect ? true : false,
									scrollOffset:obj.scrollOffset ? true : false,
								}
								const query = uni.createSelectorQuery().in(this);
								let q = obj.all ? query.selectAll(`.${obj.all}-scroll-item`):query.select('#leftScroll')
								q.fields(option,data => {
								  res(data)
								}).exec();
							})
						},
		},
		watch:{
			activeIndex(newValue,oldValue) {
				//数值改变时获取scrollView的高度，scrollTop
				const query = uni.createSelectorQuery().in(this)
				query.select('#leftScroll').fields({
					size:true,
					scrollOffset:true
				},data =>{
					let H = data.height
					let ST  = data.scrollTop
				// 下边
				if ((this.leftDomsTop[newValue]+this.cateItemHeight) > (H+ST) ) {
					 return this.leftScrollTop = this.leftDomsTop[newValue]+this.cateItemHeight - H
				}
				// 上边
				if (ST > this.cateItemHeight) {
					this.leftScrollTop = this.leftDomsTop[newValue]
				}
				}).exec()
			}
		}
	}
</script>

<style>
	.class-active{
		border-left: 8upx solid #FD6801;
		color: #FD6801!important; 
	}
</style>