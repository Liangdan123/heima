<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          round
          class="search-btn"
          icon="search"
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <!-- 文章 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannel" :key="item.id" :title="item.name">
        <!-- 内容  -->
        <article-list :id="item.id"></article-list>
      </van-tab>
      <span class="toutiao toutiao-gengduo1" @click="show = true"></span>
    </van-tabs>
    <!-- 频道弹层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-popup
        :myChannel="myChannel"
        @change-active="active = $event"
        @del-channel="delChannel"
        @add-channel="addChannel"
      ></channel-popup>
    </van-popup>
  </div>
</template>

<script>
import {
  getMyChannel as getMyChannelAPI,
  delChannels,
  userChannels,
  setMyChannelToLocal,
  getMyChannelByLocal
} from '@/api'
import articleList from './components/articleList.vue'
import channelPopup from './components/channelPopup.vue'
export default {
  name: 'home',
  data() {
    return {
      active: 1,
      myChannel: [],
      show: false
    }
  },
  components: { articleList, channelPopup },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  created() {
    // this.getMyChannel()
    this.initMyChannel()
  },
  methods: {
    initMyChannel() {
      if (this.isLogin) {
        //用户登录了
        //发送请求获取myChannel数据
        this.getMyChannel()
      } else {
        //用户未登录
        const myChannel = getMyChannelByLocal()
        if (myChannel) {
          //本地存储有myChannel，从本地拿myChannel
          this.myChannel = myChannel
        } else {
          //本地存储没有myChannel，重新调接口
          this.getMyChannel()
        }
      }
    },
    async getMyChannel() {
      try {
        const { data } = await getMyChannelAPI()
        this.myChannel = data.data.channels
      } catch (error) {
        console.log(error)
        this.$toast.fail('获取频道失败')
      }
    },
    async delChannel(id) {
      //删除服务器数据
      this.$toast.loading({
        message: '正在删除频道',
        forbidClick: true
      })
      try {
        const newChannel = this.myChannel.filter((item) => item.id != id)
        if (this.isLogin) {
          //线上的
          const { data } = await delChannels(id)
        } else {
          //本地存储
          setMyChannelToLocal(newChannel)
        }

        //删除页面的数据
        this.myChannel = newChannel
        this.$toast.success('删除频道成功')
      } catch (error) {
        this.$toast.fail('删除频道失败')
      }
    },
    //添加频道
    async addChannel(item) {
      this.$toast.loading({
        message: '正在添加频道',
        forbidClick: true
      })
      try {
        if (this.isLogin) {
          //线上的
          await userChannels(item.id, this.myChannel.length)
        } else {
          //本地存储
          setMyChannelToLocal([...this.myChannel, item])
        }

        this.myChannel.push(item)
        this.$toast.success('添加频道成功')
      } catch {
        this.$toast.fail('添加频道失败')
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
