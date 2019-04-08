/*
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * DEBUG: debug状态
 */
let baseUrl = '';
let DEBUG = false;
if (process.env.NODE_ENV == 'development') {
	baseUrl = "http://192.168.1.177:9014";
	DEBUG = true;
} else if (process.env.NODE_ENV == 'testing') {
	baseUrl = "http://192.168.1.173:9014";
	DEBUG = false;
} else if (process.env.NODE_ENV == 'production') {
	baseUrl = "http://192.168.1.174:9014";
	DEBUG = false;
}
export {
	baseUrl,
	DEBUG
}
