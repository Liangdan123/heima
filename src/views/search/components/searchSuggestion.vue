<template>
  <div>
    <van-cell
      v-for="(item, index) in higthLigthSuggestion"
      :key="index"
      icon="search"
    >
      <!-- 使用插槽识别结构 -->
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionAPI } from '@/api'
import { debounce } from 'lodash'
//1.动态正则
// 字面量/aasd/ig
//new RegExp(变量，"ig")
//2.字符串的replace
// 第一个参数可以是正则
//第二个参数可以是函数，函数的返回值是要替换的字符串
//match:正则匹配上的字符
// "Auglar".replace(/a/ig,function(match){
//return `<span>${match}</span>`
//})

export default {
  props: {
    keyword: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      suggestion: []
    }
  },
  watch: {
    keyword: {
      immediate: true, //第一次拿值不会触发，除非immediate变成true（先有变化再有组件）（watch不回在创建阶段自动自行）
      handler() {
        this.getSearchSuggestion()
      }
    }
  },
  computed: {
    //map是映射关系
    higthLigthSuggestion() {
      const reg = new RegExp(this.keyword, 'ig')
      return this.suggestion.map((item) =>
        item.replace(reg, (match) => `<span style="color:red;">${match}</span>`)
      )
    }
  },
  methods: {
    //防抖
    //1.延迟执行
    //2.干掉上一次的执行结果
    //3.clearTimeout(id)
    //处理搜索建议+防抖
    //单一职责原则
    // async getSearchSuggestion() {
    //   clearTimeout(this.id)
    //   this.id = setTimeout(async () => {
    //     try {
    //       const { data } = await getSearchSuggestionAPI(this.keyword)
    //       this.suggestion = data.data.options
    //     } catch (error) {
    //       this.$toast.fail('获取建议失败')
    //     }
    //   }, 300)
    // }
    //下载了lodash
    getSearchSuggestion: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionAPI(this.keyword)
        // this.suggestion = data.data.options
        this.suggestion = data.data.options.filter((str) => Boolean(str))
        // this.suggestion = data.data.options.filter(Boolean)//没有参数就自动往里添加参数
      } catch (error) {
        this.$toast.fail('获取建议失败')
      }
    }, 300)
  }
}
</script>

<style></style>
