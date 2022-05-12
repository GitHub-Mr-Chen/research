import { createRouter, createWebHashHistory } from 'vue-router'

// 1. 定义路由组件.
// 也可以从其他文件导入

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
export const routes = [
  {
    path: '/',
    component: () => import('_v/home.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/sort',
    component: () => import('_v/sort.vue'),
    meta: {
      title: '排序算法',
    },
  },
  {
    path: '/route',
    component: () => import('_v/route.vue'),
    meta: {
      title: '路由原理',
    },
  },
  {
    path: '/echarts',
    component: () => import('_v/echarts.vue'),
    meta: {
      title: 'echarts图表',
    },
  },
  {
    path: '/hand-written',
    component: () => import('_v/hand-written/index.vue'),
    meta: {
      title: '手动实现',
    },
    children: [
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: 'my-promise',
        component: () => import('_v/hand-written/my-promise.vue'),
        meta: {
          title: 'promise',
        },
      },
      {
        path: 'data-structure',
        component: () => import('_v/hand-written/data-structure.vue'),
        meta: {
          title: '数据结构js实现',
        },
      },
      {
        path: 'observer-publish-subscribe',
        component: () => import('_v/hand-written/observer-publish-subscribe.vue'),
        meta: {
          title: '观察者模式和发布订阅模式',
        },
      },
      {
        path: 'v-dom',
        component: () => import('_v/hand-written/v-dom.vue'),
        meta: {
          title: '虚拟dom',
        },
      },
      {
        path: 'other',
        component: () => import('_v/hand-written/other.vue'),
        meta: {
          title: '其他js实现',
        },
      },
    ],
  },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
export default router
