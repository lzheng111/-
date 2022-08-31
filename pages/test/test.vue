<template>
	<view>
		<view >
					<block v-for="(item , index) in dataList" :key="index">
					<view class="border border-light-secondary">
						<view style="height: 150upx;" >{{ item.id }}</view>
					<view style="height: 150upx;" >{{ item.name }}</view>
					</view>
					
				</block>
		</view>

			<view>
				<uni-load-more :status="status"  :content-text="contentText" color="#007aff"  />
			</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					id: 1,
					name: 'a'
				},
				{
					id: 2,
					name: 'a'
				},
				{
					id: 3,
					name: 'a'
				},
				{
					id: 4,
					name: 'a'
				},
				{
					id: 5,
					name: 'a'
				},
				{
					id: 6,
					name: 'a'
				},
				{
					id: 7,
					name: 'a'
				},
				{
					id: 8,
					name: 'a'
				},
				{
					id: 9,
					name: 'a'
				},
				{
					id: 10,
					name: 'a'
				},
				{
					id: 11,
					name: 'a'
				},
				{
					id: 12,
					name: 'a'
				},
				{
					id: 13,
					name: 'a'
				},
				{
					id: 14,
					name: 'a'
				},
				{
					id: 15,
					name: 'a'
				},
				{
					id: 16,
					name: 'a'
				},
				{
					id: 17,
					name: 'a'
				},
				{
					id: 18,
					name: 'a'
				},
				{
					id: 19,
					name: 'a'
				},
				{
					id: 20,
					name: 'a'
				}
			],
			totalPage: 1, // 统共页数，默认为1
			currentPage: 1, //当前页数 ，默认为1
			pageSize: 5, // 每页显示数量
			dataList: [], //当前页显示内容

			status: 'more',
			contentText: {
				contentdown: '查看更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			},
			testList:[]
		};
	},
	methods: {
		getCurrentPageData() {
			let begin = 0
			let end = this.currentPage * this.pageSize;
			this.dataList = this.list.slice(begin, end);
		}
	},

	onLoad() {
		uni.request({
			url:'https://www.fastmock.site/mock/b480a535168d1ac1b5ca1f5f7e83269c/uni/api/getGoodsData',
			success: (res) => {
				console.log(res);
			}
		})
		this.totalPage = Math.ceil(this.list.length / this.pageSize);
		this.totalPage = this.totalPage == 0 ? 1 : this.totalPage;
		this.getCurrentPageData();
	},
	// 上拉加载
	onReachBottom() {
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
		
		}, 2000);
	}
};
</script>

<style>
	page {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			background-color: #fff
		}
	
		view {
			font-size: 28upx;
			line-height: inherit
		}
	
		.example {
			padding: 0 30upx 30upx
		}
	
		.example-title {
			font-size: 32upx;
			line-height: 32upx;
			color: #777;
			margin: 40upx 25upx;
			position: relative
		}
	
		.example .example-title {
			margin: 40upx 0
		}
	
		.example-body {
			padding: 0 40upx
		}
	
		uni-radio-group uni-label {
			padding: 0;
		}
	
		.uni-list-item__container {
			padding: 24upx 30upx;
			width: 100%;
			box-sizing: border-box;
			flex: 1;
			position: relative;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}
	
		.uni-list-item__container:after {
			position: absolute;
			z-index: 3;
			right: 0;
			bottom: 0;
			left: 30upx;
			height: 1px;
			content: '';
			-webkit-transform: scaleY(.5);
			transform: scaleY(.5);
			background-color: #c8c7cc;
		}
</style>
