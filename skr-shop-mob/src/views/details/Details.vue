<!--
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-20 21:37:36
 * @LastEditors: stride
 * @LastEditTime: 2021-04-25 19:12:40
-->
<template>
  <div class="Details">
    <MyNavBar :right="true" />
    <div class="contented" ref="contented">
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <Tab v-if="loadOk" @tabClick="tabClick" :page="page" :TabShow="TabShow" />
        <Swiper :imgList="imgList" @Preview_img="Preview_img" ref="Swiper" />
        <Title :title="title" />
        <Banner />
        <Instalments :param="param" />
        <Serve />
        <Ranking v-if="isRanking" :Ranking_num="Ranking_num" />
        <Freight />
        <Recommend />
        <Recent />
        <Evaluate />
        <Selected :imgList="imgList" @Previewsec_img="Preview_img" ref="Selected" />
        <Parameter :Commodity="Commodity[0]" ref="Parameter" />
        <Particulars :imgList="imgList" />
        <Rules />
        <Information />
        <Recommendation ref="Recommendation" @imgLoad="imgLoad" />
      </van-pull-refresh>
    </div>
    <Footer :imgList="imgList" :param="param" :stock="stock" :special_price="special_price" />
    <Share />
  </div>
</template>

<script>
import { debounce } from 'utils/debounce'
import { animateScroll } from 'utils/animate'
import { ImagePreview } from 'vant' //引入大图预览
import MyNavBar from '../../components/content/navbar/MyNavBar'
import Swiper from 'components/common/myswipe/MySwipe'
import Title from './childComps/Title'
import Banner from './childComps/Banner'
import Instalments from './childComps/Instalments'
import Serve from './childComps/Serve'
import Ranking from './childComps/Ranking'
import Freight from './childComps/Freight'
import Recommend from './childComps/Recommend'
import Recent from './childComps/Recent'
import Evaluate from './childComps/Evaluate'
import Selected from './childComps/Selected'
import Parameter from './childComps/Parameter'
import Particulars from './childComps/Particulars'
import Rules from './childComps/Rules'
import Information from './childComps/Information'
import Recommendation from './childComps/Recommendation'
import Footer from './childComps/Footer'
import Share from './childComps/Share'
import Tab from './childComps/Tab'
export default {
  name: 'Details',
  data() {
    return {
      imgList: [],
      title: {},
      param: {},
      offsetTop: [],
      loadOk: false,
      isLoading: false,
      isRanking: false,
      page: 0,
      top: 0,
      Ranking_num: 0,
      TabShow: false,
      stock: [],
      special_price: 0
    }
  },
  components: {
    MyNavBar,
    Swiper,
    Title,
    Banner,
    Instalments,
    Serve,
    Ranking,
    Freight,
    Recommend,
    Recent,
    Evaluate,
    Selected,
    Parameter,
    Particulars,
    Rules,
    Information,
    Recommendation,
    Footer,
    Share,
    Tab,
  },
  computed: {
    Commodity() {
      return this.$store.state.details.Commodity
    },
  },
  methods: {
    list_init() {
      let arr = []
      let title = {}
      let param = {}
      let imgList = JSON.parse(this.Commodity[0].imgs)
      imgList.forEach((item) => {
        for (let x in item) {
          if (x == 'normal') {
            arr.push(item[x])
          }
        }
      })
      this.imgList = arr
      param.msg = JSON.parse(this.Commodity[0].param)
      param.price = this.Commodity[0].price
      this.param = param
      title.name = this.Commodity[0].title
      title.price = this.Commodity[0].price
      this.stock = JSON.parse(this.Commodity[0].stock)
      this.special_price = this.Commodity[0].special_price
      this.title = title
    },
    Preview_img(images, index) {
      ImagePreview({
        images: images, //图片数组
        showIndex: true,
        loop: false,
        startPosition: index,
      })
    },
    tabClick(index) {
      const contented = document.querySelector('.contented')
      let from = contented.scrollTop
      animateScroll(from, this.offsetTop[index], contented)
    },
    animateScroll_init() { },
    imgLoad(count, length) {
      if (count == length) {
        this.loadOk = true
      }
    },
    Sroll_init() {
      const contented = document.querySelector('.contented')
      let top = contented.scrollTop
      this.top = top
      this.offsetTop.forEach((item, index) => {
        if (top >= item - 24) {
          this.page = index
        }
        if (top > 300) {
          this.TabShow = true
        } else {
          this.TabShow = false
        }
      })
    },
    onRefresh() {
      setTimeout(() => {
        this.$store.dispatch('getShop', this.$route.params.id)
        this.$store.dispatch('getRecommend_init', this.$route.query.type)
        this.isLoading = false
      }, 1000)
    },
    // 初始化排行榜
    Ranking_init() {
      this.$store.state.details.height.forEach((item, index) => {
        if (item.id == this.$route.params.id) {
          this.isRanking = true
          this.Ranking_num = index + 1
        }
      })
    },
  },
  created() {
    this.$store.dispatch('getShop', this.$route.params.id)
    this.$store.dispatch('getRecommend_init', this.$route.query.type)
  },
  mounted() {
    let that = this
    const contented = document.querySelector('.contented')
    contented.addEventListener('scroll', debounce(this.Sroll_init, 6))

  },
  watch: {
    Commodity: {
      deep: true,
      handler: function (val) {
        this.list_init()
        this.Ranking_init()
      },
    },
    // 异步解决  最长的图片加载完毕才获取高度
    loadOk: function () {
      let arr = [
        this.$refs.Swiper.$el.offsetTop,
        this.$refs.Selected.$el.offsetTop - 24,
        this.$refs.Parameter.$el.offsetTop - 24,
        this.$refs.Recommendation.$el.offsetTop - 24,
      ]
      this.offsetTop = arr
    },
    // $route(to, from) {
    //   if (to.path !== from.path) {
    //     this.$store.dispatch("getShop", this.$route.params.id);
    //     this.$store.dispatch("getRecommend_init", this.$route.query.type);
    //   }
    // },
  },
}
</script>

<style lang="less" scoped>
.Details {
  width: 100%;
  .contented {
    position: absolute;
    top: 46px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: scroll;
  }
}
</style>