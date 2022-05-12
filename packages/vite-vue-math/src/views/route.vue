<template>
  <div>
    <el-select v-model="router" value-key placeholder filterable>
      <el-option label="hash" value="hash"></el-option>
      <el-option label="histroy" value="histroy"></el-option>
    </el-select>
    <a href="#/test">test1</a>
    <a href="#/test-2">test2</a>
    <!-- <el-tabs v-model="" type="card" tab-position="top" @tab-click="">
      <el-tab-pane v-for="item in panes"
        :key="item.key"
        :label="item.label"
        :name="item.key">
        
      </el-tab-pane>
    </el-tabs>-->

    <!-- <h2>{{ sortKey }}</h2> -->
    <!-- <highlightjs autodetect :code="`function ${sortKey}${maths[sortKey].toString()}`" /> -->
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const router = ref('hash')
let textNode
function hashchange() {
  textNode = document.createTextNode(location.hash)
  const domMain = document.getElementsByClassName('el-main')[0]
  if ([].includes.call(domMain.childNodes, textNode)) {
    domMain.removeChild(textNode)
  }
  console.log('location.hash', location.hash);
  switch (location.hash) {
    case '#/test':
    case '#/test-2':
      document.getElementsByClassName('el-main')[0].appendChild(textNode)
      break;

    default:
      break;
  }
}

onMounted(() => {
  window.addEventListener('hashchange', hashchange)
})
onUnmounted(() => {
  // window.removeEventListener('hashchange', hashchange)
})
</script>