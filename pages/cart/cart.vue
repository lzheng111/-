<template>
	<view style="background: F5F5F5;">
		<uni-nav-bar :statusBar="true" :rightText="isedit ? '完成' : '编辑'" title="购物车" @clickRight="isedit = !isedit" fixed="true"></uni-nav-bar>

		<!-- 购物车为空 -->
		<view class="py-5 d-flex a-center j-center bg-white border" v-if="disableSelectAll">
			<view class="iconfont icon-gouwuche text-light-muted" style="font-size: 50upx;"></view>
			<text class="text-light-muted mx-2">购物车为空</text>
			<view class="px-2 py-1 border border-light-secondary rounded" hover-class="bg-light-secondary">去逛逛</view>
		</view>

		<!-- 购物车商品列表 -->
		<view class="bg-white px-2 pt-2" v-else>
			<view class="d-flex a-center py-3 border border-light-secondary rounded" v-for="(item, index) in list" :key="index">
				<!-- 选择框 -->
				<label class="radio d-flex a-center j-center flex-shrink" style="width: 80upx;height: 80upx;" @click="selectItem(index)">
					<radio :value="item.id" color="#FD6801" :checked="item.checked" />
				</label>
				<!-- 商品图片 -->
				<image :src="item.cover" mode="widthFix" style="height: 150upx;width: 150upx;" class="border border-light-secondary rounded p-2 flex-shrink"></image>
				<!-- 商品属性 -->
				<view class="flex-1 d-flex flex-column pl-2">
					<view class="text-dark" style="font-size: 35upx;">{{ item.title }}</view>

					<view class="d-flex text-light-muted mb-1 px-1" :class="isedit ? 'p-1 bg-light-secondary mb-2' : ''" @tap.stop="doShowPopup(index)">
						<text class="mr-1" v-for="(attr, attrindex) in item.attrs" :key="attrindex">{{ attr.list[attr.selected].name }}</text>
						<view v-show="isedit" class="iconfont icon-bottom font ml-auto"></view>
					</view>

					<view class="mt-auto d-flex j-sb">
						<price>{{ item.pprice }}</price>
						<view class="a-self-end"><uni-number-box :min="item.minnum" :value="item.num" :max="item.maxnum" @change="changeNum($event, item, index)"></uni-number-box></view>
					</view>
				</view>
			</view>
		</view>

		<!-- 合计 -->
		<view
			class="d-flex a-center position-fixed left-0 right-0  border-top bg-light-secondary a-stretch"
			style="height: 100upx;z-index: 100;bottom: var(--window-bottom,0); z-index: 1000;"
		>
			<label class="radio d-flex a-center j-center flex-shrink" style="width: 120upx;" @click="doSelectAll">
				<radio color="#FD6801" :checked="checkedAll" :disabled="disableSelectAll" />
			</label>
			<template v-if="!isedit">
				<view class="flex-1 d-flex a-center j-center font-md">
					合计
					<price>{{ totalPrice }}</price>
				</view>
				<view class="flex-1 d-flex a-center j-center main-bg-color text-white font-md" hover-class="main-bg-hover-color" style="height: 100%;">结算</view>
			</template>
			<!-- 编辑状态的合计 -->
			<template v-else>
				<view class="flex-1 d-flex a-center j-center font-md main-bg-color text-white" hover-class="main-bg-hover-color" style="height: 100%;">移入收藏</view>
				<view class="flex-1 d-flex a-center j-center bg-danger text-white font-md" hover-class="main-bg-hover-color" style="height: 100%;" @tap="doDelGoods">删除</view>
			</template>
		</view>

		<!-- 弹出商品属性筛选框 -->
		<common-popup :popupClass="popupShow" @hide="doHidePopup">
			<!-- 商品图片和信息 -->
			<view class="d-flex a-center" style="height: 275rpx;">
				<image src="../../static/images/demo/list/1.jpg" mode="widthFix" style="width: 180rpx; height:180rpx" class="border rounded"></image>
				<view class="pl-2">
					<price priceSize="font-lg" unitSize="font">2299</price>
					<view class="d-block mt-2">
						<text class="mr-1" v-for="(attr, attrindex) in popupData.attrs" :key="attrindex">{{ attr.list[attr.selected].name }}</text>
					</view>
				</view>
			</view>
			<!-- 表单 -->
			<scroll-view scroll-y="true" class="w-100" style="height: 760rpx;">
				<card :headTitle="item.title" headTitleWidth="false" :headBorderButtom="false" v-for="(item, index) in popupData.attrs" :key="index">
					<uradio-group :label="item" :selected.sync="item.selected"></uradio-group>
				</card>
				<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
					<text>购买数量</text>
					<uni-number-box :min="1" :value="popupData.num" @change="popupData.num = $event"></uni-number-box>
				</view>
			</scroll-view>

			<!-- 按钮 -->
			<view
				class="d-flex a-center j-center main-bg-color text-white font-md "
				style="height: 100rpx;margin-left: -30rpx;margin-right:-30rpx;"
				hover-class="main-bg-hover-color"
				@tap.stop="doHidePopup"
			>
				确定
			</view>
		</common-popup>
	</view>
</template>

<script>
import price from '@/components/common/price.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import card from '@/components/common/card.vue';
import uradioGroup from '@/components/common/radio-group.vue';
import commonPopup from '@/components/common/common-popup.vue';
export default {
	components: {
		price,
		card,
		uradioGroup,
		commonPopup
	},
	data() {
		return {
			isedit: false
		};
	},
	methods: {
		...mapActions(['doSelectAll', 'doDelGoods', 'doShowPopup', 'doHidePopup']),
		...mapMutations(['selectItem']),
		changeNum(e, item, index) {
			item.num = e;
		}
	},
	computed: {
		...mapState({
			list: state => state.cart.list,
			popupShow: state => state.cart.popupShow
		}),
		...mapGetters(['checkedAll', 'totalPrice', 'disableSelectAll', 'popupData'])
	}
};
</script>

<style></style>
