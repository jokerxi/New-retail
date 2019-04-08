/**
 * Created by lx442 on 2018/12/21.
 */
import axios from '../lib/request'

// 整体看板实时概况
export const RealTimeSituation = (params) => {
	return axios.request({
		url: '/manager/login/login',
		data: params,
		method: 'post'
	})
}
