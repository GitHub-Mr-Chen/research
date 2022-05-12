<template>
  <div class="box">
    <highlightjs autodetect :code="bubbleSort.toString()" />

    <el-button @click="count++">count is: {{ count }}</el-button>
    <el-divider content-position="left">输入分割数组</el-divider>
    <div v-if="false">{{ msg }}</div>
    <el-input type="text" v-model="arrString" />
    <el-divider content-position="left"></el-divider>
    <el-form label-width="150px">
      <el-form-item :label="index" v-for="(item, index) in result" :key="index">
        <el-input v-model="result[index]" readonly></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import * as maths from "../utils/sort";
import { bubbleSort, insertSort, selectSort, mergeSort } from "../utils/sort";
import { ref, reactive, watch } from "vue";

const count = ref(0);

const result = reactive({});
Object.keys(maths).forEach(item => result[item] = [])

// const arrString = ref("64, 512, 7, 13");
const arrString = ref("5, 9, 8, 1, 3, 6");
watch(
  arrString,
  (value, prevCount) => {
    const array = value.split(",").map((item) => parseFloat(item))

    // 冒泡排序结果
    // result.bubbleSort = bubbleSort(array).join(" < ");

    // 插入排序结果
    result.insertSort = insertSort(array).join(" < ");

    // 选择排序结果
    result.selectSort = selectSort(array).join(" < ");
    // // 归并排序结果
    result.mergeSort = mergeSort(array, 0, array.length - 1).join(" < ");

    // result.mergeSort = mergeSort(
    //   value.split(",").map((item) => parseFloat(item))
    // ).join(" < ");

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