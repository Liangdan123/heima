<template>
  <div class="layout">
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item
        v-for="(item, index) in tabbarData"
        :key="index"
        :to="item.to"
      >
        <template #icon>
          <span :class="`toutiao ${item.icon}`"></span>
          <span class="icon_text">{{ item.text }}</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data() {
    return {
      tabbarData: [
        {
          to: '/ ',
          icon: 'toutiao-shouye1',
          text: '首页'
        },
        {
          to: '/video',
          icon: 'toutiao-shipin',
          text: '视频'
        },
        {
          to: '/qa',
          icon: 'toutiao-wenda',
          text: '问答'
        },
        {
          to: '/my',
          icon: 'toutiao-wode',
          text: '我的'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.van-tabbar-item__icon) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;

  .toutiao {
    font-size: 30px;
  }
  .icon_text {
    font-size: 30px;
  }
}
</style>
