<template>
	<view class="card">
		
		<view v-if="showhead" class="p-2 main-border-color"
		:class="getHeadClass">
			<slot name="title">
					<text v-if="headTitle" class="font-md"
					:class="headTitleWidth ?'font-weight': ''">{{headTitle}}</text>
			</slot>
		</view>
		
	  <view :class="getBodyClass">
			<image v-if="bodyCover"
			       :src="bodyCover" 
			       mode="widthFix"></image>
			<slot></slot>			 
		</view>
		
	</view>
</template>

<script>
	export default{
		props:{
			headTitle:String,
			bodyCover:String,
			//是否显示头部
			showhead:{
				type:Boolean,
				default:true
			},
			//是否显示下边线
			headBorderButtom:{
				type:Boolean,
				default:true
			},
			//是否给body加padding
			bodyPadding:{
				type:Boolean,
				default:false
			},
			// 标题是否加粗
			headTitleWidth:{
				typr:Boolean,
				default:true
			}
		},
		computed:{
			getHeadClass(){
				return {'border-bottom' : this.headBorderButtom}
			},
			getBodyClass(){
				return {'p-1' : this.bodyPadding}
			}
		}
	}
</script>

<style>
</style>