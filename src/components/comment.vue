<template>
  <div class="commentList">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      offset="0"
      @load="onLoad"
    >
      <comment-ID
        v-for="(item, index) in commentsList"
        :key="index"
        :item="item"
        :isReplay="isArt"
      ></comment-ID>
    </van-list>
  </div>
</template>

<script>
import { commentsList, commentsPulisher } from '@/api'
import commentID from './commentID.vue'
import dayjs from 'dayjs'
export default {
  name: 'comment',
  data() {
    return {
      loading: false,
      finished: false,
      artInfo: {
        //文章评论list
        type: 'a',
        source: '',
        offset: '',
        limit: 10
      },
      artCommentAll: {},
      commentsList: []
    }
  },
  props: {
    isArt: {
      //是否是文章的评论（回复的评论也在这里）
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  components: { commentID },
  mounted() {
    this.$bus.$on(
      this.isArt ? 'pushAticle' : 'publishComment',
      async (data) => {
        this.$toast.loading({
          message: '正在加载中...',
          forbidClick: true
        })
        // const res = await commentsPulisher({
        //   target: this.$route.params.id,
        //   content: data
        // })
        let res
        if (this.isArt) {
          console.log('ooooooooooo')
          res = await commentsPulisher({
            target: this.$route.params.id,
            content: data
          })
        } else {
          console.log('pppppppppp')
          res = await commentsPulisher({
            target: this.$store.state.replayData.com_id,
            content: data,
            art_id: this.$route.params.id
          })
          this.$store.commit('ADD_REPLAY_COUNT', 1)
        }
        const result = res.data.data
        const commentItem = [
          {
            aut_id: result.new_obj.aut_id,
            aut_name: result.new_obj.aut_name,
            aut_photo: result.new_obj.aut_photo,
            com_id: result.com_id,
            content: result.new_obj.content,
            is_followed: null,
            is_liking: result.new_obj.is_liking,
            like_count: result.new_obj.like_count,
            pubdate: result.new_obj.pubdate,
            reply_count: result.new_obj.reply_count
          }
        ]
        this.commentsList.unshift(...commentItem)
        // this.$store.commit('SET_TOTAL_NUM', this.commentsList.length)
        this.$toast.success('评论成功')
      }
    )
  },
  beforeDestroy() {
    // this.$bus.$off('pushAticle')
    this.$bus.$off('publishComment')
  },
  created() {
    if (this.isArt) {
      //对文章的评论
      this.artInfo = Object.assign(this.artInfo, {
        source: this.$route.params.id,
        type: 'a'
      })
    } else {
      //对评论的回复
      this.artInfo = Object.assign(this.artInfo, {
        source: this.$store.state.replayData.com_id,
        type: 'c'
      })
    }
    // this.getCommentsList(this.artInfo)
  },
  filters: {
    timeFormat(val) {
      return dayjs(val).fromNow()
    }
  },
  methods: {
    async getCommentsList(params) {
      const { data } = await commentsList(params)
      this.$store.commit('SET_TOTAL_NUM', data.data.total_count)
      this.artCommentAll = data.data
      this.commentsList = data.data.results
    },
    async onLoad() {
      const { data } = await commentsList(this.artInfo)
      const lastId = data.data.last_id
      this.$set(this.artInfo, 'offset', lastId)
      if (lastId == null) {
        //为null就表示加载完成
        this.finished = true
      }
      this.commentsList.push(...data.data.results)
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.commentList {
  margin-bottom: 100px;
}
</style>
