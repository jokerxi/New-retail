/*
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * DEBUG: debug状态 
 */
let baseUrl = '';
let DEBUG = false;
// console.log(process.env.NODE_ENV,555)
if (process.env.NODE_ENV == 'development') {
  // baseUrl = "http://192.168.1.176:9016/shopclient";
  baseUrl = "http://192.168.1.65:9016/shopclient";
  DEBUG = true;
}else if(process.env.NODE_ENV == 'testing'){
  baseUrl = "http://192.168.1.173:9016/shopclient";
  DEBUG = false;
}else if(process.env.NODE_ENV == 'production'){
  baseUrl = "http://192.168.1.174:9016/shopclient";
  DEBUG = false;
}
export {
  baseUrl,
  DEBUG
}
