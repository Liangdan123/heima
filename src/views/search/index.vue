<template>
  <div>
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
        v-model.trim="keyword"
        shape="round"
        background="#3296fa"
        show-action
        placeholder="请输入搜索关键词"
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
        @cancel="$router.back()"
      />
    </form>
    <!-- 搜素历史，搜素结果，搜素建议 -->
    <!-- is指定动态组件的名字-->
    <component :is="componentName" :keyword="keyword"></component>
  </div>
</template>

<script>
import searchHistory from './components/searchHistory'
import searchResult from './components/searchResult'
import searchSuggestion from './components/searchSuggestion'
export default {
  name: 'search',
  data() {
    return {
      keyword: '',
      isShowSearchResult: false //是否显示搜素结果
    }
  },
  components: {
    searchHistory,
    searchResult,
    searchSuggestion
  },
  computed: {
    componentName() {
      //如果输入的是空字符串就显示搜素历史
      if (this.keyword.trim() === '') {
        return 'searchHistory'
      }
      //渲染搜所结果
      if (this.isShowSearchResult) {
        return 'searchResult'
      }

      //既不渲染搜素历史也不渲染搜所结果
      return 'searchSuggestion'
    }
  },
  methods: {
    onSearch() {
      this.isShowSearchResult = true
    },
    onSearchFocus() {
      //如果keyword为"“显示搜索历史
      //如果keyword有值显示搜索建议
      this.isShowSearchResult = false //把搜索结果排除在外
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
