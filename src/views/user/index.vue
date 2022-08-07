<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      class="navbar"
    />

    <!-- .....用户信息 ......-->
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
    <!-- .....头像弹层..... -->
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
    <!--........ 昵称....... -->
    <van-cell title="昵称" is-link :value="userInfo.name" @click="nickyShow" />
    <van-popup
      v-model="isNickShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <van-field
        v-model="nicky"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-popup>

    <!-- 性别 -->
    <van-cell
      title="性别"
      is-link
      :value="sexChange"
      @click="sexShowPop = true"
    />

    <van-popup
      v-model="sexShowPop"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        title="更新性别"
        show-toolbar
        :columns="sexColum"
        @confirm="onConfirmSex"
        @cancel="onCancelSex"
      />
    </van-popup>

    <!--........... 生日........ -->
    <van-cell
      title="生日"
      is-link
      :value="userInfo.birthday"
      @click="birthdayEvent"
    />

    <van-popup
      v-model="birthdayShow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <!-- <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="new Date()"
        :max-date="new Date()"
      /> -->

      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmBirthday"
        @cancel="cancleBirthday"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo, userProfile } from '@/api'
import updataAvator from './components/updataAvator.vue'
import { resolveToBase64 } from '@/untils'
import moment from 'moment'
export default {
  name: 'user',
  data() {
    return {
      userInfo: {
        birthday: '',
        gender: '',
        id: '',
        mobile: '',
        name: '',
        photo: ''
      },
      isShowAvator: false,
      isNickShow: false,
      nicky: '',
      sexColum: ['男', '女'],
      sexShowPop: false,
      birthdayShow: false,
      currentDate: '',
      minDate: new Date(1970, 1, 1),
      maxDate: new Date(2025, 10, 1)
    }
  },
  components: { updataAvator },
  created() {
    this.getUserInfo()
  },
  computed: {
    sexChange() {
      return this.userInfo.gender == 0 ? '男' : '女'
    }
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        this.getBirthday(this.userInfo)
      } catch (error) {
        this.$toast.fail('获取用户信息失败，请刷新')
      }
    },
    //处理生日数据
    getBirthday(userInfo) {
      if (userInfo.birthday) {
        const birthdayArr = userInfo.birthday.split('-')
        const [a, b, c] = birthdayArr
        this.currentDate = new Date(a, b - 1, c)
      }
    },
    //调接口（编辑用户个人资料）
    async editUserInfo(params) {
      const res = await userProfile(params)
      console.log(999, res)
      this.$toast.success('加载成功')
    },

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
    },
    nickyShow() {
      this.isNickShow = true
      this.nicky = this.userInfo.name
    },
    onClickLeft() {
      this.isNickShow = false
    },
    onClickRight() {
      this.$toast.loading({
        message: '正在加载中...',
        forbidClick: true
      })
      this.editUserInfo({ name: this.nicky })
      this.$set(this.userInfo, 'name', this.nicky)
      this.isNickShow = false
    },
    //性别确认
    onConfirmSex(value) {
      const gender = value == '男' ? 0 : 1
      this.editUserInfo({ gender })
      this.$set(this.userInfo, 'gender', gender)
      this.sexShowPop = false
    },
    onCancelSex() {
      this.sexShowPop = false
    },
    birthdayEvent() {
      this.birthdayShow = true
    },
    confirmBirthday(value) {
      console.log(this.currentDate)
      const val = moment(value).format('YYYY-MM-DD')
      this.editUserInfo({ birthday: val })
      this.$set(this.userInfo, 'birthday', val)
      this.birthdayShow = false
    },
    cancleBirthday() {
      this.birthdayShow = false
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
