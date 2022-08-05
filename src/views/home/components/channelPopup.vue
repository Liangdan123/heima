<template>
  <div class="channel">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button round size="small" class="edit-btn" @click="isEdit = !isEdit">
        {{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(item, index) in myChannel"
        :key="item.id"
        :text="item.name"
        class="my_channel_item"
        :class="['my_channel_item', { active: item.name === '推荐' }]"
        @click="changeActive(index, item)"
      >
        <template #icon>
          <van-icon name="cross" v-show="isEdit && item.name !== '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="item in recommendChannel"
        :key="item.id"
        :text="item.name"
        icon="plus"
        class="recommend-item"
        @click="$emit('add-channel', item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getChannels as getChannelsAPI } from '@/api'
export default {
  props: {
    myChannel: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      isEdit: false,
      allChannek: []
    }
  },
  computed: {
    recommendChannel() {
      return this.allChannek.filter((item) => {
        //如果item在myChannel里出现就过滤掉
        return !this.myChannel.find((aItem) => item.id === aItem.id) //find没满足条件就变undefined,满足条件变true
      })
    }
  },
  created() {
    this.getChannels()
  },
  methods: {
    async getChannels() {
      const { data } = await getChannelsAPI()
      this.allChannek = data.data.channels
    },
    changeActive(index, item) {
      if (this.isEdit) {
        //删除我的频道
        if (item.name == '推荐') return
        console.log(777)
        this.$emit('del-channel', item.id)
      } else {
        //关闭弹框
        this.$parent.$parent.show = false
        //切换tab active
        this.$emit('change-active', index)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.channel {
  padding-top: 1.33rem;

  .edit-btn {
    width: 104px;
    height: 48px;
    color: red;
    &.van-button--default {
      border-color: red;
    }
  }
  :deep(.van-grid-item__content) {
    background-color: #eee;
  }
  .recommend-item {
    :deep(.van-grid-item__content) {
      flex-direction: row;
      align-items: center;
    }
    :deep(.van-grid-item__icon) {
      font-size: 34px;
    }
    :deep(.van-grid-item__text) {
      margin-top: 0;
    }
  }
  :deep(.my_channel_item) {
    .van-grid-item__content {
      position: relative;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-icon-cross {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      transform: translate(45%, -50%);
      border: 2px solid #000;
      border-radius: 50%;
      z-index: 300;
    }
  }
}
</style>
