<template>
  <div>
    <van-pull-refresh
      v-model="refreshingLoading"
      @refresh="loadNextPageArticle"
      success-text="刷新文章成功"
    >
      <van-list
        @load="loadNextPageArticle"
        offset="0"
        :immediate-check="false"
        v-model="loading"
        finished-text="没有更多文章了"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        >
        </article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
//loading为false时可以触发load事件，loading为true时不可以触发load事件
//触发load事件自动将loading设置成true
import { getArticleAPI } from '@/api'
import articleItem from '@/components/articleItem'
export default {
  name: 'articleList',
  components: { articleItem },
  props: {
    id: {
      type: [String, Number],
      require: true
    }
  },
  data() {
    return {
      articles: [], //传输结果是异步的，网速慢的情况下articles就是一个空数组
      loading: false,
      pre_timestamp: '',
      finished: false,
      error: false,
      refreshingLoading: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    //获取第一页
    async getFirstPageArticle() {
      try {
        const { data } = await getArticleAPI(this.id, +new Date())
        this.articles = data.data.results
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.$toast.fail('请重新获取文章')
      }
    },
    //加载下一页
    async loadNextPageArticle() {
      try {
        const { data } = await getArticleAPI(this.id, this.pre_timestamp)
        const timestamp = data.data.pre_timestamp
        const results = data.data.results
        //判断是否加载完成
        if (timestamp == null) {
          this.finished = true
        }
        //存储数据
        if (this.refreshingLoading) {
          this.articles.unshift(...results)
        } else {
          this.articles.push(...results)
        }

        //更新时间戳
        this.pre_timestamp = timestamp
        //更新loading
      } catch (error) {
        this.error = true
      } finally {
        //无论加载成功与否都会走到这里
        this.loading = false
        this.refreshingLoading = false
      }
    }
  }
}
</script>

<style></style>
