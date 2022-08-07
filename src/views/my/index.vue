<template>
  <div class="my_page">
    <header class="header_bg">
      <!-- .....登录显示.... -->
      <div v-if="isLogin">
        <!-- 登录 -->
        <div class="user-info">
          <div class="main_img_name">
            <img :src="userInfo.photo" alt="头像" />
            <span>{{ userInfo.name }}</span>
          </div>
          <button @click="$router.push('/user')" class="edit-btn">
            编辑资料
          </button>
        </div>
        <div class="user-data">
          <div class="data-item">
            <span>{{ userInfo.art_count }}</span>
            <span>头条</span>
          </div>
          <div class="data-item">
            <span>{{ userInfo.fans_count }}</span>
            <span>粉丝</span>
          </div>
          <div class="data-item">
            <span>{{ userInfo.follow_count }}</span>
            <span>关注</span>
          </div>
          <div class="data-item">
            <span>{{ userInfo.like_count }}</span>
            <span>获赞</span>
          </div>
        </div>
      </div>
      <!-- .........未登录......... -->
      <div class="loginOut" v-else>
        <van-image
          width="80px"
          height="80px"
          fit="contain"
          :src="require('../../assets/images/mobile.png')"
        />
        <span>登录/注册</span>
      </div>
    </header>
    <main>
      <!-- ............收藏历史........... -->
      <div class="Collection_history">
        <div class="Collection_history_item">
          <span class="toutiao toutiao-shoucang"></span>
          <span class="span_item">收藏</span>
        </div>
        <div class="Collection_history_item">
          <span class="toutiao toutiao-lishi"></span>
          <span class="span_item">历史</span>
        </div>
      </div>
      <!-- .........消息通知/小智同学......... -->
      <div class="message">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <footer>
      <button v-if="isLogin" @click="loginOut">退出</button>
    </footer>
  </div>
</template>

<script>
import { userSelf } from '@/api'
export default {
  name: 'my',
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  created() {
    if (this.isLogin) {
      this.getUserSelf()
    }
  },
  methods: {
    async getUserSelf() {
      const { data } = await userSelf()
      console.log(444, data)
      this.userInfo = data.data
    },
    loginOut() {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出该账号?'
        })
        .then(() => {
          this.$store.commit('SET_TOKEN', {})
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
.header_bg {
  height: 400px;
  background: url('../../assets/images/banner.png');
  background-size: 100% 100%;
  border-top: 1px solid #fff;
}
.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-top: 100px;
  .main_img_name {
    display: flex;
    color: #fff;
    align-items: center;
    img {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      border: 1px solid #fff;
    }
    span {
      display: inline-block;
      font-size: 18px;
      font-weight: bold;
      margin-left: 10px;
    }
  }
  .edit-btn {
    width: 140px;
    height: 30px;
    line-height: 30px;
    color: #666;
    border-radius: 20px;
    border: 1px solid #666;
    font-size: 6px;
  }
}
.user-data {
  display: flex;
  justify-content: space-around;
  height: 180px;
  align-items: center;
  .data-item {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    color: #fff;
    font-size: 24px;
  }
}
.Collection_history {
  display: flex;
  padding: 40px 0;
  background-color: #fff;
  .Collection_history_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    .toutiao {
      color: #eb5253;
      font-size: 40px;
    }
    .span_item {
      color: #646566;
      font-size: 22px;
      word-break: break-all;
    }
  }
}
.message {
  margin-top: 20px;
}
footer {
  background-color: #fff;
  margin-top: 20px;
  text-align: center;
  button {
    background-color: #fff;
    border: none;
    color: red;
    font-size: 30px;
    padding: 20px 0;
  }
}
.loginOut {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  padding-top: 80px;
  span {
    font-size: 34px;
    margin-top: 10px;
  }
}
</style>
