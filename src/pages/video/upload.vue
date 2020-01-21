<template>
    <div></div>
    <!--<van-uploader :file-list="fileList" @after-read="afterRead" />-->
</template>

<script>
  export default {
    name: "upload",
    components: {},
    data() {
      return {
        fileList: []
      };
    },
    computed: {},
    methods: {// 上传图片
      afterRead() {
        wx.cloud.init();
        const { fileList } = this.data;
        if (!fileList.length) {
          wx.showToast({ title: "请选择图片", icon: "none" });
        } else {
          const uploadTasks = fileList.map((file, index) => this.uploadFilePromise(`my-photo${index}.png`, file));
          Promise.all(uploadTasks)
            .then(data => {
              wx.showToast({ title: '上传成功', icon: 'none' });
              const newFileList = data.map(item => {
                url: item.fileID
              });
              this.setData({ cloudPath: data, fileList: newFileList });
            })
            .catch(e => {
              wx.showToast({ title: '上传失败', icon: 'none' });
              console.log(e);
            });
        }
      },
      uploadFilePromise(fileName, chooseResult) {
        return wx.cloud.uploadFile({
          cloudPath: fileName,
          filePath: chooseResult.path
        });
      }
    }
  };
</script>