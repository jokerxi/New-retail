<template>
	<div id="allPayment">
		<Tabs value="name1">
			<TabPane label="支付通道流水分析" name="name1">
				<payment />
			</TabPane>
			<TabPane label="利润分析" name="name2">利润分析</TabPane>
			<TabPane label="顾客价值分析" name="name3">顾客价值分析</TabPane>
			<TabPane label="顾客留存状态流水分析" name="name4">顾客留存状态流水分析</TabPane>
		</Tabs>
	</div>
</template>
<script>
import payment from './allPayment/Payment.vue';
// import payment2 from './AllPayment2/payment2.vue';
// import payment3 from './AllPayment2/payment3.vue';

export default {
	name: "allPayment",
	components: {
		'payment': payment,
		// 'payment2': payment2,
		// 'payment3': payment3
	},

	data() {
		return {

		}
	},
	// 挂载之后执行
	mounted() {

	},
	// 函数
	methods: {

	}
}

</script>
<style lang="scss" scoped>
#allPayment {
	background-color: #FFFFFF;
	padding: .28rem .24rem;
}

</style>
