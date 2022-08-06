<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      class="navbar"
    />
    <!-- 用户信息 -->
    <van-cell title="头像" is-link value="内容" @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="userInfo.photo" />
      <input
        type="file"
        accept=".webp,.png"
        hidden
        ref="file"
        @change="selectPhoto"
      />
    </van-cell>
    <!-- 头像弹层 -->
    <van-popup
      v-model="isShowAvator"
      class="avator-popUp"
      closeable
      :style="{ height: '100%', width: '100%' }"
    >
      <!-- 判断v-if是因为cropper需要调用多次，v-if可以促发生命周期 -->
      <updata-avator
        :photo="photo"
        v-if="isShowAvator"
        @updata-avtor="userInfo.photo = $event"
      ></updata-avator>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
import updataAvator from './components/updataAvator.vue'
import { resolveToBase64 } from '@/untils'
export default {
  name: 'user',
  data() {
    return {
      userInfo: {},
      isShowAvator: false,
      photo: ''
    }
  },
  components: { updataAvator },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        console.log(data)
        this.userInfo = data.data
      } catch (error) {
        this.$toast.fail('获取用户信息失败，请刷新')
      }
    },
    //用户选择图片后如何显示图片?
    // 1. 获取file对象  --> e.target.files
    // 2. 把file对象转成img的src可识别的格式
    //    - objectUrl  --> URL.createObjectUrl(file对象)
    // - 缺点: 内存泄露  因为跟document绑定在一起
    // - 优点: 写法简单
    //    - Base64   --> FileReader(读文件对象)
    // - fr.readAsDataURL(file)
    // - fr.onload = (e)=>{  e.target.result  }
    async selectPhoto(e) {
      //e.target触发事件的元素
      //e.target.files 伪数组，存储用户选择的所有文件对象
      const files = e.target.files[0]

      //解析成src能够识别的src
      //URL.createObjectURL方法
      // const url = window.URL.createObjectURL(files) //缺点内存泄露 是于document绑定一起
      // this.photo = url
      //让用户可以选择同一张图片（因为是change事件，只有发生改变的时候才执行）
      // e.target.value = ''
      // this.isShowAvator = true

      //转成base64方法
      // const fr = new FileReader() //转成base64
      // // 使用这个对象身上的方法读取文件中的内容
      // fr.readAsDataURL(files) //有DataURL说明是base64
      // // 由于这个读取事件是异步的，所以需要用箭头函数去进行操作
      // fr.onload = (e) => {
      //   this.photo = e.target.result
      //   e.target.value = ''
      //   this.isShowAvator = true
      // }

      //第三种方法
      const url = await resolveToBase64(files)
      this.photo = url
      e.target.value = ''
      this.isShowAvator = true
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.navbar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.avator-popUp {
  background-color: #000;
}
</style>
