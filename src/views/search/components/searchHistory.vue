<template>
  <div>
    <van-cell title="搜索历史" value="内容">
      <van-icon name="delete-o" v-show="!isEidt" @click="isEidt = !isEidt" />
      <div class="delete" v-show="isEidt">
        <van-button type="default" size="mini" @click="allDelte"
          >全部删除</van-button
        >
        <van-button type="default" size="mini" @click="isEidt = false"
          >完成</van-button
        >
      </div>
    </van-cell>
    <van-cell
      v-for="(item, index) in historyList"
      :key="index"
      :title="item"
      @click="deleteOnly(item)"
    >
      <van-icon name="cross" v-show="isEidt" />
    </van-cell>
  </div>
</template>

<script>
import storage from '@/untils/storage'

export default {
  data() {
    return {
      isEidt: false,
      historyList: []
    }
  },
  created() {
    this.historyList = storage.get('SEARCH_HISTORY')
  },
  methods: {
    deleteOnly(name) {
      if (this.isEidt) {
        //处于编辑状态
        // console.log(storage.get('SEARCH_HISTORY'))
        // console.log(item)
        const storages = storage.get('SEARCH_HISTORY')
        const filters = storages.filter((item) => {
          return item != name
        })
        storage.set('SEARCH_HISTORY', filters)
        this.historyList = filters
      } else {
        this.$parent.keyword = name
        this.$parent.isShowSearchResult = true
      }
    },
    allDelte() {
      storage.set('SEARCH_HISTORY', [])
      this.historyList = []
    }
  }
}
</script>

<style lang="less" scoped>
.delete {
  .van-button {
    &.van-button--default {
      border: none;
    }
  }
}
</style>
