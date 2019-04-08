<template>
    <div class="bd_header">
        <p>{{SearchParam && SearchParam.title ? SearchParam.title : ''}}</p>
        <div class="bd_header_content">
            <div>
                <input id="12" type="text" v-model="searchVal"
                       :placeholder="SearchParam && SearchParam.placeholder ? SearchParam.placeholder : ''">
                <label for="12" class="iconfont icon-sousuoicon"></label>
            </div>
            <button class="btn" type="button" @click="searchBtn">查询</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Search',
        props: {
            SearchParam: {
                type: Object
            }
        },
        data(){
            return{
                searchVal:''
            }
        },
        methods: {
            searchBtn() {
                this.$emit('SearchBtn',this.searchVal)
            }
        }
    }
</script>

<style scoped lang="scss">
    .bd_header {
        border-radius: 4px;
        background-size: 100% 100%;
        padding: .61rem 0 .61rem .6rem;
        color: #ffffff;
        overflow: hidden;
        background: url("../../static/image/sjbg@x.png") no-repeat;
        background-size: cover;
    }

    .bd_header p {
        font-size: 0.18rem;
        font-weight: bold;
        margin-bottom: 0.2rem;
    }

    .bd_header_content {
        display: flex;
        align-items: center;
    }

    .bd_header_content > div {
        position: relative;
    }

    .bd_header_content label {
        position: absolute;
        top: .11rem;
        bottom: 0;
        left: 14px;
        right: 0;
        color: #767676;
        font-size: .14rem;
        width: 20px;
    }

    .bd_header input {
        width: 3.8rem;
        height: .4rem;
        border-radius: 4px;
        font-size: 0.14rem;
        color: #767676;
        padding: 12px 4px 12px 35px;
    }

    .btn {
        margin-left: .3rem;
    }
</style>
