<script setup>
import { onUnmounted, ref, reactive } from 'vue'
import useDevtool from './test'
// import useDevtool from './test-js'
const fn = useDevtool()
console.clear()

// 开始执行
console.time('time1')
const inputValue = [3]

console.log('=== 输入: ===>> ', inputValue);
const result = fn(...inputValue)
console.log('⬇️⬇️⬇️⬇️⬇️ ===== 输出 ===== ⬇️⬇️⬇️⬇️⬇️');
console.log(result);
console.log('⬆️⬆️⬆️⬆️⬆️ ===== 输出 ===== ⬆️⬆️⬆️⬆️⬆️');


// 执行结束时间统计
console.timeEnd('time1')
</script>

<template>
  <h1>代码调试</h1>
  <highlightjs autodetect :code="`${fn}`" />
</template>
