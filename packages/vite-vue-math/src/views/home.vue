<template>
  <div>
    空白首页{{ count }}
    <el-input size="small" clearable v-model="count"></el-input>
    <el-button type="primary" size="small" @click="click">add</el-button>
    <user-card
      v-if="count"
      image="https://semantic-ui.com/images/avatar2/large/kristy.png"
      name="User Name"
      email="yourmail@some-email.com"
    ></user-card>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
const count = ref(0n)
const click = () => {
  count.value++
  console.log('click')
}
</script>