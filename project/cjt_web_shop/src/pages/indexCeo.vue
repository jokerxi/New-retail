<template>
	<div class="Wrap" :class="{'uncollasp': Number(Code) !== 1}">
		<!--CEO后台首页页面-->
		<!--<shopNavs class="navWrap"></shopNavs>-->
		<!--顶部tab-->
		<div class="navWrap">
			<div class="outbox">
				<div>
					店铺概况
				</div>
				<div class="tabs">
					<div v-for="(item,index) in tabTitle" :key="index" class="tab" :class="{'tabActive' : current === index}" @click="chooseTab(item.date,index)">
						<span>{{item.msg}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="navWrap_box"></div>
		<!--中部-->
		<div class="outBox">
			<!--一行-->
			<div class="formBox1">
				<!--今日销售额-->
				<div class="form1">
					<div class="form1Title font14">
						<div>
							<span class="verticalLine"></span>
							<span class="bold font16">今日销售额</span>
						</div>
						<div>
							<span>去年今日 ￥{{lastYearTotalMoney}}</span>
						</div>
					</div>
					<div class="box_shadow">
						<div class="form1Msg">
							<div class="font26 bold">
								<span>￥{{totalMoney}}</span>
							</div>
							<div class="font14">
								<span class="bold" >{{salesvolumeGain}} </span><span class="bold" :class="salesvolumeGain == '上升'? 'sheng':'jiang'">{{compareTotalMoneyPercent}}%</span><i
                 :class="salesvolumeGain=='上升'?'iconfont icon-shangshengicon':'iconfont icon-xiajiangicon'"></i>
							</div>
							<div>
								<span class="bold">昨天 ￥{{compareTotalMoney}}</span>
							</div>
						</div>
						<div id="main1"></div>
					</div>
				</div>
				<!--今日销售量-->
				<div class="form2">
					<div class="form2Title font14">
						<div>
							<span class="verticalLine"></span>
							<span class="bold font16">今日销售量</span>
						</div>
						<div>
							<span>去年今日 {{lastYearTotalNum}} 笔</span>
						</div>
					</div>
					<div class="box_shadow">
						<div class="form2Msg">
							<div class="font26 bold">
								<span>{{totalNum}} 笔</span>
							</div>
							<div class="font14">
								<span class="bold" >{{salesnumberGain}} </span><span class="bold" :class="salesnumberGain == '上升'? 'sheng':'jiang'">{{compareTotalNumPercent}}%</span><i
                 :class="salesnumberGain=='上升'?'iconfont icon-shangshengicon':'iconfont icon-xiajiangicon'"></i>
							</div>
							<div>
								<span class="bold">昨天 {{compareTotalNum}} 笔</span>
							</div>
						</div>
						<div id="main2"></div>
					</div>
				</div>
				<!--今日客单价-->
				<div class="form3">
					<div class="font14">
						<span class="verticalLine"></span>
						<span class="bold font16">今日客单价</span>
					</div>
					<div class="spanStyle box_shadow">
						<div>
							<div class="font26 bold"><span>￥</span><span>{{perPrice}}</span></div>
							<div>&nbsp;
								<span class="bold" >{{passengerflowGain}} </span><span class="bold" :class="passengerflowGain == '上升'? 'sheng':'jiang'">{{comparePerPricePercent}}%</span><i
                 :class="passengerflowGain=='上升'?'iconfont icon-shangshengicon':'iconfont icon-xiajiangicon'"></i>
							</div>
						</div>
						<div class="font16" style="text-align: left">
							<div>
								<span class="bold">昨日</span>
							</div>
							<div>
								<span>￥</span><span>{{comparePerPrice}}</span>
							</div>
						</div>
					</div>
					<div class="box_shadow">
						<div class="font16 oldPrice" style="text-align: left">
							<span class="bold">去年今日:</span>&nbsp;<span>￥</span><span>{{lastYearPerPrice}}</span>
						</div>
					</div>
				</div>
			</div>
			<!--二行-->
			<div class="formBox2">
				<div>
					<span class="verticalLine"></span>
					<span class="font16">一级品类销售占比</span>
				</div>
				<!--<div class="border radius">-->
				<div class="tabNav font12">
					<div v-for="(item,index) in tabs" :key="index" :class="'tabss'+(index+1)" @click="getFirstCategoryPercent(date,index+1)">
						<span>{{item.tabTitle}}</span>
					</div>
				</div>
				<div id="main3"></div>
				<!--</div>-->
			</div>
		</div>
		<!--下部表格-->
		<div class="outBox">
			<div class="top50Box">
				<!--左-->
				<div class="leftBox">
					<div class="top50Title">
						<span class="verticalLine"></span>
						<span class="font16">商品Top50排行</span>
					</div>
					<div class="radius border" style="overflow: hidden">
						<!--表头tab-->
						<div class="top50Taboutbox">
							<div class="top50Tab font12">
								<span v-for="(item,index) in top50Tab" :key="index" :class="'top50Tab'+(index+1)"
                @click="getSecondOrGoodsOrder(current+1,1,index+1)">{{item.msg}}</span>
							</div>
						</div>
						<!--表格-->
						<div style="background-color: white">
							<div class="my_top50left">
								<el-table :data="commodityList" style="width: 100%">
									<el-table-column type="index" label="序号" align="center">
									</el-table-column>
									<el-table-column prop="orderName" label="商品名" align="center">
									</el-table-column>
									<el-table-column prop="saleMoney" label="销售额" align="center">
									</el-table-column>
									<el-table-column prop="saleNum" label="销量" align="center">
									</el-table-column>
									<el-table-column prop="saleMoneyPercent" label="销售量占比" align="center">
									</el-table-column>
								</el-table>
							</div>
						</div>
					</div>
				</div>
				<!--右-->
				<div class="rightBox">
					<div class="top50Title">
						<span class="verticalLine"></span>
						<span class="font16">二级品类Top50排行</span>
					</div>
					<div class="radius border" style="overflow: hidden">
						<!--表头tab-->
						<div class="top50Taboutbox">
							<div class="top50Tab font12">
								<span v-for="(item,index) in top50Tab" :key="index" :class="'top50TabB'+(index+1)"
                @click="getSecondOrGoodsOrder(current+1,2,index+1)">{{item.msg}}</span>
							</div>
						</div>
						<!--表格-->
						<div style="background-color: white">
							<div class="my_top50right">
								<el-table :data="secondList" style="width: 100%">
									<el-table-column type="index" label="序号" align="center">
									</el-table-column>
									<el-table-column prop="orderName" label="品类名" align="center">
									</el-table-column>
									<el-table-column prop="saleMoney" label="销售额" align="center">
									</el-table-column>
									<el-table-column prop="saleNum" label="销量" align="center">
									</el-table-column>
									<el-table-column prop="saleMoneyPercent" label="销售量占比" align="center">
									</el-table-column>
								</el-table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { webDataOverview, firstCategoryPercent, secondOrGoodsOrder } from '../api/analyse'

var echarts = require('echarts')
export default {
	name: "index-ceo",
	data() {
		return {
			salesvolumeGain: "", //销售额涨幅
			salesnumberGain: "", //销售量涨幅
			passengerflowGain: "", // 客流量涨幅
			totalMoney: '', // 总销售额
			lastYearTotalMoney: '', //去年同时段销售额
			compareTotalMoney: '', //对比时间销售额
			compareTotalMoneyPercent: '', //对比时间销售额上升幅度
			lastYearTotalNum: '', //去年同时段销售量
			totalNum: '', //总销售量
			compareTotalNum: '', //对比时间销售量
			compareTotalNumPercent: '', //对比时间销售量上升幅度
			perPrice: '', //客单价
			lastYearPerPrice: '', //去年同时段客单价
			comparePerPrice: '', //对比时间客单价
			comparePerPricePercent: '', //对比时间客单价上升百分比
			date: '1',
			tabTitle: [{ msg: '今天', date: "1" }, {

				msg: '昨天',
				date: "2"
			}, {
				msg: '10月9日',
				date: "3"
			}, {
				msg: '10月8日',
				date: "4"
			}, {
				msg: '本月',
				date: "7"
			}, {
				msg: '上月',
				date: "8"
			}, {
				msg: '整体',
				date: "12"
			}],
			current: 0,
			tabs: [
				{ tabTitle: '销售额' }, { tabTitle: '销售量' }
			],
			top50Tab: [
				{ msg: '按销售额排' }, { msg: '按销售量排' }
			],
			//商品50
			commodityList: [],
			//二级50
			secondList: [],
			//今日eachats数据
			offlineMoney: '', //线下支付销售额,
			followMoney: '', //微信关注销售额
			notFollowMoney: '', //微信未关注销售额
			alipayMoney: '', //支付宝销售额
			offlineNum: '', //线下支付销售量
			followNum: '', //微信关注销售量
			notFollowNum: '', //微信未关注销售量
			alipayNum: '', //支付宝销售量
			// 一级品类eachats
			categoryName: [], //商品名称
			saleNum: [], //销售额、销售量
		}
	},
	// 监听数据
	watch: {
		'offlineMoney': {
			handler: function() { //特别注意，不能用箭头函数，箭头函数，this指向全局
				this.showEcharts()
			},
			deep: true //深度监听
		},
		'categoryName': {
			handler: function() {
				this.showEcharts()
			}
		},
		'saleNum': {
			handler: function() {
				this.showEcharts()
				console.log("我是监听三")
			}
		}
	},
	created() {
		// location.reload()
		this.getWebDataOverview(1)
		this.getFirstCategoryPercent(1, 1)
		this.getSecondOrGoodsOrder(1, 1, 1)
		this.getSecondOrGoodsOrder(1, 2, 1)
	},
	mounted() {

	},
	computed: {
		Code() {
			return this.$store.state.code
		}
	},
	methods: {
		//切换顶部tab
		chooseTab(date, index) {
			this.current = index;
			this.date = date
			this.getWebDataOverview(date)
			this.getFirstCategoryPercent(date, 1)
			this.getSecondOrGoodsOrder(date, 1, 1)
			this.getSecondOrGoodsOrder(date, 2, 1)
		},
		//  获取概况
		getWebDataOverview(dateType) {
			let params = {
				cjtId: 101,
				dateType: dateType
			}
			// console.log(params,'getWebDataOverview')
			return new Promise(() => {
				webDataOverview(params)
					.then(res => {
						console.log(res, 'getWebDataOverview')
						if (res.data.success == true) {
							// console.log(res.data.data, 'getWebDataOverview')
							//接口逻辑写这里
							console.log(res, "我是获取概况")
							this.totalMoney = res.data.data.totalMoney
							this.lastYearTotalMoney = res.data.data.lastYearTotalMoney
							this.compareTotalMoney = res.data.data.compareTotalMoney
							this.compareTotalMoneyPercent = res.data.data.compareTotalMoneyPercent
							if (this.compareTotalMoneyPercent > 0) {
								this.salesvolumeGain = "上升"
							} else {
								this.salesvolumeGain = "下降"
							}
							this.totalNum = res.data.data.totalNum
							this.lastYearTotalNum = res.data.data.lastYearTotalNum
							this.compareTotalNum = res.data.data.compareTotalNum
							this.compareTotalNumPercent = res.data.data.compareTotalNumPercent
							if (this.compareTotalNumPercent > 0) {
								this.salesnumberGain = "上升"
							} else {
								this.salesnumberGain = "下降"
							}
							this.perPrice = res.data.data.perPrice
							this.lastYearPerPrice = res.data.data.lastYearPerPrice
							this.comparePerPrice = res.data.data.comparePerPrice
							this.comparePerPricePercent = res.data.data.comparePerPricePercent
							if (this.comparePerPricePercent > 0) {
								this.passengerflowGain = "上升"
							} else {
								this.passengerflowGain = "下降"
							}
							this.offlineMoney = res.data.data.offlineMoney
							this.followMoney = res.data.data.followMoney
							this.notFollowMoney = res.data.data.notFollowMoney
							this.alipayMoney = res.data.data.alipayMoney
							this.offlineNum = res.data.data.offlineNum
							this.followNum = res.data.data.followNum
							this.notFollowNum = res.data.data.notFollowNum
							this.alipayNum = res.data.data.alipayNum
						} else {
							// console.log(res, 'getWebDataOverview')
							this.$message({
								type: 'warning',
								message: res.data.msg,
								center: true,
								showClose: true,
							})
						}
					})
					.catch(err => {
						console.log(err)
						this.$message({
							type: 'error',
							message: '出错啦！请检查网络后重试！',
							center: true,
							showClose: true,
						})
					})
			})
		},
		//  获取一级销售
		getFirstCategoryPercent(dateType, orderType) {
			let params = {
				cjtId: 101,
				dateType: dateType,
				orderType: orderType
			}
			console.log(params, 'getFirstCategoryPercent')
			return new Promise(() => {
				firstCategoryPercent(params)
					.then(res => {
						// console.log(res, 'getFirstCategoryPercent')
						if (res.data.success == true) {
							//接口逻辑写这里
							this.saleNum = []
							this.categoryName = []
							for (var i = res.data.data.length - 1; i >= 0; i--) {
								this.categoryName.push(res.data.data[i].categoryName) // 商品类别
								this.saleNum.push({
									value: res.data.data[i].saleNum,
									name: res.data.data[i].saleNum
								})
							}
							//更改激活样式
							var myNode
							for (var i = 0; i < this.tabs.length; i++) {
								myNode = document.getElementsByClassName("tabss" + (i + 1))[0]
								// console.log(myNode, '仅供参考')
								myNode.style.color = '#999999'
								myNode.style.borderBottom = '0.015rem solid rgba(68, 132, 254, 0)'
							}
							myNode = document.getElementsByClassName("tabss" + orderType)[0]
							myNode.style.color = '#333333'
							myNode.style.borderBottom = '0.015rem solid rgba(68, 132, 254, 1)'
						} else {
							console.log(res, 'getFirstCategoryPercent')
							this.$message({
								type: 'warning',
								message: res.data.msg,
								center: true,
								showClose: true,
							})
						}
					})
					.catch(err => {
						console.log(err)
						this.$message({
							type: 'error',
							message: '出错啦！请检查网络后重试！',
							center: true,
							showClose: true,
						})
					})
			})
		},
		//  获取商品排行
		getSecondOrGoodsOrder(dateType, queryType, orderType) {
			let params = {
				cjtId: 101,
				dateType: dateType,
				queryType: queryType,
				orderType: orderType
			}
			// console.log(params, 'getSecondOrGoodsOrder')
			return new Promise(() => {
				secondOrGoodsOrder(params)
					.then(res => {
						// console.log(res, 'getSecondOrGoodsOrder')
						if (res.data.success == true) {
							if (queryType == 1) {
								this.commodityList = []
								res.data.data.forEach(t => {
									if (t.saleMoneyPercent != '') {
										t.saleMoneyPercent += '%'
									}
									this.commodityList.push(t)
								})
								let x
								for (var i = 0; i < this.top50Tab.length; i++) {
									x = document.querySelectorAll('.top50Tab' + (i + 1))[0]
									// console.log('开始了', x)
									x.style.borderBottom = '0.02rem solid rgba(68, 132, 254, 0)'
									x.style.color = '#999999'
								}
								x = document.querySelectorAll('.top50Tab' + orderType)[0]
								x.style.borderBottom = '0.02rem solid rgba(68, 132, 254, 1)'
								x.style.color = '#333333'
							} else if (queryType == 2) {
								this.secondList = []
								res.data.data.forEach(t => {
									if (t.saleMoneyPercent) {
										t.saleMoneyPercent += '%'
									}
									this.secondList.push(t)
								})
								let x
								for (var i = 0; i < this.top50Tab.length; i++) {
									x = document.querySelectorAll('.top50TabB' + (i + 1))[0]
									// console.log('开始了', x)
									x.style.borderBottom = '0.02rem solid rgba(68, 132, 254, 0)'
									x.style.color = '#999999'
								}
								x = document.querySelectorAll('.top50TabB' + orderType)[0]
								x.style.borderBottom = '0.02rem solid rgba(68, 132, 254, 1)'
								x.style.color = '#333333'
							}
						} else {
							console.log(res, 'getSecondOrGoodsOrder')
							this.$message({
								type: 'warning',
								message: res.data.msg,
								center: true,
								showClose: true,
							})
						}
					})
					.catch(err => {
						console.log(err)
						this.$message({
							type: 'error',
							message: '出错啦！请检查网络后重试！',
							center: true,
							showClose: true,
						})
					})
			})
		},
		showEcharts() {
			//一级数据
			var testNum = this.saleNum
			// [
			// { value: 310, name: '￥1233.12' },
			// { value: 234, name: '￥1233.12' },
			// { value: 135, name: '￥1233.12' },
			// { value: 335, name: '￥1233.12' },
			// { value: 310, name: '￥1233.12' },
			// { value: 234, name: '￥1233.12' },
			// { value: 135, name: '￥1233.12' },
			// { value: 335, name: '￥1233.12' }
			// ]

			var sum = 0
			for (var x in testNum) {
				sum += testNum[x].value
			}
			var myChart1 = echarts.init(document.getElementById('main1'))
			var myChart2 = echarts.init(document.getElementById('main2'))
			var myChart3 = echarts.init(document.getElementById('main3'))
			var option1 = {
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				// calculable : true,
				color: ['#00D1E2', '#00E28B', '#FFB50D', '#0061E2'],
				// 如果指示线或者指示文字没有特殊给颜色那么会默认继承对应的颜色
				series: [{
					name: '访问来源',
					type: 'pie',
					radius: '50%',
					center: ['50%', '50%'], //饼图在外框中的相对中心位置
					labelLine: {
						normal: {
							length: 50,
							length2: 50,
							lineStyle: {
								// color: "gray" // 此处可以更改指示线的颜色
							}
						}
					},
					label: {
						normal: {
							// a代表大标题，b代表对应展示的内容标题，c代表具体数值，d代表百分比例
							formatter: '{b}{d}%\n\n￥{c}',
							borderWidth: 20,
							borderRadius: 4,
							color: '#000',
							// shadowBlur:3,
							// shadowOffsetX: 2,
							// shadowOffsetY: 2,
							// shadowColor: '#999',
							padding: [0, -50],
							rich: {
								a: {
									// color: 'orange', // 改变对应提示文字的颜色
									fontSize: 12,
									lineHeight: 20
								},
								b: {
									fontSize: 12,
									lineHeight: 20,
									// color: 'black' // 改变对应提示文字的颜色
								}

							}
						}
					},

					data: [
						{ value: this.alipayMoney, name: '支付宝' },
						{ value: this.notFollowMoney, name: '微信未关注' },
						{ value: this.followMoney, name: '微信关注' },
						{ value: this.offlineMoney, name: '线下' }
					]
				}]
			};
			var option2 = {
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				// calculable : true,
				color: ['#00D1E2', '#00E28B', '#FFB50D', '#0061E2'],
				// 如果指示线或者指示文字没有特殊给颜色那么会默认继承对应的颜色
				series: [{
					name: '访问来源',
					type: 'pie',
					radius: '50%',
					center: ['50%', '50%'], //饼图在外框中的相对中心位置
					labelLine: {
						normal: {
							length: 50,
							length2: 50,
							lineStyle: {
								// color: "gray" // 此处可以更改指示线的颜色
							}
						}
					},
					label: {
						normal: {
							// a代表大标题，b代表对应展示的内容标题，c代表具体数值，d代表百分比例
							formatter: '{b}{d}%\n\n￥{c}',
							borderWidth: 20,
							borderRadius: 4,
							color: '#000',
							// shadowBlur:3,
							// shadowOffsetX: 2,
							// shadowOffsetY: 2,
							// shadowColor: '#999',
							padding: [0, -50],
							rich: {
								a: {
									// color: 'orange', // 改变对应提示文字的颜色
									fontSize: 12,
									lineHeight: 20
								},
								b: {
									fontSize: 12,
									lineHeight: 20,
									// color: 'black' // 改变对应提示文字的颜色
								}

							}
						}
					},

					data: [
						{ value: this.alipayNum, name: '支付宝' },
						{ value: this.notFollowNum, name: '微信未关注' },
						{ value: this.followNum, name: '微信关注' },
						{ value: this.offlineNum, name: '线下' }
					]
				}]
			};
			var option3 = {
				color: ['#0B85FF'],
				tooltip: {
					show: false,
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					data: this.categoryName,
					axisLine: {
						show: true,
						lineStyle: {
							color: '#E7EEEF',
							width: '1'
						}
					},
					axisTick: {
						show: false

					},
					axisLabel: {
						fontSize: 14,
						fontWeight: 'bold',
						interval: 0,
						textStyle: {
							color: '#333'
						}

					}
					// show:false

				}],
				yAxis: [{
					axisLabel: {
						//隐藏y轴线上的数值，（formatter后面跟的是方法，那么y轴上的值由方法返回的值决定）
						formatter: function() {
							return "";
						}
					},
					type: 'value',
					axisTick: {
						//y轴线上的刻度线显示或者隐藏
						show: false
					},
					// y 轴线
					axisLine: {
						// y 轴线显示或者隐藏
						show: false,
					},
					splitLine: {
						show: true,
						// interval:'auto',
						lineStyle: {
							color: ['#F5F5F5'],
							width: 1,
							type: 'dashed'
						}
					}
				}],
				series: [{
					name: '直接访问',
					type: 'bar',
					barWidth: '45%',
					data: testNum,
					itemStyle: {
						normal: {
							label: {
								show: true,
								position: 'top',
								distance: 6, // 字体上下移动相应距离
								textStyle: {
									color: '#636061',
									fontSize: 14,
									fontWeight: 'bold'
								},
								// 以下重点技术需要关注，此处解决了一般柱状图无法显示数值对应的百分比数据
								formatter: function(params) {
									// return  (params.value/sum)*100 + '%';

									// return params.seriesName + '\n' + Math.round((params.value / sum) * 1000) / 10 + '%';

									return params.data.name + '\n' + Math.round((params.data.value / sum) * 1000) / 10 + '%';
								},
							},
							// 以下的color是可以单独控制每一个柱状图的颜色样式
							// color: function (params) {
							//   var colorList = ['#ff7e50', '#333333', '#ff7e50', '#999999', '#ff7e50', '#ff7e50', '#ff7e50', '#ff7e50']
							//   return colorList[params.dataIndex]
							// }
						}
					}
				}]
			};
			myChart1.setOption(option1)
			myChart2.setOption(option2)
			myChart3.setOption(option3)
			window.addEventListener('resize', function() {
				setTimeout(function() {
					myChart1.resize()
					myChart2.resize()
					myChart3.resize()
				}, 100)
			})
		}
	}
}

