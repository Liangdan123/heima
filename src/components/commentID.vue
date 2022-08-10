<template>
  <ul>
    <li class="comment_list">
      <div class="header"><img :src="item.aut_photo" alt="" /></div>
      <div class="time">
        <p>{{ item.aut_name }}</p>
        <p>{{ item.content }}</p>
        <p>
          <span>{{ item.pubdate | relativeTime }}</span
          ><span class="huifu" @click="reply(item)"
            >回复{{ item.reply_count }}</span
          >
        </p>
      </div>
      <div class="zan"><van-icon name="good-job-o" />赞</div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    isReplay: {
      //是否需要点击回复存储数据
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  methods: {
    reply(item) {
      //   this.$emit('changeFlag')
      console.log(this.isReplay)
      if (this.isReplay) {
        //一级弹框中的回复
        this.$store.commit('SET_COMMENT_LIST', true)
        this.$store.commit('SET_REPLAT_DATA', item)
        console.log(8888)
      }
    }
  }
}
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.comment_list {
  margin-bottom: 40px;
  display: flex;

  padding: 0 15px;
  .header {
    width: 80px;
    height: 80px;
    margin-right: 40px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .time {
    width: 400px;
    font-size: 20px;
  }
  .huifu {
    display: inline-block;
    border: 1px solid #333;
    width: 120px;
    height: 40px;
    text-align: center;
    margin-left: 20px;
    border-radius: 20px;
  }
  .zan {
    margin-left: 100px;
    font-size: 20px;
  }
}
</style>
