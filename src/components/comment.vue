<template>
    <div class="comment-line">
        <div class="left">
            <image :src="comment.headerImage" class="headerImage"></image>
        </div>
        <div class="center">
            <div class="name">{{comment.name}}</div>
            <div class="content">{{comment.content}}</div>
            <div class="date">{{comment.date}}</div>
        </div>
        <div class="right">
            <span class="icon bianji" v-if="comment.isMyself"></span>
            <span class="icon pinglun"></span>
        </div>
    </div>
</template>

<script>
  export default {
    name: "comment",
    components: {},
    data() {
      return {
      };
    },
    props: {
      comment: {
        type: Object,
        default: {}
      }
    },
    watch: {
      num: {
        handler(newValue, oldValue) {
          console.log("this is watching num:", this.num);
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
      add() {
        this.num = '';
      }
    },
    mounted() {
      console.log("this is mounted1:", this.data);
    },
    onShow() {
      this.num = '0909';
      console.log("this is onShow1:", this.num);
    },
    onUnload() {
      this.data = "";
      console.log("this is onUnload1:", this.data);
    }
  };
</script>

<style lang="less" scoped>
    .comment-line{
        margin-left: calc(30vmin / 7.5);
        padding-top: calc(30vmin / 7.5);
        padding-bottom: calc(30vmin / 7.5);
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        background: pink;
        .left{
            width: calc(52vmin / 7.5);
            height: 100%;
            margin-right: calc(18vmin / 7.5);
            .headerImage{
                width: calc(52vmin / 7.5);
                height: calc(52vmin / 7.5);
            }
        }
        .center{
            flex: 1;
            .name{
                margin-bottom: calc(6vmin / 7.5);
            }
            .content{
                margin-bottom: calc(30vmin / 7.5);
            }
        }
        .right{
            width: calc(144vmin / 7.5);
            display: flex;
            flex-direction: column;
            margin-bottom: calc(35vmin / 7.5);
        }
    }
</style>