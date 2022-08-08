<template>
  <div class="search_detail">
    <nav-bar title="黑马头条"></nav-bar>

    <!-- 文章内容 -->
    <article-detail :detailData="detailData" @follow="follow"></article-detail>

    <!-- 文章底部 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '20%' }" />
    <van-tabbar v-model="active">
      <van-tabbar-item class="write-comment">
        <van-button type="default" size="mini">写评论</van-button>
      </van-tabbar-item>
      <van-tabbar-item icon="comment-o" badge="0"></van-tabbar-item>
      <van-tabbar-item icon="star-o"></van-tabbar-item>
      <van-tabbar-item icon="good-job-o"></van-tabbar-item>
      <van-tabbar-item icon="share-o"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import navBar from '@/components/navBar'
import articleDetail from './components/articleDetail.vue'
import { searchDetail } from '@/api'
export default {
  name: 'searchDetail',
  props: ['id'],
  components: { navBar, articleDetail },
  data() {
    return {
      active: 1,
      detailData: {},
      show: true
    }
  },
  created() {
    this.getSearchDetail()
  },
  methods: {
    async getSearchDetail() {
      const { data } = await searchDetail(this.id)
      this.detailData = data.data
    },
    follow() {
      this.getSearchDetail()
    }
  }
}
</script>

<style lang="less" scoped>
.search_detail {
  background-color: #fff;
  .write-comment {
    .van-button__content {
      width: 120px;
    }
  }
}
</style>
