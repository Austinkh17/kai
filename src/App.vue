<script>
    import './utils/wxPromise';
    export default {
      onShow(){
        wx.hideTabBar();
      },
      onLoad(){
        wx.hideTabBar();
      },
      onReady(){
        wx.hideTabBar();
      },
      created () {
        // 调用API从本地缓存中获取数据
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // eslint-disable-next-line
        console.log('-------小程序启动-------');
        this.checkMiniProgramVersion();
        this.checkWXVersion();
        this.checkReferrer();
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
        // 微信版本检测
        checkWXVersion() {
          let that = this;
          wx.getSystemInfo({
            success: function(res) {
              console.log('this is getSystemInfo brand品牌: ',res.brand);
              console.log('this is getSystemInfo model型号: ',res.model);
              console.log('this is getSystemInfo version: ',res.version);
              console.log('this is getSystemInfo system: ',res.system);
              // 微信7.0.0版本才支持单页面隐藏导航条
              // 微信6.6.0版本才支持所有页面隐藏导航条
              res.model.includes('iPhone X') && this.$store.commit('isIphoneX',true);
              let isIphone = (res.system[0] === 'i');
              if (parseInt(res.version[0]) >= 7) {
                // that.$store.commit('updateNavbarStatus', {hideNavBar: true, statusBarHeight: res.statusBarHeight, isIphone: isIphone});
              }
              // 开发者工具的版本号显示不是7.0.0也隐藏原生头部
              if (res.platform === 'devtools') {
                // that.$store.commit('updateNavbarStatus', {hideNavBar: true, statusBarHeight: res.statusBarHeight, isIphone: isIphone});
              }
            }
          });
        },
        checkReferrer(){
          let obj = wx.getLaunchOptionsSync();
          console.log('this is 场景值: ',obj.scene);
          console.log('this is 转发信息: ',obj.shareTicket);
          obj.referrerInfo && obj.referrerInfo.appId && (console.log('this is 来源信息: ',obj.referrerInfo.appId));
        }
      }
    }
</script>

<style>
    @import './common/fonts/iconfont.css';

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
