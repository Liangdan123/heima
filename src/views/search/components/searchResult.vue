<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
      offset="1"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        :title="item.title"
        v-for="item in resultList"
        :key="item.art_id"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api'
import storage from '@/untils/storage'
export default {
  name: 'searchResult',
  props: {
    keyword: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      params: {
        page: 1,
        per_page: 20,
        q: ''
      },
      page: 1,
      resultList: [],
      loading: false,
      finished: false,
      error: false
    }
  },
  created() {
    this.$set(this.params, 'q', this.keyword)
    this.getSearchResult()
    this.getStorage()
  },
  methods: {
    //搜索历史记录
    getStorage() {
      //存储关键词
      const getHistory = storage.get('SEARCH_HISTORY') || []
      getHistory.unshift(this.keyword)
      const set1 = new Set(getHistory)
      const set2 = new Set([this.keyword])
      const setAll = new Set([...set1, ...set2])
      const listArr = Array.from(setAll)
      storage.set('SEARCH_HISTORY', listArr)
    },
    async getSearchResult() {
      const res = await this.getDataAPI()
      this.resultList = res.results
    },
    async getDataAPI() {
      try {
        const { data } = await getSearchResult(this.params)
        return data.data
      } catch (error) {
        console.log(error)
        this.error = true
      }
    },
    async onLoad() {
      this.page++
      this.$set(this.params, 'page', this.page)
      const res = await this.getDataAPI()
      this.resultList = [...this.resultList, ...res.results]
      if (this.resultList.length >= res.total_count) {
        this.finished = true
      }
      this.loading = false
    }
  }
}
</script>

<style></style>
