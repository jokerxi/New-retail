<template>
  <div id="uploadPictures">
    <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
      <img :src="item.url">
      <div class="demo-upload-list-cover">
        <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
      </div>
    </div>
    <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" action="//jsonplaceholder.typicode.com/posts/" style="display: inline-block;width:1.8rem;">
      <div style="width: 1.8rem;height:1.8rem;line-height: 1.8rem;background: #E7EEEF">
        <Icon type="ios-add" style="color:#666;font-weight:bold" size="50"></Icon>
      </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
      <img :src="'https://hedongtestopen.oss-cn-shenzhen.aliyuncs.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
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
    }
  },
  created() {
    this.client = new OSS({
      region: 'oss-cn-shenzhen',
      secure: true,
      accessKeyId: 'LTAIwHje3UdO5qzd',
      /*这两者到阿里云控制台获得*/
      accessKeySecret: '1q4Zzgc7B1NiUP8V4EsCOchqJnqeMu',
      bucket: 'hedongtestopen' /*装图片的桶名*/
    });
  },
  methods: {
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '亲！ <' + file.name + '> 不是图片, 请上传JPG格式或者PNG格式的文件'
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '超过档案大小限制',
        desc: '亲！ <' + file.name + '>太大，不超过2M。'
      });
    },
    // 上传时
    handleBeforeUpload(file) {
      const _this = this
      const fileId = file.name
      const check = this.uploadList.length < 5;
      let type, storeAs;
      // 查询是否存在相同图片
      if (_this.imgId.indexOf(fileId) == -1) {
        this.getData()
        type = file.name.split('.')[1];
        storeAs = 'Company-PC' + '/' + 'companyId' + '/' + this.newData + '/' + fileId + '.' + type;
        this.client.multipartUpload(storeAs, file)
          .then(function(result) {
            _this.imgName = result.res.requestUrls
            _this.imgId.push(fileId);
            console.log(result);
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        this.$Notice.warning({
          title: '亲！ 上传图片已经存在'
        })
        return false
      }
      if (!check) {
        this.$Notice.warning({
          title: '亲！ 最多可上传五张照片。'
        });
        return check;
      }
    },
    // 上传成功
    handleSuccess(res, file) {
      file.url = this.imgName;
      file.name = file.name;
    },
    //获取当前时间 YYY-MMM-DDD
    getData() {
      var date = new Date();
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      this.newData = Y + M + D
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  }
}

</script>
<style>
#uploadPictures {
  width: 100%;
}

.demo-upload-list {
  display: inline-block;
  width: 1.8rem;
  height: 1.8rem;
  text-align: left;
  line-height: 1.8rem;
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
