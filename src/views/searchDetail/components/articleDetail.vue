<template>
  <div class="content">
    <h1 class="title">{{ detailData.title }}</h1>

    <van-cell value="内容">
      <template #title>
        <div class="vant_title">
          <div class="content_img">
            <van-image width="36" height="36" :src="detailData.aut_photo" />
          </div>
          <div>
            <div>{{ detailData.aut_name }}</div>
            <div>{{ detailData.pubdate | timeFormat }}</div>
          </div>
        </div>
      </template>
      <template>
        <van-button
          type="info"
          size="mini"
          class="follow"
          :loading="btn_loading"
          @click="followUser"
          >{{ detailData.is_followed ? '取消关注' : '+关注' }}</van-button
        >
      </template>
    </van-cell>

    <div v-html="detailData.content" class="markdown-body text_content"></div>
    <div class="end">正文结束</div>
    <div class="more">没有更多</div>
  </div>
</template>

<script>
import { userFollowings, deleteUserFollow } from '@/api'
import dayjs from 'dayjs'
export default {
  props: {
    detailData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      isFollow: false,
      btn_loading: false
    }
  },
  filters: {
    timeFormat(val) {
      return dayjs(dayjs(val)).from().replace('years ago', '年前')
    }
  },
  methods: {
    async followUser() {
      this.btn_loading = true
      let follow = false
      if (this.detailData.is_followed) {
        //取消关注
        await deleteUserFollow(this.detailData.aut_id)
        follow = false
      } else {
        //添加关注
        const res = await userFollowings(this.detailData.aut_id)
        follow = true
      }
      this.$emit('follow', follow)
      this.btn_loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  overflow: hidden;
  font-size: 12px;
  .title {
    font-size: 34px;
    padding: 0.66667rem 0.42667rem;
    margin: 0;
    color: #3a3a3a;
  }
  .vant_title {
    display: flex;
    :deep(.content_img) {
      margin-right: 10px;
      .van-image__img {
        border-radius: 50%;
      }
    }
  }

  :deep(.follow) {
    width: 140px;
    height: 50px;
    border-radius: 25px;
    color: white;
    background: rgb(50, 150, 250);
    border-color: rgb(50, 150, 250);
  }
  .text_content {
    padding: 0 15px;
  }
  .end {
    color: #969799;
    text-align: center;
    margin-top: 20px;
  }
  .more {
    text-align: center;
    color: #969799;
    margin-top: 20px;
    margin-bottom: 200px;
  }
}
</style>
