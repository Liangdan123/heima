<template>
  <div>
    <header>
      <div class="login" v-if="isLogin">登录</div>
      <div class="loginOut" v-else>未登录</div>
    </header>
    <main>收藏/历史/消息通知/小智同学</main>
    <footer>
      <button v-if="isLogin" @click="loginOut">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      console.log(this)
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    loginOut() {
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style></style>
