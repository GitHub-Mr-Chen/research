<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <template v-for="({ path, meta, children }, index) in routes" :key="index">
          <el-sub-menu v-if="children?.length" :index="path">
            <template #title>{{ meta.title }}</template>
            <el-menu-item
              v-for="(item, i) in children"
              :key="i"
              :index="`${path}/${item?.path}`"
            >{{ item?.meta?.title }}</el-menu-item>
            <!-- <el-sub-menu index="2-4">
              <template #title>item four</template>
              <el-menu-item index="2-4-1">item one</el-menu-item>
              <el-menu-item index="2-4-2">item two</el-menu-item>
              <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>-->
          </el-sub-menu>
          <el-menu-item v-else :index="path">{{ meta.title }}</el-menu-item>
        </template>

        <!-- <el-sub-menu index="2">
          <template #title>Workspace</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
          <el-sub-menu index="2-4">
            <template #title>item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>-->
        <!-- <el-menu-item index="3" disabled>Info</el-menu-item>
        <el-menu-item index="4">Orders</el-menu-item>-->
      </el-menu>
    </el-header>
    <el-main>
      <el-config-provider :locale="zhCn">
        <el-page-header content @back="goBack" />
        <router-view class="app" :class="{ grey__mode: true }" />
      </el-config-provider>
    </el-main>
  </el-container>
</template>
<script setup >
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ref, toRaw, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { routes } from './router';
const { push, replace, back } = useRouter()

const route = useRoute()
const activeIndex = ref('')

watch(route, (route) => {
  // if (route.path === '/') {
  //   activeIndex.value = route.path
  //   return
  // }
  // activeIndex.value = route.path.match(/^\/[^/]+/g)?.[0]
  activeIndex.value = route.path
})
// const activeIndex = ref(toRaw(route).path.value.match(/^\/[^/]+/g))


const goBack = () => back()

const handleSelect = (key, keyPath) => {
  push(key)
}
</script>

