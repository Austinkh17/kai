<template>
    <div class="test2">
        <button @click="viewLocation">查看位置</button>
        <button @click="selectLocation">选择位置</button>
        <button open-type="share">分享</button>
        <div class="name" v-if="chooseLocation.name">{{chooseLocation.name}}</div>
        <div class="address" v-if="chooseLocation.address">{{chooseLocation.address}}</div>
        <div v-for="(item,index) in videoList" :key="index" v-if="item.videoUrl" >
            <video :src="item.videoUrl" :style="{width:videoWidth,height:videoHeight}" :id="item.video" :danmu-list="item.danmuList" enable-danmu danmu-btn controls ></video>
            <picker @change="pickerChange" :value="item.speed" :range="speedRate">
                <div class="picker">
                    倍速播放：{{speedRate[item.speed]}}
                </div>
            </picker>
            <div class="danmu">
                <div class="label">弹幕内容</div>
                <input class="input" @blur="inputBlur"/>
            </div>
            <button @click="sendDanmu">发射</button>
        </div>
        <button @click="selectVideo" class="uploadVideo">上传视频</button>
    </div>
</template>

<script>
  export default {
    name: "test2",
    components: {},
    data() {
      return {
        videoWidth:'',
        videoHeight:'',
        speedRate:[0.5,0.8,1.0,1.25,1.5],
        chooseLocation:{},
        // http://video.699pic.com/videos/85/34/16/a_yKAE5yUh19ec1554853416.mp4
        videoList:[{
          // videoUrl:'',
          // id:'',
          // danmuList:[],
          // speed:2,
          // videoContext:'',
          // inputValue:''
        }]
      };
    },
    watch: {
      data: {
        handler(newValue, oldValue) {
          console.log("this is watching data:", newValue, oldValue);
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
      pickerChange(e){
        this.speed = e.mp.detail.value;
        this.videoContext.playbackRate(this.speedRate[this.speed]);
      },
      selectVideo(){
        let that = this;
        wx.util.chooseVideo({
          sourceType: ['album', 'camera'],
          maxDuration: 60,
          camera: ['front', 'back']
        }).then(res => {
          that.videoList.push({
            videoUrl:res.tempFilePath,
            id:res.tempFilePath,
            danmuList:[],
            speed:2,
            videoContext:'',
            inputValue:''
          });
          console.log('this is console test11111: ',res.tempFilePath);
          console.log('this is console test2222: ',that.videoUrl);
          this.videoContext.play();
        })
      },
      sendDanmu(){
        this.videoContext.sendDanmu({
          text: this.inputValue,
          color: 'pink'
        });
        console.log('this is console danmu: ',this.danmuList);
      },
      inputBlur(e){
        this.inputValue = e.mp.detail.value;
        e.mp.detail.value = '';
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
        //video标签默认宽度300px、高度225px，设置宽高需要通过wxss设置width和height。
        let videoHeight = (225 / 300) * windowWidth;//屏幕高宽比
        this.videoWidth = windowWidth + 'px';
        this.videoHeight = videoHeight + 'px';
        })
    },
    onShow() {
      console.log("this is onShow:", this.data);
      this.videoContext = wx.createVideoContext('video');
    },
    onUnload() {
      this.data = "";
      console.log("this is onUnload:", this.data);
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
        #video{
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
        }
        .uploadVideo{
            margin-top: 10px;
        }
    }
</style>