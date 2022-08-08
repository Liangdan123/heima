<template>
  <div class="search_detail">
    <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
  </div>
</template>

<script>
export default {
  name: 'navBar',
  props: {
    title: {
      type: String,
      default: () => {
        return '黑马头条'
      }
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.van-nav-bar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
</style>
