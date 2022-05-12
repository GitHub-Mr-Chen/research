<template>
  <div class="box">
    <el-divider content-position="left">输入分割数组</el-divider>
    <div v-if="false">{{ msg }}</div>
    <el-input type="text" v-model="arrString" />
    <el-divider content-position="left"></el-divider>

    <el-row :gutter="20">
      <el-col :span="4" :offset="0">
        <el-select v-model="sortKey" value-key placeholder filterable>
          <el-option v-for="item in Object.keys(maths)" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="20" :offset="0">
        <div readonly>{{ result?.join(" < ") }}</div>
      </el-col>
    </el-row>

    <h2>{{ sortKey }}</h2>
    <highlightjs autodetect :code="`function ${sortKey}${maths[sortKey].toString()}`" />

    <!-- <h1
      :style="{ position: 'absolute', background: 'antiquewhite', top: mouseY + 'px', left: mouseX + 'px' }"
    >{{ mouseX }}, {{ mouseY }}</h1> -->
  </div>
</template>
<script setup>
import * as maths from "_u/sort";
import { ref, reactive, watch } from "vue";
// import useMouse from "_u/useMouse";
// const { x: mouseX, y: mouseY } = useMouse()
const sortKey = ref(Object.keys(maths)[0])
const result = ref('');
const arrString = ref("8, 11, 7, 5, 4, 9, 1, 7, 1, 2, 3, 1");
// const arrString = ref(Array(8).fill(0).map(() => Math.floor(Math.random() * 100)));
watch(
  [arrString, sortKey],
  (value, prevCount) => {
    const array = value[0].split(',').map((item) => parseFloat(item))
    result.value = maths[sortKey.value]([...array]);
  },
  { immediate: true }
);
</script>

<style scoped>
.box {
  width: 1024px;
  margin: 0 auto;
}
</style>