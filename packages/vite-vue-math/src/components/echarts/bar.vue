<template>
  <div class="chart" ref="root"></div>
</template>
<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import chart from '_c/echarts/base'
const root = ref(null);
const xAxis = {
  data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
}
const series = [
  {
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }
]
const title = {
  text: '柱状图'
}
onMounted(() => {
  chart(root.value, { xAxis, series, title })
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 500px;
}
</style>