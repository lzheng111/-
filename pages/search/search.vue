<template>
	<view>
		<card headTitle="热门搜索" bodyCover="../../static/images/demo/search-banner.png"></card>

		<!-- 多色按钮 -->
		<view class="px-1 mb-2">
			<block v-for="(item, index) in hot" :key="index"><color-tag :item="item"></color-tag></block>
		</view>

		<!-- 常用分类 -->
		<card headTitle="常用分类" :headBorderButtom="false" :bodyPadding="true"><color-tag v-for="(item, index) in cate" :key="index" :item="item" :color="false"></color-tag></card>

		<!-- 分割线 -->
		<divider></divider>

		<!-- 搜索记录 -->
		<card headTitle="搜索记录">
			<uni-list-item v-for="(item,index) in searchHistoryListL" :key="index" :title="item" :showArrow="false"></uni-list-item>
		</card>
	</view>
</template>

<script>
import card from '@/components/common/card.vue';
import colorTag from '@/components/search/color-tag.vue';

export default {
	components: {
		card,
		colorTag
	},

	onShow() {
		uni.request({
			url: 'https://www.fastmock.site/mock/b480a535168d1ac1b5ca1f5f7e83269c/uni/api/getGoodsData',
			success: res => {
				this.dataList = res.data.data[0].list[3].data;
			}
		});
	},
	//监听搜索框的点击事件
	onNavigationBarSearchInputChanged(e) {
		this.searchValue = e.text;
	},
	//监听搜索按钮的点击事件
	onNavigationBarButtonTap(e) {
		if (e.index === 0) {
			if (this.searchValue) {
				this.searchList = this.dataList.filter(item => item.title.indexOf(this.searchValue) > -1);
				this.searchHistoryListL.unshift(this.searchValue)
				uni.navigateTo({
					url: `../search-list/search-list?data=${JSON.stringify(this.searchList)}`
				});
			}else{ 
				uni.showToast({
					title:'输入不能为空'
				})
			}
		}
	},

	data() {
		return {
			hot: [{ name: '领券中心' }, { name: 'Redmi K20' }, { name: 'RedmiBook 14' }, { name: '智能积木 越野四驱车' }, { name: '手环 腕带' }],
			cate: [{ name: '耳机' }, { name: '手机' }, { name: '音箱' }, { name: '手表' }, { name: '配件' }, { name: '网关/传感器' }, { name: '健康' }, { name: '酷玩' }],
			dataList: [],
			searchValue: '',
			searchList: [],
			searchHistoryListL:['K50']
		};
	},
	methods: {}
};
</script>

<style></style>
