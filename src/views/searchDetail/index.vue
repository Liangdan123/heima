<template>
  <div class="search_detail">
    <nav-bar title="黑马头条"></nav-bar>

    <!-- 文章内容 -->
    <article-detail :detailData="detailData" @follow="follow"></article-detail>

    <!-- 文章底部 -->
    <!-- <van-popup v-model="show" position="bottom" :style="{ height: '20%' }">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-popup> -->
    <van-tabbar v-model="active">
      <van-tabbar-item class="write-comment">
        <van-button type="default" size="mini">写评论</van-button>
      </van-tabbar-item>
      <van-tabbar-item icon="comment-o" badge="0"></van-tabbar-item>
      <van-tabbar-item
        :icon="detailData.is_collected ? 'star' : 'star-o'"
        @click="collectionGood"
      ></van-tabbar-item>
      <van-tabbar-item
        :icon="
          detailData.attitude == -1 || detailData.attitude == 0
            ? 'good-job-o'
            : 'good-job'
        "
        @click="support"
      ></van-tabbar-item>
      <van-tabbar-item icon="share-o"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import navBar from '@/components/navBar'
import articleDetail from './components/articleDetail.vue'
import {
  searchDetail,
  articleCollectionsDel,
  articleCollections,
  articleLikingsDele,
  articleLikings
} from '@/api'
export default {
  name: 'searchDetail',
  props: ['id'],
  components: { navBar, articleDetail },
  data() {
    return {
      active: 1,
      detailData: {},
      show: true,
      message: ''
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
    follow(val) {
      this.getSearchDetail()
      this.detailData.is_followed = val
    },
    //文章收藏,取消文章收藏
    async collectionGood() {
      if (this.detailData.is_collected) {
        await articleCollectionsDel(this.detailData.art_id)
        this.detailData.is_collected = false
      } else {
        const res = await articleCollections(this.detailData.art_id)
        this.detailData.is_collected = true
      }
    },
    //对文章点赞，获取取消文章点赞
    async support() {
      if (this.detailData.attitude == -1 || this.detailData.attitude == 0) {
        console.log(77777)
        await articleLikings({ target: this.detailData.art_id })
        this.detailData.attitude = 1
      } else {
        console.log(8888888)
        await articleLikingsDele(this.detailData.art_id)
        this.detailData.attitude = 0
      }
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
:deep(.van-cell__value) {
  background-color: #f5f7f9;
  height: 200px;
}
</style>
