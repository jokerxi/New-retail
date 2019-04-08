<template>
    <div class="shopManagement">
        <!-- 账号管理/店铺管理 -->
        <div class="sm_content">
            <Tabs :animated="false">
                <TabPane label="基础信息">
                    <BasicInformation></BasicInformation>
                </TabPane>
                <TabPane label="开户信息">
                    <OpeningAccountInformation></OpeningAccountInformation>
                </TabPane>
                <TabPane label="平台信息">
                    <PlatformInformation></PlatformInformation>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
  
    import BasicInformation from '../../../../components/BasicInformation'
    import OpeningAccountInformation from '../../../../components/OpeningAccountInformation'
    import PlatformInformation from '../../../../components/PlatformInformation'

   export default {
        name: "shopManagement",
       components: {
            BasicInformation,
            OpeningAccountInformation,
            PlatformInformation
        },

        data() {
            return{
            
            }
        },
        methods:{

        }
    }
</script>

<style type="text/scss" lang="scss">
    .shopManagement{
        padding:.1rem .2rem;
        background-color: #ffffff;
        p{
            margin: 0;
            padding: 0;
        }
    }

</style>
