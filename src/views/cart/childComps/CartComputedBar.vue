<template>
  <div class="bottom-bar">
    <div class="check-content">
      <!-- 选中按钮组件 -->
      <check-button
        :is-checked="isSelectALL"
        class="check-button"
      ></check-button>
      <span>全选</span>
    </div>

    <div class="price">合计：{{ totalPrice }}</div>

    <div class="calculate">去计算（{{ checkLength }}）</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CheckButton from "components/content/CheckButton/CheckButton";
export default {
  name: "CartComputedBar",
  components: {
    CheckButton
  },
  // 计算属性
  computed: {
    // 取到vuex中的cartList
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    },
    // 判断是否全部选中并显示计算属性
    isSelectALL() {
      // 没有物件时进入cart组件时判断显示
      if (this.cartList.length === 0) {
        return false;
      }

      // // 第一种方式，使用filter
      // return !this.cartList.filter(item => {
      //   !item.checked;
      // });

      //   第二种方式，使用find遍历查找
      return !this.cartList.find(item => !item.checked);

      // //   第三种方式，普通遍历
      // for(let item of this.cartList){
      //     if(!item.checked){
      //         return false
      //     }
      // }
    }
  }
};
</script>
<style lang="css" scoped>
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 49px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.check-content {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 18px;
}

.bottom-bar .check-button {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.price {
  font-size: 18px;
}

.calculate {
  font-size: 18px;
}
</style>
