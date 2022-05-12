import { createApp } from "vue";
import ElementPlus from "element-plus";
import App from "./App.vue";

import router from './router'

import "./index.css";

// # highlight 的样式，依赖包，组件（高亮代码块）
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

const app = createApp(App);

app.use(router)
// 引入代码高亮，并进行全局注册
app.use(hljsVuePlugin);
app.use(ElementPlus, { size: "small", zIndex: 3000 });
app.mount("#app");
