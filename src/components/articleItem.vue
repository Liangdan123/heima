<template>
  <van-cell
    v-if="articleInfo.cover.type === 0"
    :title="articleInfo.title"
    :label="label"
  />
  <van-cell
    v-else-if="articleInfo.cover.type === 1"
    :title="articleInfo.title"
    value="内容"
    :label="label"
  >
    <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
  </van-cell>
  <van-cell v-else :title="articleInfo.title">
    <!-- <div style="display: flex">
      <van-image
        v-for="(item, index) in articleInfo.cover.images"
        :key="index"
        :src="item"
      />
    </div> -->
    <template #label>
      <div style="display: flex">
        <van-image
          height="100px"
          v-for="(item, index) in articleInfo.cover.images"
          :key="index"
          :src="item"
        />
      </div>
      <span>{{ label }}</span>
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'articleItem',
  props: {
    articleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      return `${this.articleInfo.aut_name} ${this.articleInfo.comm_count}评论 ${this.articleInfo.pubdate}`
    }
  }
}
</script>

<style></style>
