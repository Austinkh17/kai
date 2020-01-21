<template>
    <div class="login">
        <van-cell-group>
            <van-field
                    :value="username"
                    required
                    clearable
                    label="用户名"
                    icon="question-o"
                    placeholder="请输入用户名"
                    @click-icon="onClickIcon"
            />
            <van-field
                    :value="password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
            />
        </van-cell-group>
        <button open-type="getUserInfo" @getuserinfo="onGotUserInfo">登录</button>
        <button open-type="getUserInfo" @getuserinfo="onGotUserInfo">注册</button>
        <button open-type="getUserInfo" @getuserinfo="onGotUserInfo">获取用户信息</button>
    </div>
</template>

<script>
  export default {
    name: "login",
    components: {},
    data() {
      return {};
    },
    computed: {},
    methods: {
      getUserInfo() {
      },
      onGotUserInfo() {}
    },
    mounted() {
      console.log("this is mounted:", this.data);
    }
  };
</script>

<style lang="less" scoped>
    .login{
        width: 100%;
        height: 100%;
    }
</style>