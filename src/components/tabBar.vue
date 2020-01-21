<template>
    <div class="tabbar-wrap" :class="isIphoneX? 'isIphoneX':''">
        <ul class="tabbar">
            <li class="tabbar-item" v-for="(item, index) in navList"
                :key="index"
                @click="selectNavItem(index)"
                :class="item.isSpecial ? 'wrapSpecial':''">
                <p class="tabbar-icon" >
                    <img alt="tabbar-icon"
                         :src="selectNavIndex === index? item.selectedIconPath : item.iconPath"
                         :class="item.isSpecial ? 'imgSpecial':''"
                    >
                </p>
                <p class="tabbar-text" :class="selectNavIndex === index? 'active':''">
                    {{item.text}}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: "tabBar",
    props: {
      selectNavIndex: {
        type: Number,
        default: 0
      },
      navList: {
        type: Array,
        default: () => []
      }
    },
    components: {},
    data() {
      return {
        color: "#979795",
        selectedColor: "#45b7af"
      };
    },
    watch: {
      data: {
        handler(newValue, oldValue) {
          console.log("this is watching data:", newValue, oldValue);
        },
        //deep:true,
        immediate: true
      },
      selectNavIndex: {
        handler(val) {
          this.bindNavigateTo(this.navList[val].pagePath);
        },
        immediate: true
      },
    },
    computed: {
      isIphoneX(){
        return this.$store.state.isIphoneX
      }
    },
    methods: {
      /**
       * 点击导航栏
       */
      selectNavItem(index) {
        if (index === this.selectNavIndex) {
          return false;
        }
        this.selectNavIndex = index;
      },

      /**
       * 路由跳转
       */
      bindNavigateTo(url) {
        wx.switchTab({
          url
        })
      }
    },
    mounted() {
      console.log("this is mounted:", this.data);
    },
    onShow() {
      console.log("this is onShow:", this.data);
    },
    onUnload() {
      this.data = "";
      console.log("this is onUnload:", this.data);
    }
  };
</script>

<style lang="less" scoped>
    .tabbar-wrap  {
        position: fixed;
        bottom: 0;
        left: 0;
        height: calc(92vmin / 7.5);
        width: 100%;
        padding-top: calc(6vmin / 7.5);
        box-shadow: 0 0 calc(2vmin / 7.5) #C4C4C4;
        &.isIphoneX {
        padding-bottom: calc(33vmin / 7.5);
    }
        .tabbar  {
         display: flex;
            .tabbar-item {
                flex: 1;
                .tabbar-icon {
                    height: calc(56vmin / 7.5);
                    text-align: center;
                    position: relative;
                    img  {
                        width: calc(56vmin / 7.5);
                        height: calc(56vmin / 7.5);
                        &.imgSpecial {
                            width: calc(84vmin / 7.5);
                            height: calc(84vmin / 7.5);
                        }
                    }
            }.tabbar-text {
                 text-align: center;
                 line-height: calc(36vmin / 7.5);
                 color: #979795;
                 font-size: calc(22vmin / 7.5); &.active {
                    color: #45b7af;
                }
             }&.wrapSpecial {
                  .tabbar-icon {
                      position: absolute;
                      top: -18px;
                      width: calc(84vmin / 7.5);
                      height: calc(84vmin / 7.5);
                      padding: 3px;
                      left: 50%;
                      margin-left: -(( 42px + 3px * 2 )/ 2);
                      border-radius: 50%;
                      border-top: calc(2vmin / 7.5) solid #C4C4C4;
                      text-align: center;
                  }.tabbar-text {
                       position: relative;
                       bottom: -28px;
                   }
              }
        }
     }
    }
</style>