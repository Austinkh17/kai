<template>
    <div class="index">
        <div v-for="(item,index) in videoList" :key="index" class="videoList">
            <video object-fit="cover" class="video" :src="item.videoUrl"
                   autoplay loop :id="item.id" controls>
                <div class="right">
                    <div class="block">
                        <image class="avatar" :src="item.avatar || defaultAvatar" mode="scaleToFill"></image>
                    </div>
                    <div class="block">
                        <span class="icon like" :style="likeColor(item)" @click="like(index)"></span>
                        <div class="num">{{item.like.length}}{{test}}</div>
                    </div>
                    <div class="block">
                        <span class="icon pinglun1"></span>
                    </div>
                    <div class="block">
                        <span class="icon fenxiang"></span>
                    </div>
                </div>
                <div class="bottom"></div>
            </video>
        </div>
        <!--<tab-bar :selectNavIndex="2" :navList="navList"></tab-bar>-->
    </div>
</template>

<script>
  import tabBar from "@/components/tabBar";

  export default {
    name: "index",
    data() {
      return {
        navList: [
          {
            pagePath: "/pages/canvas/index",
            iconPath: "/static/images/tabbar/tabbar1-1.png",
            selectedIconPath: "/static/images/tabbar/tabbar1-1-selected.png",
            text: "首页"
          },
          {
            pagePath: "/pages/test/test2",
            iconPath: "/static/images/tabbar/tabbar5-5-selected.png",
            text: "同城"
          },
          {
            pagePath: "/pages/video/upload",
            iconPath: "/static/images/tabbar/tabbar5-5.png",
            selectedIconPath: "/static/images/icon-add.png",
            isSpecial: true
          },
          {
            pagePath: "/pages/index",
            iconPath: "/static/images/tabbar/tabbar5-5.png",
            selectedIconPath: "/static/images/tabbar/tabbar5-5-selected.png",
            text: "消"
          },
          {
            pagePath: "/pages/index",
            iconPath: "/static/images/tabbar/tabbar5-5.png",
            selectedIconPath: "/static/images/tabbar/tabbar5-5-selected.png",
            text: "我"
          }
        ],
        videoList: [
          {
            videoUrl: "http://video.699pic.com/videos/85/34/16/a_yKAE5yUh19ec1554853416.mp4",
            id: 1,
            avatar: "",
            like: ["kk", "aa", "bb"]
          },
          {
            videoUrl: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
            id: 2,
            avatar: "",
            like: ["qwq"]
          }
        ],
        test: "",
        user: "kk",
        defaultAvatar: "http://www.shuoshuokong.com/uploads/allimg/170613/1-1F613160U1.jpg"
      };
    },
    computed: {},
    components: {
      tabBar
    },
    onShow() {
      this.videoList = [
        {
          videoUrl: "http://video.699pic.com/videos/85/34/16/a_yKAE5yUh19ec1554853416.mp4",
          id: 1,
          avatar: "",
          like: ["kk", "aa", "bb"]
        },
        {
          videoUrl: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
          id: 2,
          avatar: "",
          like: ["qwq"]
        }
      ];
      this.videoList.map(item => {
        item.videoContext && (item.videoContext = wx.createVideoContext("item.id"));
      });
      const db = wx.cloud.database();
      db.collection("video").get().then(res => {
        console.log("this is console as: ", res);
        this.test = res.data[0].test;
      });
    },
    methods: {
      like(index) {
        if (this.videoList[index].like.includes(this.user)) {
          this.videoList[index].like = this.videoList[index].like.filter(function(val) {
            return val !== this.user;
          });
        } else {
          this.videoList[index].like.push(this.user);
        }
      },
      likeColor(item) {
        console.log("this is console test: ", item.like.includes(this.user) ? "red" : "white");
        return {
          color: item.like.includes(this.user) ? "red" : "white"
        };
      }
    }
  };
</script>

<style lang="less" scoped>
    .index {
        height: 100vh;
        width: 100%;
        background: #0086b3;
        .videoList {
            height: 100vh;
            width: 100%;
            .video {
                height: 100%;
                width: 100%;
                position: relative;
            }
            .right {
                position: absolute;
                right: 0;
                top: 30%;
                width: 100px;
                height: 320px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .block {
                    width: 100%;
                    height: 25%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .avatar {
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                    }
                    .icon {
                        font-size: 40px;
                    }
                    .num {
                        box-sizing: border-box;
                        height: 10px;
                        padding-top: 30px;
                    }
                }
            }
        }
    }
</style>