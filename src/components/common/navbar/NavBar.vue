<template>
  <div class="nav-bar">
    <!-- 具名插槽，才能指定替换哪个插槽 -->
    <div class="left"><slot name="left" /></div>
    <div class="center"><slot name="center" /></div>
    <div class="right"><slot name="right" /></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
.nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
}
.left, .right {
  width: 60px;
  background-color: red;
}
.center {
  flex: 1;
  background-color: pink;
}
</style>