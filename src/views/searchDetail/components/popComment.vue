<template>
  <div>
    <van-nav-bar>
      <template #title>
        {{
          $store.state.replayData.reply_count == 0
            ? '暂无回复'
            : `${$store.state.replayData.reply_count}条回复`
        }}
      </template>
    </van-nav-bar>

    <div class="replayOnly">
      <comment-ID
        :item="$store.state.replayData"
        :isReplay="false"
      ></comment-ID>
    </div>

    <!-- $store.state.commentList重走生命周期 -->
    <comment :isArt="false" v-if="$store.state.commentList"></comment>

    <van-tabbar>
      <van-button type="warning" @click="replayComment">评论</van-button>
    </van-tabbar>
  </div>
</template>

<script>
import commentID from '@/components/commentID'
import comment from '@/components/comment'
export default {
  name: 'PopComment',
  data() {
    return {
      // flag: true,
    }
  },
  computed: {},
  components: { commentID, comment },
  methods: {
    replayComment() {
      this.$emit('replayComment')
    },
    setFalse() {
      this.flag = false
    }
  }
}
</script>

<style lang="less" scoped>
.replayOnly {
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}
:deep(.van-tabbar--fixed) {
  background-color: #ff69b4;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-button--warning {
    background-color: #fff;
    color: #333;
    width: 90%;
    height: 80px;
    border-radius: 40px;
  }
}
</style>