</script>
<style scoped>
.outbox {
	/*border-bottom:1px solid rgba(235,235,235,1);*/
	width: 100%;
	padding-top: 0.28rem;
	padding-bottom: 0.18rem;
	background-color: white;
	box-sizing: border-box;
}

.outbox>div:first-child {
	text-align: left;
	padding-left: 0.2rem;
	font-size: 0.18rem;
	font-weight: bold;
}

.tabs {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	margin-top: 0.14rem;
}

.tab {
	border: 1px solid rgba(235, 235, 235, 1);
	padding: 0.05rem 0.2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 20px;
	background-color: #fff;
	color: #333333;
	font-size: 0.12rem;
	margin-left: 0.1rem;
	cursor: pointer;
}

.tabActive {
	background-color: rgba(68, 113, 254, 1);
	color: #fff;
	border-color: transparent;
	/* margin-left: 0.2rem; */

}


.BoxContainer .uncollasp .navWrap {
	position: fixed;
	/*top: 80px;*/
	z-index: 11;
	border-left: 1px #E7EEEF solid;
	width: 100%;
	box-shadow: 0 4px 10px rgba(0, 0, 0, .02);
	padding-left: 0;
	background-color: #fff;
	border-bottom: 1px #E7EEEF solid;
}

.navWrap_box {
	height: 1.23rem;
	min-height: 92px;
}


