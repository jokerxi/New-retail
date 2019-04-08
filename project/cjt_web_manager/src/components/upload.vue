<template>
    <div id="uploadPictures">
        <div class="demo-upload-list" :style="{'line-height': w+'rem','width':w+'rem','height':w+'rem'}" v-for="(item,index) in uploadList" :key="index">
            <img v-show="types=='png'" :src="item.url">
            <img v-show="types=='doc'" src="../../static/image/word@2x.png">
            <img v-show="types=='xls'" src="../../static/image/excl@2x.png">
            <div class="demo-upload-list-cover">
                <a v-show="types!='png'" down="文件" :href="item.url"><Icon type="md-arrow-down"></Icon></a>
                <Icon v-show="types=='png'" type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
            </div>
        </div>
        <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" action="" :headers="headers" :style="{'display': 'inline-block','width':w+'rem'}">
            <div :style="{'width': '100%','height':'100%','line-height': w+'rem','background': '#E7EEEF'}">
                <Icon type="ios-add" style="color:#666;font-weight:bold" size="50"></Icon>
            </div>
        </Upload>
        <Modal title="图片" v-model="visible">
            <img :src="currentUrl" style="width: 100%">
    </Modal>
    </div>
</template>
<script>
import OSS from 'ali-oss'
export default {
    data() {
        return {
            visible: false,
            uploadList: [],
            files: [],
            types:'png',
            currentUrl: '',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    },
    props: {
        imgList: {
            type: Array,
            default () {
                return []
            }
        },
        w: {
            type: Number,
            default: 1.8
        }
    },
    watch: {
        imgList: function(newVal, oldVal) {
            this.uploadList = newVal
            if(this.uploadList.length>0){
            if(this.uploadList[0].url.indexOf('doc') > 0){
                this.types = 'doc'
                } else if(this.uploadList[0].url.indexOf('xls') > 0){
                    this.types = 'xls'
                } else {
                    this.types = 'png'
                }
            }
        }
    },
    created() {
        this.uploadList = this.imgList
        if(this.uploadList.length>0){
          if(this.uploadList[0].url.indexOf('doc') > 0){
               this.types = 'doc'
            } else if(this.uploadList[0].url.indexOf('xls') > 0){
                this.types = 'xls'
            } else {
                this.types = 'png'
            }
        }
    },
    methods: {
        handleView(url) {
            this.currentUrl = url
            this.visible = true;
        },
        handleRemove(item) {
            this.uploadList.splice(item, 1)
            this.files.splice(item.name, 1)
            this.$emit('delPic', this.uploadList)
            console.log(this.uploadList)
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 <' + file.name + '> 格式不正确, 请上传JPG格式或者PNG格式的文件'
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '超过文件大小限制',
                desc: '文件 <' + file.name + '>太大，不超过2M。'
            });
        },
        // 上传时
        handleBeforeUpload(file) {
            const client = new OSS({
                region: 'oss-cn-shenzhen',
                secure: true,
                accessKeyId: 'LTAIwHje3UdO5qzd',
                accessKeySecret: '1q4Zzgc7B1NiUP8V4EsCOchqJnqeMu',
                /*这两者到阿里云控制台获得*/
                bucket: 'hedongtestopen' /*装图片的桶名*/
            });
            let that = this
            let Name = file.name
            console.log(Name, '图片名称')
            let Dates = this.timestamp()
            let storeAs = 'Company-PC' + '/' + 'companyId' + '/' + Dates + '/' + Name
            console.log(storeAs, '图片完整路径')
            if (this.files.indexOf(Name) > -1) {
                this.$Notice.warning({
                    title: '图片已存在',
                    desc: '同一图片只能上传一张'
                });
            } else {
                client.multipartUpload(storeAs, file).then(result => {
                    let urls = result.res.requestUrls[0]
                    let param = []
                    let url = ''
                    if (urls.indexOf('?') > 0) {
                        param = urls.split('?')
                        url = param[0]
                    } else {
                        url = result.res.requestUrls[0]
                    }
                    this.files.push(file.name)
                    console.log(param, 'param')
                    this.uploadList.push({
                        uid: file.uid,
                        url: url,
                        name: file.name,
                        status: result.res.statusCode,
                    })
                    this.$emit('setPic', this.uploadList)
                    console.log(result.res.requestUrls, '结果1')
                    console.log(this.uploadList)
                }).catch(err => {
                    this.$Notice.warning({
                        title: '上传失败',
                        desc: '请重新上传'
                    });
                })
            }
        },
        // 上传时间
        timestamp() {
            const time = new Date();
            const y = time.getFullYear();
            const m = time.getMonth() + 1;
            const d = time.getDate();
            const h = time.getHours();
            const mm = time.getMinutes();
            const s = time.getSeconds();
            const ms = time.getMilliseconds()
            return "" + y + '-' + this.Add0(m) + '-' + this.Add0(d);
        },
        Add0(m) {
            return m < 10 ? '0' + m : m;
        },
        // 上传成功
        handleSuccess() {
            console.log(this.uploadList, '上传成功')
        },
        //获取当前时间 YYY-MMM-DDD
        getData() {
            var date = new Date();
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() + ' ';
            this.newData = Y + M + D
        }
    }
}

</script>
<style>
#uploadPictures {
    width: 100%;
}

.demo-upload-list {
    display: inline-block;
    text-align: left;
    /* line-height: 1.8rem; */
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: .4rem;
}

.demo-upload-list img {
    width: 100%;
    height: 100%;
}

.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
}

.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}

.demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}

.demo-upload-list-cover {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
    width: 1.8rem;
    text-align: center;
    line-height: 1.8rem;
}

</style>
