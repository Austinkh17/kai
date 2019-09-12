<template>
    <div class="index">
        <nav-bar :title="'videoTitle'"
                 :navBackgroundColor="'pink'"
                 :titleColor="'green'"
                 :back-visible="true"
                 :home-path="'/pages/index'"></nav-bar>
        <comment v-for="(comment,index) in commentList" :key="index" :comment="comment"></comment>
    </div>
</template>

<script>
    import comment from '@/components/comment'
    import navBar from '@/components/navBar'
  export default {
    name: "index",
    components: {
      comment,
      navBar
    },
    data() {
      return {
        commentList:[
          {
            headerImage:'/static/images/icon-add.png',
            name:'888',
            content:'hellowooo涉世未深我所无扩多我多无扩无都扩我偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶',
            date:'2109-08-08',
            isMyself:true,
            children:[]
          },
          {
            headerImage:'/static/images/icon-add.png',
            name:'888',
            content:'hellowooo涉世未深我所无扩多我多无扩无都扩我偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶',
            date:'2109-08-08',
            isMyself:true,
            children:[{
              headerImage:'/static/images/icon-add.png',
              name:'888',
              content:'hellowooo涉世未深我所无扩多我多无扩无都扩我偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶偶',
              date:'2109-08-08',
              isMyself:true,
            }]
          }
        ]
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
    methods: {
      name() {
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
</style>