.outBox {
	/*background-color: rgba(238, 238, 238, 1);*/
	background-color: #F5F5F5;
}

/*引用的阿里图标样式调整*/
.icon-shangshengicon,
.sheng {
	color: rgba(123, 211, 27, 1);
}

.icon-xiajiangicon,
.jiang {
	color: rgba(255, 116, 116, 1);
}

/*  以下为第一行饼图的综合样式  */

.formBox1 {
	/*border:1px solid blue;*/
	width: 16.15rem;
	min-width: 1160px;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
}

.form1,
.form2 {
	/*border: 1px solid green;*/
	width: 6rem;
	min-width: 427px;
}

.form2 {
	margin: 0 0.2rem;
}

.form3 {
	width: 4rem;
	min-width: 277px;
	/*border: 1px solid blue;*/
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}

/*main1,main2是对应具体两个饼图的挂载外框*/
#main1,
#main2 {
	width: 5.886rem;
	min-width: 427px;
	height: 2.3rem;
	/*border: 1px solid red;*/
	border-radius: 0 0 4px 4px;
	margin: 0 auto;
	background-color: white;
}

.box_shadow {
	border: 1px solid #E7EEEF;
	border-radius: 4px;
	overflow: hidden;
}

.box_shadow:hover {
	box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
	margin-top: -2px;
	border-color: transparent;
}

