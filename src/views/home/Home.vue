<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control class="tab-control" :titles="titles" />
    <goods-list :goods="goods['pop'].list"/>


    <ul>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
      <li>商品列表</li>
    </ul>

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
import GoodsList from 'components/content/goods/GoodsList'


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
    };
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList
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
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

/* css实现简单吸顶效果 */
.tab-control {
  position: sticky;
  top: 44px;
  background-color: #fff;
}
</style>