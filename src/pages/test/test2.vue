<template>
    <div class="test2">
        <nav-bar :title="'videoTitle'"
                 :navBackgroundColor="'blue'"
                 :titleColor="'green'"
                 :back-visible="true"
                 :home-path="'/pages/index'"></nav-bar>
        <button @click="viewLocation">查看位置</button>
        <button @click="selectLocation">选择位置</button>
        <button open-type="share">分享</button>
        <div class="name" v-if="chooseLocation.name">{{chooseLocation.name}}</div>
        <div class="address" v-if="chooseLocation.address">{{chooseLocation.address}}</div>
        <div v-for="(item,index) in videoList" :key="index" v-if="item.videoUrl" >
            <video object-fit="cover" class="video" :src="item.videoUrl" :style="{width:videoWidth,height:videoHeight}" :autoplay="item.autoplay" :id="item.id" :danmu-list="item.danmuList" enable-danmu danmu-btn controls ></video>
            <picker @change="pickerChange(index,$event)" :value="item.speed" :range="speedRate">
                <div class="picker">
                    倍速播放：{{speedRate[item.speed]}}
                </div>
            </picker>
            <div class="danmu">
                <div class="label">弹幕内容</div>
                <input class="input" v-model="input" @blur="inputBlur(index,$event)" @input="onInput"/>
                <div @click="clearInput" class="clear" v-if="input">清空</div>
            </div>
            <button @click="sendDanmu(index,$event)" v-if="input">发射<span class="icon hangtiantubiao-"></span></button>
        </div>
        <button @click="selectVideo" class="uploadVideo">上传视频</button>
    </div>
</template>

<script>
  import navBar from '@/components/navBar'

  export default {
    name: "test2",
    components: {
      navBar
    },
    data() {
      return {
        input:'',
        videoWidth:'',
        videoHeight:'',
        speedRate:[0.5,0.8,1.0,1.25,1.5],
        chooseLocation:{},
        // http://video.699pic.com/videos/85/34/16/a_yKAE5yUh19ec1554853416.mp4
        videoList:[
          // {
          //     videoUrl:'',
          //     id:'',
          //     danmuList:[],
          //     speed:2,
          //     autoplay:true,
          //     inputValue:''
          // }
        ]
      };
    },
    // watch: {
    //   data: {
    //     handler(newValue, oldValue) {
    //       console.log("this is watching data:", newValue, oldValue);
    //     },
    //     //deep:true,
    //     immediate: true
    //   }
    // },
    // computed: {
    //   data() {
    //     return this.data;
    //   }
    // },
    onShareAppMessage(res){
      // 来自页面内的按钮的转发
      if( res.from === 'button' ){
        return {
          title:'按钮分享内容',
          path:'/pages/test/test2'
        }
      }
      return {
        title:'顶部分享内容',
        path:'/pages/test/test2'
      }
    },
    methods: {
      pickerChange(index,e){
        console.log('this is console pickchange: ',index,e);
        let context = wx.createVideoContext(`${this.videoList[index].id}`);
        this.videoList[index].speed = e.mp.detail.value;
        context.playbackRate(this.speedRate[this.videoList[index].speed]);
      },
      selectVideo(){
        let that = this;
        wx.util.chooseVideo({
          sourceType: ['album', 'camera'],
          maxDuration: 60,
          camera: ['front', 'back']
        }).then(res => {
          // wx.createVideoContext(`${res.tempFilePath}`);
          that.videoList.push({
            videoUrl:res.tempFilePath,
            id:res.tempFilePath,
            danmuList:[],
            speed:2,
            autoplay:true,
            inputValue:''
          });
          console.log('this is console test11111: ',res.tempFilePath);
          console.log('this is console test2222: ',that.videoList);
          // this.videoContext.play();
        });
      },
      sendDanmu(index,e){
        let that = this;
        if(this.input){
          // console.log('this is console danmupre: ',this.videoList[index].videoContext.sendDanmu);
          let context = wx.createVideoContext(`${this.videoList[index].id}`);
          // this.input = '';
          // this.videoList[index].inputValue = this.input;
          console.log('this is console danmu1: ',this.videoList[index].inputValue);
          context.sendDanmu({
            text: that.videoList[index].inputValue,
            color: 'blue'
          });
          // that.videoList[index].danmuList = {
          //   text: that.videoList[index].inputValue,
          //   color: 'blue'
          // };
          console.log('this is console danmu: ',this.videoList[index].danmuList);
        }
      },
      clearInput(){
        this.input = '';
      },
      inputBlur(index,e){
        console.log('this is console inputBlur: ',this.input,e.mp.detail.value);
        this.videoList[index].inputValue = e.mp.detail.value;
      },
      onInput(e){
        this.input = e.mp.detail.value;
      },
      selectLocation() {
        wx.util.userLocation().then(res => {
          wx.util.chooseLocation().then(res => {
            (!res.address || !res.name) && (wx.util.showToast({
              title: '请选择具体的地址',
              icon: 'none',
              duration: 3000,
              mask:true
            }).then(res => {
              this.selectLocation();
            }));
            this.chooseLocation = {
              address:res.address,
              name:res.name
            }
          }).catch(err => {
            wx.util.showToast(err);
          })
        }).catch(err => {
          wx.util.showToast(err);
        })
      },
      viewLocation() {
        wx.util.userLocation().then(res => {
          wx.util.getLocation({
            type:'gcj02'
          }).then(res => {
            let latitude = res.latitude;
            let longitude = res.longitude;
            wx.util.openLocation({
              latitude,
              longitude,
              scale: 20
            })
          })
        }).catch(err => {
          wx.util.showToast(err);
        })
      }
    },
    mounted() {
      console.log("this is mounted:", this.data);
      // 隐藏转发按钮
      wx.util.hideShareMenu();
      wx.util.getSystemInfo().then(res => {
        let windowWidth = res.windowWidth;
        let videoHeight = res.windowHeight;
        //video标签默认宽度300px、高度225px，设置宽高需要通过wxss设置width和height。
        // let videoHeight = (225 / 300) * windowWidth;//屏幕高宽比
        this.videoWidth = windowWidth + 'px';
        this.videoHeight = videoHeight + 'px';
        })
    },
    onShow() {
      this.videoList.map(item => {
        item.videoContext && (item.videoContext = wx.createVideoContext('item.id'));
      });
    },
    onUnload() {
      this.videoList = [];
    }
  };
</script>

<style lang="less" scoped>
    .test2{
        width: 100%;
        height: 100%;
        .address{
            width: 100%;
            background: #f8f8f8;
            text-align: center;
            font-size: 18px;
            line-height: 50px;
        }
        .name{
            width: 100%;
            background: #f8f8f8;
            text-align: center;
            font-size: 18px;
            line-height: 50px;
        }
        .picker{
            height: 35px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f8f8f8;
            font-size: 18px;
        }
        .video{
            text-align: center;
        }
        .danmu{
            width: 100%;
            height: 35px;
            line-height: 50px;
            display: flex;
            align-items: center;
            background: #f8f8f8;
            font-size: 18px;
            .label{
                width: 20%;
                text-align: center;
            }
            .input{
            }
            .clear{
                width: 20%;
            }
        }
        .uploadVideo{
            margin-top: 10px;
        }
    }
</style>