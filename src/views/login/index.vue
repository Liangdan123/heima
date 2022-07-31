<template>
  <div>
    <van-nav-bar title="登录" />

    <!-- 原生表单：去掉name不能提交 -->
    <!-- form表单里，button点击的时候回默认提交 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji1"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRuels"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            round
            size="mini"
            class="code-btn"
            native-type="button"
            v-if="isShowCode"
            @click="sendCode"
          >
            发送验证码
          </van-button>
          <van-count-down
            :time="6 * 1000"
            format="ss秒"
            v-else
            @finish="isShowCode = true"
          />
        </template>
      </van-field>
      <div style="margin: 0.42rem">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRuels } from './rules'
import { login, getCodeAPI } from '@/api'
export default {
  name: 'login',
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRuels,
      isShowCode: true
    }
  },
  methods: {
    toast() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    async onSubmit() {
      try {
        //res是什么？
        //axios封装的对象，它把服务端返回的数据放在res.data里

        //res是什么
        //promise的resolve的值

        //error是什么
        //Promis reject的结果
        //axios封装的error
        //error.response.data是服务端返回的数据
        //error.response.status是服务端返回的状态码
        this.toast()
        const {
          data: { data }
        } = await login(this.mobile, this.code)
        this.$toast.success('登录成功')
        this.$store.commit('SET_TOKEN', data)
        this.$router.push('/my')
      } catch (error) {
        // this.$toast.fail("加载失败")
        console.dir(error)
        const status = error.response.status
        let message = '请重新登录'
        if (status == 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    sendCode() {
      this.$refs.form.validate('mobile').then(async () => {
        this.toast()
        try {
          await getCodeAPI(this.mobile)
          this.$toast.success('获取验证码成功')
          this.isShowCode = false
        } catch (err) {
          const status = err.response.status
          let message = '手机格式不正确'
          if (status == 429) {
            message = err.response.data.message
          }
          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
//穿透样式
//：deep(穿透的类名)
.van-nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.toutiao {
  font-size: 40px;
}
:deep(form) {
  .van-field__label {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
}
:deep(.code-btn) {
  &.van-button--default {
    background-color: #eee;
    color: #a9929b;
  }
  &.van-button--mini {
    padding: 0 0.2rem;
  }
}
</style>
