/**
 * Created by lx442 on 2018/12/26.
 */
import axios from '../lib/request'

// 小程序运营切换店铺列表
export const getShopList = (params) => {
	return axios.request({
		url: '/manager/mini/shopList',
		data: params,
		method: 'post'
	})
}

// 促销管理列表(促销)
export const getshopPromotion = (params) => {
	return axios.request({
		url: '/manager/mini/shopPromotion',
		data: params,
		method: 'post'
	})
}

// 过期或0库存菜价管理列表
export const getExpiredManagement = (params) => {
	return axios.request({
		url: '/manager/mini/outDateVegetables',
		data: params,
		method: 'post'
	})
}

// 查询店铺列表及状态(设置品类)
export const getfindShopNameAndStatus = (params) => {
	return axios.request({
		url: '/manager/mini/findShopNameAndStatus',
		data: params,
		method: 'post'
	})
}

// 获取上次操作店铺id
export const gethistoryShop = (params) => {
	return axios.request({
		url: '/manager/mini/historyShop',
		data: params,
		method: 'post'
	})
}

// 平台商品品类列表
export const getgoodsType = (params) => {
	return axios.request({
		url: '/manager/mini/goodsType',
		data: params,
		method: 'post'
	})
}

// 保存最后操作店铺
export const getsaveHistoryShop = (params) => {
	return axios.request({
		url: '/manager/mini/saveHistoryShop',
		data: params,
		method: 'post'
	})
}

// 保存菜价管理上下架
export const getsaveVegetable = (params) => {
	return axios.request({
		url: '/manager/mini/saveVegetable',
		data: params,
		method: 'post'
	})
}

// 保存促销管理上下架(促销)
export const getsavePromotion = (params) => {
	return axios.request({
		url: '/manager/mini/savePromotion',
		data: params,
		method: 'post'
	})
}

// 查询过期或0库存促销商品信息列表(促销)
export const getoutDatePromotion = (params) => {
	return axios.request({
		url: '/manager/mini/outDatePromotion',
		data: params,
		method: 'post'
	})
}

// 保存商品品类下拉
export const getsaveShopRanks = (params) => {
	return axios.request({
		url: '/manager/mini/saveShopRanks',
		data: params,
		method: 'post'
	})
}

// 菜价管理列表 1上架 2下架 不传为待发布
export const getshopVegetables = (params) => {
	return axios.request({
		url: '/manager/mini/shopVegetables',
		data: params,
		method: 'post'
	})
}

// 查询店铺自己的商品分类
export const getfindCategory = (params) => {
	return axios.request({
		url: '/manager/mini/findCategory',
		data: params,
		method: 'post'
	})
}

// 店铺商品品类下拉
export const getshopRanks = (params) => {
	return axios.request({
		url: '/manager/mini/shopRanks',
		data: params,
		method: 'post'
	})
}


// 查询店铺最后一级分类信息
export const findLastCategory = (params) => {
	return axios.request({
		url: '/manager/mini/findLastCategory',
		data: params,
		method: 'post'
	})
}
