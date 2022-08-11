import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/untils/storage'
import { setToken, getToken } from '@/untils/auth'

Vue.use(Vuex)
// vuex
// 本质就是仓库，存放数据
// vuex的数据是响应式的
// vue的数据是自产自销的 vuex的数据必须在vuex里修改
// mutaitions定义方法去修改，在外接调用这个方法
// mutaitions方法建议是大写 接受两个参数，其中一个是state
// $store.commit('方法名字')用于触发mutaitions里的方法
export default new Vuex.Store({
  state: {
    // tokenObj:JSON.parse(localStorage.getItem("HEIMA_TOUTIAO_TOKEN"))||{}
    // tokenObj:storage.get("HEIMA_TOUTIAO_TOKEN")||{}
    tokenObj: getToken() || {},
    commentList: false, //评论二级弹框显示不显示
    replayData: {},
    total_num: ''
    // target: '' //回复中的评论id
  },

  mutations: {
    SET_TOKEN(state, payload) {
      //改变state中的数据
      state.tokenObj = payload
      // localStorage.setItem("HEIMA_TOUTIAO_TOKEN",JSON.stringify(payload))
      // storage.set("HEIMA_TOUTIAO_TOKEN",payload)
      //本地存储
      setToken(payload)
    },
    SET_COMMENT_LIST(state, isShow) {
      state.commentList = isShow
    },
    SET_REPLAT_DATA(state, commentItem) {
      state.replayData = commentItem
    },
    SET_TOTAL_NUM(state, num) {
      state.total_num = num
    },
    //回复评论数据+1
    ADD_REPLAY_COUNT(state, count) {
      state.replayData.reply_count += count
    }
    // SET_COM_ID(state, target) {
    //   state.target = target
    // }
  }
})
