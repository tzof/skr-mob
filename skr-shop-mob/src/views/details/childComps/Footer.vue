<!--
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-22 15:04:35
 * @LastEditors: stride
 * @LastEditTime: 2021-05-06 16:43:36
-->
<template>
  <div class="Footer">
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="serveClick" />
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="$store.state.login.userInfo?parseInt($store.state.details.cartLength):0" @click="badgeClick" />
      <van-goods-action-button color="#718093" type="warning" text="加入购物车" @click="addClick" />
      <van-goods-action-button color="#2f3640" type="danger" text="立即购买" @click="buyClick" />
    </van-goods-action>
    <van-popup closeable @click-close-icon="clickIcon" v-model="show" round position="bottom" :style="{ height: '80%' }">
      <div class="content">
        <div class="smallImg">
          <img :src="imgList[colorActive]" />
        </div>
        <p>选择颜色：</p>
        <div class="color">
          <van-button size="small" style="margin:2px 5px" v-for="(item, index) in param.msg" :key="index" type="default" @click="colorClick(index)" :class="{ colorActive: index == colorActive }">{{ item }}</van-button>
        </div>
        <p>选择尺码：</p>
        <div class="rules">
          <van-button :disabled="index == 1" size="mini" v-for="(item, index) in rule" :key="index" type="default" @click="ruleClick(index)" :class="{ ruleActive: index == page }">{{ item }}</van-button>
        </div>
        <p>库存：{{stock[colorActive]}}</p>
        <div class="number">
          <van-field name="stepper" label="购买数量：">
            <template #input>
              <van-stepper v-model="value" :min="1" :max="stock[colorActive]" />
            </template>
          </van-field>
        </div>
        <div class="sub">
          <van-button round block type="primary" native-type="submit" color="#2f3640" @click="subClick">
            {{sub[clickindex]}} <span v-if="special_price!=undefined&&clickindex==1">现在购买仅需{{special_price}}元</span>
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getLocalStorage } from "utils/storage.js";
export default {
  name: "Footer",
  data() {
    return {
      show: false,
      rule: ["36", "37", "38", "39", "40", "41", "41", "42", "43"],
      page: -1,
      colorActive: 0,
      value: 0,
      sub: ['加入购物车', '立即购买'],
      clickindex: -1,
      customer_id: getLocalStorage('customer_id'),
      params: []
      // sku_id:this.$store
    };
  },
  props: {
    imgList: {
      type: Array,
      detault: () => [],
    },
    param: {
      type: Object,
      detault: () => { },
    },
    stock: {
      type: Array,
      default: () => { }
    },
    special_price: {
      type: Number,
      default: 0
    }
  },
  methods: {
    addClick() {
      this.clickindex = 0
      this.show = true;
    },
    buyClick() {
      this.clickindex = 1
      this.show = true;
    },
    clickIcon() {
      this.show = false;
    },
    ruleClick(index) {
      this.page = index;
    },
    colorClick(index) {
      this.colorActive = index;
    },
    serveClick() {
      this.$router.push("/serve")
    },
    badgeClick() {
      this.$router.push("/shopCar")
    },
    subClick() {
      let addCart = {}
      if (this.value > 0) {
        addCart.num = this.value
      }
      else {
        this.$toast("购买数量需要大于0")
        return
      }
      if (this.param.msg[this.colorActive] != undefined) {
        this.params.push(this.param.msg[this.colorActive])
      } else {
        this.$toast("请选择颜色")
        return
      }
      if (this.rule[this.page] > 0) {
        this.params.push(this.rule[this.page])
      } else {
        this.$toast("请选择尺码")
        return
      }
      if (this.stock[this.colorActive] <= 0) {
        this.$toast("暂时没有库存")
        return
      }
      if (this.clickindex == 0) {
        if (!this.$store.state.login.userInfo) {
          this.$toast("请先登录")
          setTimeout(() => {
            this.$router.push("/login")
          }, 200);
          return
        }
        this.$toast("加入购物车成功")
        addCart.customer_id = this.customer_id
        addCart.sku_id = this.$store.state.details.Commodity[0].id
        this.params = JSON.stringify(this.params)
        addCart.params = this.params
        // console.log(this.customer_id);
        this.$store.dispatch('setLength', this.customer_id)
        this.$store.dispatch('addCart', addCart)
      }
      else {
        if (!this.$store.state.login.userInfo) {
          this.$toast("请先登录")
          setTimeout(() => {
            this.$router.push("/login")
          }, 200);
          return
        }
        this.$router.push('/order')
      }
      this.params = []
    }
  },
  computed: {
    cartLength() {
      return { ...this.$store.state.details.cartLength }
    }
  },
  created() {

  },
  mounted() {
    console.log(this.$store.state.details.cartLength);
  },
};
</script>

<style lang="less" scoped>
.content {
  margin-top: 40px;
  padding: 0 20px;
  p {
    padding: 10px 0;
    font-size: 14px;
  }
  .number {
    padding: 10px 0 30px 0;
    display: flex;
    justify-content: space-between;
  }
  .smallImg {
    width: 60px;
    height: 60px;
    display: flex;
    box-shadow: 1px 2px 3px #ccc;
    img {
      width: 100%;
      height: 100%;
      border: 1px solid transparent;
    }
  }
  .rules {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .van-button--default {
      width: calc((100% / 4) - 6px);
      margin: 3px;
    }
  }
}
.ruleActive {
  border: 1px solid #000;
}
.colorActive {
  border: 1px solid #000 !important;
}
.van-button--small {
  padding: 0 10px;
}
.sub {
  position: absolute;
  bottom: 30px;
  left: 10px;
  right: 10px;
}
</style>