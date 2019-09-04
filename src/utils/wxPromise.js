const promisify = (api) => {
  return (options,...params) => {
    return new Promise((resolve,reject) => {
      api(Object.assign({},{
        success:resolve,
        fail:reject
      },options,...params))
      Promise.prototype.finally = function(callback){
        let P = this.constructor;
        return this.then(
          success => P.resolve(callback()).then(() => success),
          fail => P.resolve(callback()).then(() => {throw fail})
        )
      }
    })
  }
};

wx.util = {};

const wxPromise = () => {
  for(let key in wx){
    (/^on|^create|Sync$|Manager$|^pause/.test(key) && key !== 'createBLEConnection' || key === 'stopRecord' || key === 'stopVoice' || key === 'stopBackgroundAudio' || key === 'stopPullDownRefresh' || key === 'hideKeyboard' || key === 'hideToast' || key === 'hideLoading' || key === 'showNavigationBarLoading' || key === 'hideNavigationBarLoading' || key === 'canIUse' || key === 'navigateBack' || key === 'closeSocket' || key === 'closeSocket' || key === 'pageScrollTo' || key === 'drawCanvas') ? (wx.util[key] = wx[key]) : (wx.util[key] = promisify(wx[key]));
  }
  console.log('this is wx.util: ',wx.util);
};

wxPromise();

// 权限：获取当前位置，打开地图选择位置
wx.util.userLocation = () => {
  return new Promise((resolve,reject) => {
    wx.util.getSetting().then(res => {
      if ((!res.authSetting['scope.userLocation'])) {
        wx.util.showModal({
          title: '请求授权当前位置',
          content: '需要获取您的地理位置，请确认授权'
        }).then(res => {
          if (res.cancel) {
            //取消授权
            wx.util.showToast({
              title: '拒绝授权',
              icon: 'none',
              duration: 1000
            })
          } else if (res.confirm) {
            wx.util.openSetting().then(res => {
              wx.util.authorize({ scope: 'scope.userLocation' }).then(res => {
                resolve(res);
              }).catch(err => reject(err))
            }).catch(err => reject(err))
          }
        }).catch(err => reject(err))
      }
      else {
        resolve(res)
      }
    }).catch(err => reject(err))
  })
};