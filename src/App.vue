<script>
    import './utils/wxPromise';
    export default {
      created () {
        // 调用API从本地缓存中获取数据
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // eslint-disable-next-line
        console.log('-------小程序启动-------');
        this.checkMiniProgramVersion();
      },
      methods:{
        // 微信小程序版本检测
        checkMiniProgramVersion() {
          //检查是否存在新版本
          wx.getUpdateManager().onCheckForUpdate(function (res) {
            // 诉求完新版本信息的回调
            console.log('是否有新版本：' + res.hasUpdate);
            if(res.hasUpdate){//如果有新版本
              // 小程序有新版本，会主动触发下载操作（无需开发者触发）
              wx.getUpdateManager().onUpdateReady(function () {//当新版本下载完成，会进行回调
                let timer = setTimeout(function() {
                  wx.getUpdateManager().applyUpdate();
                }, 5000);
                showModal('更新提醒', '发现新版本，将自动更新。', true).then(res => {
                  timer.clearTimeout();
                  wx.getUpdateManager().applyUpdate();
                }).catch(err => {
                  console.log('更新弹框err: ', err);
                });
              });
              // 小程序有新版本，会主动触发下载操作（无需开发者触发）
              wx.getUpdateManager().onUpdateFailed(function () {//当新版本下载失败，会进行回调
                showModal('提示', '检查到有新版本，但下载失败，请检查网络设置', true);
              });
            }
          });
        },
      }
    }
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200px 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
