<template>
  <div class="box">
    <bar></bar>
    <lineChart></lineChart>
    <pie></pie>
    <!-- <highlightjs autodetect :code="`function ${sortKey}${maths[sortKey].toString()}`" /> -->
  </div>
</template>
<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { bar, line as lineChart, pie } from '_c/echarts'
// const root = ref(null);
// onMounted(() => {
//   console.log('root', root.value)
//   chart(root.value)
// })
</script>

<style scoped>
.chart {
  width: 100%;
  height: 500px;
}
</style>