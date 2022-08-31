<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x class="border-bottom scroll-row" style="height: 80upx;" :scroll-into-view="scrollinto" :scroll-with-animation="true">
			<view
				class="scroll-row-item px-3"
				style="height: 80upx;line-height: 80upx;"
				v-for="(item, index) in tabbbars"
				:key="index"
				:class="tabIndex === index ? 'main-text-color' : ''"
				@click="changeTab(index)"
				:id="'tab' + index"
			>
				<text class="font-md">{{ item.name }}</text>
			</view>
		</scroll-view>

		<swiper :duration="200" :current="tabIndex" :style="'height:' + scrollH + 'px;'" @change.stop="onchangeTab">
			<swiper-item v-for="(item, index) in newsitems" :key="index">
				<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px;'"
				@scrolltolower="lowerBottom">
					<block v-for="(list, listIndex) in item.list" :key="listIndex">
						<!-- 轮播图 -->
						<swiper-image v-if="list.type === 'swipers'" :resdata="list.data"></swiper-image>

						<template v-if="list.type === 'indexnavs'">
							<!-- 分类 -->
							<index-nav :resdata="list.data"></index-nav>
							<!-- 分割线(全局) -->
							<divider></divider>
						</template>

						<template v-if="list.type === 'threeAdv'">
							<!-- 三图广告位  -->
							<three-adv :resdata="list.data"></three-adv>
							<divider></divider>
						</template>

						<!-- 大图广告位(全局) -->
						<card v-if="list.type === 'commonList'" :headTitle="headTitle" :bodyCover="bodyCover"></card>

						<!-- 公共列表组件（全局）	 -->
						<view v-if="list.type === 'commonList'" class="row j-sb pb-wb">
							<block v-for="(item2, index2) in dataList" :key="index2"><common-list :item="item2" :index="index2"></common-list></block>
						</view>
					</block>

					<!-- 上拉加载更多 -->
					<divider></divider>
					<!-- <view class=" d-flex a-center j-center text-light-muted font-md py-3">
						{{contentText.contentdown}}
					</view> -->
					<view><uni-load-more :status="status" :content-text="contentText" color="#007aff" @clickLoadMore="clickLoadMore"></uni-load-more></view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import swiperImage from '@/components/index/swiper-image.vue';
import indexNav from '@/components/index/index-nav.vue';
import threeAdv from '@/components/index/three-adv.vue';
import card from '@/components/common/card.vue';
import commonList from '@/components/common/common-list.vue';

export default {
	components: {
		swiperImage,
		indexNav,
		threeAdv,
		card,
		commonList
	},
	data() {
		return {
			scrollinto: 'tab1',
			scrollH: 500,
			tabIndex: 0,
			newsitems: [],
			tabbbars: [
				{
					name: '推荐'
				},
				{
					name: '关注'
				},
				{
					name: '体育'
				},
				{
					name: '热点'
				},
				{
					name: '财经'
				},
				{
					name: '娱乐'
				},
				{
					name: '娱乐'
				},
				{
					name: '娱乐'
				},
				{
					name: '娱乐'
				}
			],
			headTitle: '每日精选',
			bodyCover: '../../static/images/demo/demo4.jpg',
			goodsData: [],

			loadmore: [],
			totalPage: 1, // 统共页数，默认为1
			currentPage: 1, //当前页数 ，默认为1
			pageSize: 4, // 每页显示数量
			dataList: [], //当前页显示内容
			status: 'more', //状态
			contentText: {
				contentdown: '查看更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			}
		};
	},
	onLoad() {
		// 获取可视屏幕高度
		uni.getSystemInfo({
			success: res => {
				this.scrollH = res.windowHeight - uni.upx2px(82);
			}
		});
	},
	onShow() {
		uni.request({
			url: 'https://www.fastmock.site/mock/b480a535168d1ac1b5ca1f5f7e83269c/uni/api/getGoodsData',
			success: res => {
				this.newsitems = res.data.data;
				this.goodsData = res.data.data[0].list[3].data;
				this.totalPage = Math.ceil(this.goodsData.length / this.pageSize);
				this.totalPage = this.totalPage == 0 ? 1 : this.totalPage;
				this.getCurrentPageData();
			}
		});
	},
	//监听搜索框点击事件
	onNavigationBarSearchInputClicked() {
		uni.navigateTo({
			url: `../search/search`
		});
	},
	methods: {
		// 切换选项卡
		changeTab(index) {
			if (this.tabIndex === index) {
				return;
			}
			this.tabIndex = index;
			this.scrollinto = 'tab' + index;
		},
		// 监听滑动列表
		onchangeTab(e) {
			this.changeTab(e.detail.current);
		},
		// 上拉加载更多
		getCurrentPageData() {
			let begin = 0;
			let end = this.currentPage * this.pageSize;
			this.dataList = this.goodsData.slice(begin, end);
		},
		
		//上拉加载按钮触发加载
		clickLoadMore() {
			let _self = this;
			this.status = 'loading';
			uni.showNavigationBarLoading();
			if (this.currentPage == this.totalPage) {
				_self.status = 'no-more';
				uni.hideNavigationBarLoading();
			} else {
				setTimeout(() => {
					this.currentPage++;
					this.getCurrentPageData();
					_self.status = 'more';
					uni.hideNavigationBarLoading();
				}, 2000);
			}
		},
		
		// 滑动上拉加载
		lowerBottom() {
			console.log(123);
			let _self = this;
			this.status = 'loading';
			uni.showNavigationBarLoading();
			setTimeout(() => {
				if (this.currentPage == this.totalPage) {
					_self.status = 'no-more';
					uni.hideNavigationBarLoading();
				} else {
					this.currentPage++;
					this.getCurrentPageData();
					_self.status = 'more';
					uni.hideNavigationBarLoading();
				}
			}, 1000);
		},
	}
};
</script>

<style>
.example {
	padding: 0 30upx 30upx;
}

.example-title {
	font-size: 32upx;
	line-height: 32upx;
	color: #777;
	margin: 40upx 25upx;
	position: relative;
}

.example .example-title {
	margin: 40upx 0;
}

.example-body {
	padding: 0 40upx;
}

uni-radio-group uni-label {
	padding: 0;
}
</style>
