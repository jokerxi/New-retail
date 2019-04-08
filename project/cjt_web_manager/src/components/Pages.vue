<template>
  <div class="pages">
    <div class="pageWrap">
      <Page :total="Number(pagation.total)" :current.sync="pagation.currents" :page-size="Number(pagation.pageSize)" prev-text="上一页" next-text="下一页" size="small" show-sizer @on-change="PageChange" @on-page-size-change="PageSizeChange" />
      <div class="skip">
        <InputNumber :max="Math.ceil(pagation.total/pagation.pageSize)" :min="1" v-model="SkipPage" />
        <Button type="primary" @click="skipHandle">跳转</Button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pages',
  props: {
    pagations: {
      type: Object,
      default: {
        currents: 1,
        total: 0,
        pageSize: 10
      }
    }
  },
  watch: {
    pagations: {
      handler: function(newVal, oldVal) {
        // this.pagation = oldVal
        this.pagation = newVal
        console.log(this.pagation, 777)
      },
      deep: true
    }
  },
  data() {
    return {
      SkipPage: 1,
      pagation: {
        currents: 1,
        total: 0,
        pageSize: 10
      },
      current: 1
    }
  },
  created() {
    console.log(this.pagations.currents)
  },
  methods: {
    skipHandle() {
      this.$emit('skipHandle', this.SkipPage)
    },
    PageSizeChange(PageSize) {
      this.$emit('PageSizeChange', PageSize)
    },
    PageChange(page) {
      this.$emit('PageChange', page)
    }
  }

}

</script>
<style lang="scss">
.pages {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 0.3rem 0;

  .pageWrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .ivu-page.mini .ivu-page-next,
  .ivu-page.mini .ivu-page-prev {
    border: 1px solid rgba(234, 235, 240, 1);
    font-size: 0.14rem;
    font-family: 'Source Han Sans CN';
    padding: 0 0.08rem;
    height: 0.3rem;
    line-height: 0.3rem;
    min-height: 21px;
  }

  .ivu-page.mini .ivu-page-item {
    width: 0.3rem;
    height: 0.3rem;
    border: 1px solid rgba(234, 235, 240, 1);
    border-radius: 4px;
    line-height: 0.3rem;
    min-height: 21px;
    min-width: 21px;
  }

  .ivu-page-item a {
    font-size: 0.14rem;
    font-family: 'Source Han Sans CN';
  }

  .ivu-page-item-active {
    background: #4471FE;
    border: 1px solid #4471FE !important;
  }

  .ivu-page-item-active a,
  .ivu-page-item-active:hover a {
    color: #fff;
  }

  .ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-placeholder,
  .ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    font-size: 0.14rem;
    font-family: 'Source Han Sans CN';
  }

  .ivu-select-small.ivu-select-single .ivu-select-selection {
    height: 0.3rem;
    min-height: 21px;
  }

  .ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-placeholder,
  .ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    height: 0.3rem;
    line-height: 0.3rem;
    min-height: 21px;
  }

  .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
  .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    width: initial;
  }

  .skip {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .ivu-input-number,
    .ivu-input-number-input {
      width: 0.6rem;
      height: 0.3rem;
      margin-right: 0.05rem;
      border-radius: 4px;
      line-height: 0.3rem;
      text-align: center;
      min-height: 21px;
      min-width: 43px;
    }

    .ivu-input-number-handler-wrap {
      display: none;
    }

    .ivu-btn {
      width: 0.6rem;
      display: inline-block;
      height: 0.3rem;
      padding: 0 0.1rem;
      font-size: 0.14rem;
      font-family: 'Source Han Sans CN';
      font-weight: 400;
      line-height: 0.22rem;
      color: rgba(255, 255, 255, 1);
      min-height: 21px;
      min-width: 43px;
    }
  }
}

</style>