#main3 {
	width: calc(100% - 0.4rem);
	height: 4rem;
	border-bottom: 1px solid #F5F5F5;
	border-top: 1px solid #F5F5F5;
	background-color: white;
	margin: 0 auto;
}

.form1Title,
.form2Title {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.verticalLine {
	border-left: 4px solid rgba(68, 132, 254, 1);
	/*border: 4px solid rgba(68, 132, 254, 1);*/
	height: 0.14rem;
	padding-left: 0.05rem;
	display: inline-block;
}

.form1Msg,
.form2Msg {
	/*border: 1px solid blue;*/
	border-radius: 4px 4px 0 0;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: baseline;
	padding-top: 0.2rem;
	background-color: white;
}

.form1Title,
.form2Title {
	/*border:1px solid red;*/
	padding-top: 0.2rem;
	padding-bottom: 0.13rem;
}

.form3>div:first-child {
	text-align: left;
	/*border:1px solid red;*/
	padding-top: 0.2rem;
	padding-bottom: 0.13rem;
	width: 100%;
}

.form3>div:nth-child(2) {
	/*border:1px solid blue;*/
	display: flex;
	flex-direction: row;
	align-items: baseline;
	height: 0.5rem;
	padding-left: 0.4rem;
	padding-top: 0.55rem;
	padding-bottom: 0.55rem;
	margin-bottom: 0.25rem;
	background-color: white;
	width: 100%;
}

.form3>div:nth-child(3) {
	/*border:1px solid green;*/
	display: flex;
	align-items: center;
	align-self: flex-end;
	height: 0.2rem;
	padding-top: 0.37rem;
	padding-bottom: 0.37rem;
	padding-left: 0.4rem;
	/*margin-top: 0.25rem;*/
	background-color: white;
	width: 100%;
}

.spanStyle>div:last-child {
	/*border:1px solid blue;*/
	margin-left: 0.9rem;
}

/*  以下为第二行柱形图的相关综合样式  */
.formBox2 {
	/*border:1px solid red;*/
	width: 16.15rem;
	min-width: 1160px;
	margin: 0 auto;
	background-color: white;
}

.formBox2>div:first-child {
	/*border:1px solid blue;*/
	width: 100%;
	margin: 0 auto;
	text-align: left;
	padding-top: 0.24rem;
	padding-bottom: 0.13rem;
	font-weight: bold;
	background-color: #F5F5F5;
}

.formBox2>div:nth-child(2) {
	/*border:0.01rem solid red;*/
	width: 100%;
	margin: 0 auto;
	background-color: white;
	display: flex;
	flex-wrap: nowrap;
}

.tabNav>div {
	border-bottom: 0.015rem solid rgba(68, 132, 254, 0);
	padding: 0.2rem 0.32rem;
	font-weight: bold;
	color: #999999;
}

.tabNav>div:hover {
	cursor: pointer;
}

.tabNav>div:first-child {
	border-bottom: 0.015rem solid rgba(68, 132, 254, 1);
	margin-left: 0.2rem;
	color: #333333;
}


.outBox {
	background-color: #F5F5F5;
	/*padding-bottom: 0.6rem;*/
}

.top50Box {
	/*border:1px solid red;*/
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	width: 16.15rem;
	min-width: 1160px;
	margin: 0 auto;
}

.leftBox,
.rightBox {
	width: 49%;
	/*border: 1px solid blue;*/
	margin-bottom: 0.3rem;
}

.leftBox>div:first-child,
.rightBox>div:first-child {
	/*border: 1px solid red;*/
	padding-top: 0.24rem;
	padding-bottom: 0.1rem;
	text-align: left;
	font-weight: bold;

}

.leftBox>div:nth-child(2),
.rightBox>div:nth-child(2) {
	background-color: white;
}

.verticalLine {
	border-left: 4px solid rgba(68, 132, 254, 1);
	/*border: 4px solid rgba(68, 132, 254, 1);*/
	height: 0.14rem;
	padding-left: 0.05rem;
	display: inline-block;
}

.top50Tab {
	width: 95%;
	margin: 0 auto;
	border-bottom: 1px solid rgba(235, 235, 235, 1);
	text-align: left;
	display: flex;
}

.top50Tab>span {
	padding: 0.2rem;
	color: #999999;
	font-weight: bold;
	cursor: pointer;
}

.top50Tab>span:first-child {
	/*margin-left: 0.2rem;*/
	border-bottom: 2px solid rgba(68, 113, 254, 1);
	color: #333333;
}

.img1 {
	width: 150px;
	height: 150px;
}

.img2 {
	width: 0.4rem;
	height: 0.4rem;
}


/*table>tbody>tr:last-of-type>td {*/
/*border-bottom: 0*/
/*}*/

.my_top50left .el-table::before,
.my_top50right .el-table::before {
	height: 0;
}

.my_top50left .el-table--enable-row-hover .el-table__body tr:last-of-type>td,
.my_top50right .el-table--enable-row-hover .el-table__body tr:last-of-type>td {
	border-bottom: 0
}

</style>
