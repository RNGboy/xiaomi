<template>
  <!-- 二次封装better-scroll，解耦对插件的依赖，只基于对Scroll组件依赖 -->
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:1
    }
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //   这里用ref绑定的对象,
    // this.scroll = new BScorll(this.$refs.wrapper, {});
    // better-scroll基本使用
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: 3,
      pullUpLoad: true,
      click: true,
    });

    // 监听滚动
    this.scroll.on("pullingUp", () => {
      this.scroll.refresh();
      console.log("上拉加载更多");
    });

    // 监听滚动位置
    this.scroll.on('scroll',(position)=>{
      // 自定义scroll事件，把position发送出去
      this.$emit('scroll',position)
    })

  },

  methods: {
    // 对scrollTo方法进行二次封装，参数time=300是es6写法
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
  },
};
</script>

<style lang="css" scoped>
</style>