export default {
	state:{
		list:[
			{  
				checked:false,
				id:"5",
				title:"Xiaomi Civi 1S",
				cover:"https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1660632408.13672547.png",
				attrs:[
					{
						title:"颜色",
						selected:0,
						list:[
							{name:'奶眼白'},
							{name:'时光蓝'},
							{name:'原子黑'},
						]
					},
				{
					title:"容量",
					selected:0,
					list:[
						{name:'128G'},
						{name:'256G'},
						{name:'512G'},
					]
				},
				{
					title:"套餐",
					selected:0,
					list:[
						{name:'官方标配'},
						{name:'套餐一'},
						{name:'套餐二'},
					]
				},
				],
				pprice:2999,
				num:1,
				minnum:1,
				maxnum:100
			}
			
		],
		// 选中列表
		selectedList:[],
		// popup显示
		popupShow:'none',
		popupIndex:-1
	},
	getters:{
		// 判断是否全选
		checkedAll:(state) =>{
			if(state.list.length === 0){
				return false
			}
			else{
				return state.list.length === state.selectedList.length
			}
		  
		},
		//合计
		totalPrice:(state) =>{
			var total = 0
			state.list.forEach(v =>{
				if(state.selectedList.indexOf(v.id) > -1){
					total += v.pprice * v.num
				}
			})
			return total
		},
		// 禁用全选
		disableSelectAll:(state) =>{
			return state.list.length === 0 
		},
		// 拿到当前需要修改属性的商品
		popupData:(state) =>{
			return state.popupIndex > -1 ? state.list[state.popupIndex] : {}
		}
		
	},
	mutations:{
		// 单个选中/取消
		selectItem(state,index){
			let id = state.list[index].id
			let i = state.selectedList.indexOf(id)
			// 选中时取消
			if(i > -1){
				state.list[index].checked = false
			  return state.selectedList.splice(i,1)
			}
			// 选中
			state.list[index].checked = true
			state.selectedList.push(id)
		},
		// 全选
		selectAll(state){
			state.selectedList = state.list.map(v =>{
				// 设置选中状态
				v.checked = true
				return v.id
			})
			// console.log(state.selectedList);
		},
		// 取消全选
		unSelectAll(state){
			state.list.forEach(v =>{
				// 取消选中状态
				v.checked = false
			})
			state.selectedList = []
		},
		// 删除选中
		delGoods(state){
			state.list = state.list.filter(v =>{
				return state.selectedList.indexOf(v.id) === -1 
			})
		},
		// 初始化popupIndex
		initPopupIndex(state,index){
			state.popupIndex = index
		},
		// 加入购物车
		addGoodsToCart(state,goods){
			state.list.unshift(goods)
		}
	},
	actions:{
		// 判断全选
		doSelectAll({commit,getters}){
			getters.checkedAll ? commit('unSelectAll') : commit('selectAll')
		},
		// 删除选中商品
		doDelGoods({commit}){
			uni.showModal({
				content:'是否删除选中',
				success: (res) => {
					if(res.confirm){
						commit('delGoods')
						uni.showToast({
							title: '删除成功'
						});
					}
				}
			})
		},
		// 弹出框显示
		doShowPopup({state,commit},index){
			commit('initPopupIndex',index)
			state.popupShow = 'show'
			
		},
		// 弹出框隐藏
		doHidePopup({state,commit},index){
			state.popupShow = 'hide'
			setTimeout(() =>{
				state.popupShow = 'none'
				commit('initPopupIndex',index)
			},200)
		}
	},
}