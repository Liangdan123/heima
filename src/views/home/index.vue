<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round class="search-btn" icon="search">搜索</van-button>
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannel" :key="item.id" :title="item.name">
        <!-- 内容 1 -->
        <article-list :id="item.id"></article-list>
      </van-tab>

      <span class="toutiao toutiao-gengduo1"></span>
    </van-tabs>
  </div>
</template>

<script>
import { getMyChannel as getMyChannelAPI } from '@/api'
import articleList from './components/articleList.vue'
export default {
  name: 'home',
  data() {
    return {
      active: 1,
      myChannel: []
    }
  },
  components: { articleList },
  created() {
    this.getMyChannel()
  },
  methods: {
    async getMyChannel() {
      try {
        const { data } = await getMyChannelAPI()
        this.myChannel = data.data.channels
      } catch (error) {
        console.log(error)
        this.$toast.fail('获取频道失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  position: sticky;
  left: 0;
  top: 0;
  :deep(.van-nav-bar__title) {
    max-width: unset; //不设置
  }
}
.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;
  .van-icon {
    color: #fff;
  }
  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
// :deep(.van-tab__pane) {
//   //使用calc需要加空格
//   min-height: calc(100vh - 92px - 88px - 100px);
// }
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
  background: #fff;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}
/* 字体图标 */
.toutiao-gengduo1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  position: fixed;
  top: 92px;
  right: 0;
  z-index: 999;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 88px - 100px);
  padding-bottom: 100px;
  overflow: auto;
}
</style>
