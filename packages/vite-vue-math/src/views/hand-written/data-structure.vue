<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="搜索二叉树" name="BST">
      <el-button type="primary" size="small" @click="add">添加</el-button>
      <div id="canvas" class="canvas"></div>
      <!-- 可以使用自动检测 -->
      <div>搜索树代码</div>
      <highlightjs autodetect :code="BST.toString()" />
      <div>cansvas渲染代码</div>
      <highlightjs autodetect :code="renderTree.toString()" />
    </el-tab-pane>
    <el-tab-pane label="单链表" name="LinkList">
      <highlightjs autodetect :code="singleList.display()" />单链表
      <highlightjs autodetect :code="LinkList.toString()" />
    </el-tab-pane>
    <el-tab-pane label="队列" name="Queue">
      <highlightjs autodetect :code="queue.toString()" />队列
      <highlightjs autodetect :code="Queue.toString()" />
    </el-tab-pane>
    <el-tab-pane label="栈" name="Stack">
      <highlightjs autodetect :code="stack.toString()" />栈
      <highlightjs autodetect :code="Stack.toString()" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { reactive, h, ref, onMounted, watch, onUnmounted } from 'vue';
import dataStructure from '_u/dataStructure';
import { renderTree } from '_u/dataStructure/BST';
const { BST, LinkList, Queue, Stack } = dataStructure

const initArr = Array(Math.floor(Math.random() * 5 + 3)).fill().map(() => Math.floor(50 + Math.random() * 100))
// ------------- 搜索二叉树 -------------
const bst = new BST()
// 随机数组
bst.create(initArr)
// tree转vue3响应式数据
const tree = reactive(bst)

// ------------- 单链表 -------------
const singleList = reactive(new LinkList())
singleList.create(initArr)

// ------------- 队列 -------------
const queue = reactive(new Queue())
queue.create(initArr)

// ------------- 栈 -------------
const stack = reactive(new Stack())
stack.create(initArr)

const add = () => {
  tree.insert(Math.floor(Math.random() * 200))
}
onUnmounted(() => {
  delete window.tree
  delete window.queue
  delete window.stack
  delete window.singleList
})
onMounted(() => {
  window.tree = tree
  // renderTree('canvas', tree)
  watch(
    () => tree,
    (state, prevState) => {
      renderTree('canvas', tree)
    },
    { deep: true, immediate: true }
  )
})

const activeName = ref('BST')
const handleClick = (tab, event) => {
  delete window.tree
  delete window.queue
  delete window.stack
  delete window.singleList
  if (tab.paneName === 'BST') {
    window.tree = tree
    // 中序遍历从  升序排列
    // bst.inOrderTraverse()
  }
  if (tab.paneName === 'LinkList') {
    window.singleList = singleList
  }
  if (tab.paneName === 'Queue') {
    window.queue = queue
  }
  if (tab.paneName === 'Stack') {
    window.stack = stack
  }
}
</script>
<style scoped>
.canvas {
  width: 100%;
  height: 600px;
}
</style>