<template>
    <div class="index">
        <canvas :canvas-id="'main'+index" class="main" v-for="(item,index) in list" :key="index" v-if="isCompose"></canvas>
        <div class="content">
            <swiper
                    v-if="isCompose"
                    :indicator-dots="true"
                    :circular="true"
                    :autoplay="true"
                    indicator-color="rgba(255,255,255,.2)"
                    indicator-active-color="#fff"
                    class="swiper"
            >
                <swiper-item v-for="(item,index) in targetList" :key="index" class="swiper-item">
                    <image :src="item"></image>
                </swiper-item>
            </swiper>
        </div>
        <div class="btn">
            <button class="btnWord" @click="compose">{{btnWord}}</button>
        </div>
    </div>
</template>

<script>
  export default {
    name: "index",
    components: {},
    data() {
      return {
        btnWord:'',
        isCompose: false,
        list:[
          '/static/images/defaul-head-image.png',
          '/static/images/pc-bg.png',
          '/static/images/defaul-head-image.png',
          '/static/images/pc-bg.png'
        ],
        targetList:[]
      };
    },
    watch: {
      isCompose: {
        handler(newValue, oldValue) {
          this.isCompose ? (this.btnWord = '重置') : (this.btnWord = '合成');
        },
        //deep:true,
        immediate: true
      }
    },
    // computed: {
    //   data() {
    //     return this.data;
    //   }
    // },
    methods: {
      compose() {
        this.isCompose = !this.isCompose;
        let img = '/static/images/card.jpg';
        let listPromise = [];
        this.list.map((item,index) => {
          listPromise.push(this.draw('main'+index,item,img,100,100,100,100));
        });
        console.log('this is console test: ',listPromise);
        Promise.all(listPromise).then(res => {
          this.targetList = res;
        })
      },
      draw(canvasID,bg,img,imgLeft,imgRight,imgWidth,imgHeight) {
        let info = wx.getSystemInfoSync();
        let w = info.windowWidth;
        let h = info.windowHeight;
        return new Promise((resolve,reject) =>{
          let ctx = wx.createCanvasContext(canvasID);
          ctx.drawImage(bg,0,0,w,h);
          ctx.drawImage(img,imgLeft,imgRight,imgWidth,imgHeight);
          ctx.draw(true,() => {
            wx.canvasToTempFilePath({
              x:0,
              y:0,
              width:w,
              height:h,
              canvasId:canvasID,
              success(res){
                resolve(res.tempFilePath);
                console.log('this is console test: ',res.tempFilePath,w,h);
              }
            })
          })
        })
      }
    },
    mounted() {
      console.log("this is mounted:", wx);
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
    .index{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .btn{
            height: 50px;
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            .btnWord{
                border-radius: 10px;
                background: pink;
            }
        }
        .main{
            height: 500px;
            width: 500px;
            background: grey;
            position: relative;
            top: -500vh;
        }
        .content{
            height: 100%;
            width: 100vh;
            .swiper{
                height: calc(100% - 50px);
                width: 100%;
                background: pink;
                .swiper-item{
                    height: 100%;
                    width: 100%;
                    background: blue;
                }
            }
        }
    }
</style>