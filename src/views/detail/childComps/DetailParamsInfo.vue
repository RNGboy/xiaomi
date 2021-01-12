<template>
  <div class="param-info" v-if="Object.keys(itemParams).length !== 0">
    <div v-for="(tables, index) in paramInfo.rule.tables" :key="index">
      <table v-for="(table, indey) in tables" :key="indey" class="info-size">
        <tr v-for="(tr, indez) in table" :key="indez">
          <td v-for="(td, inx) in tr" :key="inx">{{ td }}</td>
        </tr>
      </table>
    </div>

    <table class="info-param">
        <tr v-for="(info,index) in paramInfo.info" :key="index">
            <td class="info-param-key">{{info.key}}</td>
            <td class="param.value">{{info.value}}</td>
        </tr>
    </table>

    <div class="info-img" v-if="paramInfo.image.length !== 0">

    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    itemParams: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
