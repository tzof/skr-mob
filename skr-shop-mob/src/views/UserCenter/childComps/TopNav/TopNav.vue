<template>
  <div class="TopNav">
    <van-nav-bar
      :title="changeTitleValue"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="wap-nav" />
        <section class="menu" v-if="menuShow">
          <ul>
            <li @click="onHome">
              <van-icon name="wap-home" />
              <span>首页</span>
            </li>
            <li @click="onSort">
              <van-icon name="cluster" />
              <span>分类</span>
            </li>
            <li @click="onCar">
              <van-icon name="cart" />
              <span>购物车</span>
            </li>
            <li @click="onMy">
              <van-icon name="manager" />
              <span>我的</span>
            </li>
          </ul>
        </section>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "TopNav",
  data: function () {
    return {
      menuShow: false, // 控制下拉菜单的显示
      changeTitleValue: "个人中心",
    };
  },
  created() {
    this.changeTitle();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight(e) {
      e.stopImmediatePropagation();
      this.menuShow = true;
      window.addEventListener("click", () => {
        this.menuShow = false;
      });
    },
    onHome() {
      this.$router.push("/home");
    },
    onSort() {
      this.$router.push("/sort");
    },
    onCar() {
      this.$router.push("/shopCar");
    },
    onMy() {
      this.$router.push("/userCenter");
    },
    changeTitle() {
      let routeName = this.$route.name;
      let title = "";
      switch (routeName) {
        case "UserCenter":
          title = "个人中心";
          break;
        case "MyCode":
          title = "我的二维码";
          break;
        case "PersonalData":
          title = "个人资料";
          break;
        case "ChangePassword":
          title = "修改密码";
          break;
      }
      this.changeTitleValue = title;
    },
  },
  watch: {
    $route: function () {
      this.changeTitle();
    },
  },
};
</script>

<style lang="less" scoped>
.TopNav {
  /deep/ .van-nav-bar {
    // 去除底部白线
    &::after {
      opacity: 0;
    }
    position: relative;
    background-color: #353535;
    .van-nav-bar__title {
      color: white;
      font-weight: bolder;
    }
    .van-nav-bar__left,
    .van-nav-bar__right {
      & > i,
      & > span {
        color: white;
        font-weight: bolder;
      }
    }
    .menu {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 10;
      transform: translate(-5%, 102%);
      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 36vw;
        background-color: #353535;
        border-radius: 0.3rem;
        li {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3vw 0;
          i {
            color: white;
            padding: 0 5vw;
            font-size: 5vw;
            font-weight: bolder;
          }
          span {
            width: 100%;
            color: white;
            font-size: 3.6vw;
            text-align: left;
            position: relative;
            padding-left: 3.4vw;
            &::after {
              content: "";
              box-sizing: border-box;
              display: inline-block;
              width: 100%;
              height: 0.2px;
              background: rgba(168, 168, 168, 0.274);
              position: absolute;
              left: 0;
              bottom: -2vw;
            }
          }
          &:last-of-type span::after {
            opacity: 0;
          }
        }
      }
    }
  }
}
</style>