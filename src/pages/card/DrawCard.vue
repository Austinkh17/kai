<template>
    <div class="drawCard">
        <div class="top">
            <div class="card-back" v-for="item in [0,1,2,3]" :key="item" v-if="isBack">
                <div class="img-back">
                    <image class="image-back" src='/static/images/card.jpg' mode="scaleToFill"></image>
                </div>
            </div>
            <div class="card" v-for="(item,index) in info" :key="index" v-if="!isBack">
                <div class="img">
                    <image class="image" :src="item.img" mode="scaleToFill"></image>
                </div>
                <div class="info">{{item.name}}</div>
            </div>
        </div>
        <div class="bottom" @click="drawCard">
            <button>{{btnWord}}</button>
        </div>
    </div>
</template>

<script>
  export default {
    name: "DrawCard",
    components: {},
    data() {
      return {
        isBack:true,
        info:[],
        list:[]
      }
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
    computed: {
      btnWord() {
        return this.isBack?'4连抽':'再抽4次';
      }
    },
    methods: {
      drawCard() {
        this.info = [];
        let random1 = Math.floor(Math.random()*7);
        let random2 = Math.floor(Math.random()*7);
        let random3 = Math.floor(Math.random()*7);
        let random4 = Math.floor(Math.random()*7);
        this.list.map((item,index) => {
          index === random1 && this.info.push(item);
          index === random2 && this.info.push(item);
          index === random3 && this.info.push(item);
          index === random4 && this.info.push(item);
        });
        this.isBack = !this.isBack;
      },
      getCardList(){
        this.list =  [
          {
            name:'鲁班七号',
            img:'http://shp.qpic.cn/ishow/2735081417/1565774310_84828260_3934_sProdImgNo_4.jpg/0'
          },
          {
            name:'虞姬',
            img:'http://shp.qpic.cn/ishow/2735081416/1565770486_84828260_19149_sProdImgNo_4.jpg/0'
          },
          {
            name:'鲁班七号',
            img:'http://shp.qpic.cn/ishow/2735071618/1563271868_-1294974199_7569_sProdImgNo_4.jpg/0'
          },
          {
            name:'虞姬',
            img:'http://shp.qpic.cn/ishow/2735071118/1562841241_587358052_24910_sProdImgNo_4.jpg/0'
          },
          {
            name:'虞姬',
            img:'http://shp.qpic.cn/ishow/2735062811/1561692453_-695593207_23925_sProdImgNo_4.jpg/0'
          },
          {
            name:'鲁班七号',
            img:'http://shp.qpic.cn/ishow/2735062713/1561615047_587358052_6445_sProdImgNo_4.jpg/0'
          },
          {
            name:'虞姬',
            img:'http://shp.qpic.cn/ishow/2735070910/1562640169_1186005513_17698_sProdImgNo_4.jpg/0'
          },
          {
            name:'虞姬',
            img:'http://shp.qpic.cn/ishow/2735062714/1561616686_-695593207_18038_sProdImgNo_4.jpg/0'
          }
        ]
      }
    },
    mounted() {
      this.getCardList();
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
    @keyframes show-card {
        from {
            -webkit-filter: brightness(0);
            filter: brightness(0);
            transform: scale(10);
            opacity: 0; }
        80% {
            -webkit-filter: brightness(0.5);
            filter: brightness(0.5);
            transform: scale(1); }
        90% {
            transform: scale(1.2); }
        to {
            -webkit-filter: brightness(1);
            filter: brightness(1);
            opacity: 1; }
    }
    .drawCard{
        width: 100%;
        /*height: 100%;*/
        display: flex;
        flex-direction: column;
        background-image: url('http://cool.miaov.com/170309/card/src/img/common/main-bg.jpg');
        .top{
            width: 100%;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            .card-back {
                width: 160px;
                height: 220px;
                margin-top: 20px;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                .img-back {
                    width: 100%;
                    height: 100%;
                    .image-back {
                        width: 100%;
                        height: 100%;
                        border-radius: 10px;
                    }
                }
            }
            .card{
                width: 160px;
                height: 220px;
                margin-top: 20px;
                box-sizing: border-box;
                padding: 5px;
                border: 1px solid #9a9a9a;
                border-radius: 10px;
                box-shadow: 0 0 4px 3px #7b95ff, inset 0 0 2px 1px grey;
                background-color: #fff;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                opacity: 0;
                animation: show-card .8s 1s linear forwards;
                .img{
                    width: 100%;
                    height: 80%;
                    .image{
                        width: 100%;
                        height: 100%;
                        border-radius: 10px;
                    }
                }
                .info{
                    flex: 1;
                    padding: 10px;
                }
            }
        }
        .bottom{
            width: 100%;
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
            .button{
                width: 50%;
                height: 100%;
            }
        }
    }
</style>