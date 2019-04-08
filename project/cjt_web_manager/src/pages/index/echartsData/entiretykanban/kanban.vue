<template>
	<div id="kanban">
		<RealTimeSituation />
		<FlowTrendAnalysis />
		<allPayment />
		<analysisconsumptionperiod />
	</div>
</template>
<script>
import RealTimeSituation from './kanbancomponents/RealTimeSituation.vue' //实时概况
import FlowTrendAnalysis from './kanbancomponents/FlowTrendAnalysis.vue' //流水趋势分析
import allPayment from './kanbancomponents/allPayment.vue' //支付通道流水分析
import analysisconsumptionperiod from './kanbancomponents/analysisconsumptionperiod.vue' //消费时段分析
export default {
	name: "kanban",
	components: {
		"RealTimeSituation": RealTimeSituation,
		"FlowTrendAnalysis": FlowTrendAnalysis,
		"allPayment": allPayment,
		"analysisconsumptionperiod": analysisconsumptionperiod
	}
}

</script>
<style lang="scss">
#kanban>div+div {
	margin-top: .24rem
}

</style>
