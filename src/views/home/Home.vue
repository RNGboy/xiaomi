<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="probeType"
      @scroll="contentScroll"
    >
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control class="tab-control" :titles="titles" @tabClick="tabClick" />
      <goods-list :goods="showGoods" />
    </scroll>

    <!-- 组件监听点击（不是组件内部）需要添加native修饰符 -->
    <back-top @click.native="backClick" v-show="isShoeBackTop" />

    <div>啦啦啦</div>
  </div>
</template>

<script>
// home相关子组件模块
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

// 公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";

// 网络请求数据模块
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      probeType: 3,
      isShoeBackTop: false,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },

    backClick() {
      console.log("回到顶部");
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },

    // 回到顶部按钮显示方法
    contentScroll(position) {
      console.log(position);
      this.isShoeBackTop = -position.y > 1000;
    },

    /**
     * 网络请求相关方法
     */
    // 对getHomeMultidata方法进行再次包装
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res)
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    // 对getHomeGoods方法进行再次包装
    getHomeGoods(type) {
      // 主要逻辑
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style lang="css" scoped>
#home {
  height: 100vh;
  /* padding-top: 44px; */
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

/* css实现简单吸顶效果 */
.tab-control {
  /* position: sticky; */
  top: 44px;
  background-color: #fff;
}

/* 方案一 */
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* 方案二 */
/* .content{
  height: calc(100% - 49px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>