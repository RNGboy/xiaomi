<template>
  <!-- 二次封装better-scroll，解耦对插件的依赖，只基于对Scroll组件依赖 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //   这里用ref绑定的对象,
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType:3,
      pullUpLoad:true,
    });
    this.scroll.on('scroll',()=>{
      // console.log(position)
    });
    this.scroll.on('pullingUp',()=>{
      console.log('上拉加载更多');
    })
  },
};
</script>

<style lang="css" scoped>

</style>