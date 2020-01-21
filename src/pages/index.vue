<template>
  <div class="container" @click="clickHandle('test click', $event)">
      <nav-bar :title="'videoTitle'"
                      :navBackgroundColor="'pink'"
                      :titleColor="'green'"
                      :back-visible="true"
                      :home-path="'/pages/index'"></nav-bar>
      <tab-bar :selectNavIndex="0" :navList="navList"></tab-bar>
  </div>
</template>

<script>
import card from '@/components/card'
import tabBar from '@/components/tabBar'
import navBar from '@/components/navBar'
import video from './video'

export default {
  mpType: 'page',

  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      navList: [
        {
          pagePath: "/pages/video/index",
          iconPath: "/static/images/tabbar/tabbar1-1.png",
          selectedIconPath: "/static/images/tabbar/tabbar1-1-selected.png",
          text: "首页"
        },
        {
          pagePath: "/pages/video/upload",
          iconPath: "/static/images/icon-add.png",
          isSpecial: true,
          text: "记"
        },
        {
          pagePath: "pages/login/login",
          iconPath: "/static/images/tabbar/tabbar5-5.png",
          selectedIconPath: "/static/images/tabbar/tabbar5-5-selected.png",
          text: "我的"
        }
      ]
    }
  },
  components: {
    card,
    tabBar,
    navBar,
    video
  },
  onShow(){
    wx.hideTabBar();
  },
  onLoad(){
    wx.hideTabBar();
  },
  onReady(){
    wx.hideTabBar();
  },
  methods: {
    bindViewTap () {
      const url = '/packageA/logs'
      this.$router.push(url)
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      // eslint-disable-next-line
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128px;
  height: 128px;
  margin: 20px;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}


.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
