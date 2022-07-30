<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from '@/untils/request'
export default {
  created() {},
  methods: {}
}
</script>

<style lang="less">
.login {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  border: none;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
