<template>
    <div class="test1">
        <img src="https://static.runoob.com/images/demo/demo1.jpg">
    </div>
</template>

<script>
  export default {
    name: "test1",
    components: {},
    data() {
      return {
        key:2
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
    computed: {
      data() {
        return 1;
      }
    },
    methods: {
      name() {
      }
    },
    mounted() {
      console.log("this is mounted:", this.key);
    },
    onShow() {
      console.log("this is onShow:", this.key);
    },
    onUnload() {
      this.data = "";
      console.log("this is onUnload:", this.key);
    }
  };
</script>

<style lang="less" scoped>
    //less的mixin写法
    .image(@height,@width,@innerClass){
        width: 320px;
        background: red;
        position: relative;
        overflow: hidden;//需要触发BFC消除margin折叠的问题
        &:after{
            content: '';
            display: block;
            /*padding-top*/
            margin-bottom: (@height/@width)*100%;
        }
        .@{innerClass}{
            width: 100%;
            position: absolute;
            top: 0;
        }
    }
    .test1{
        .image(240px,320px,img);
    }
</style>