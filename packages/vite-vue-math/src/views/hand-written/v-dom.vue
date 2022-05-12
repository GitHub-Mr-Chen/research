<template>
  <div>
    <h2>实现虚拟dom</h2>
    <highlightjs autodetect :code="render.toString()" />
    <div id="v-dom"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

function createElement(tag, props, children) {
  return { tag, props, children }
}

function render(dom) {
  const el = document.createElement(dom.tag)

  for (const key in dom.props) {
    if (Object.hasOwnProperty.call(dom.props, key)) {
      // on开头的为事件
      if (/^on/.test(key)) {
        el[key] = dom.props[key]
      } else {
        // 其他为属性
        el.setAttribute(key, dom.props[key])
      }
    }
  }

  for (let index = 0; index < dom.children.length; index++) {
    const element = dom.children[index];
    const child = typeof element === 'object' ? render(element) : document.createTextNode(element)
    el.appendChild(child)
  }

  return el
}

const vdom = createElement('ul', { id: 'box' }, [
  createElement('li', { class: 'item' },
    [
      'item' + 1,
      createElement('div', { class: 'item' }, ['item-div']),
      createElement('p', {
        class: 'item', onclick: (e) => {
          console.log('点击', e);
        }
      }, ['item-p'])
    ]
  ),
  createElement('li', { class: 'item' }, ['item' + 2]),
  createElement('li', { class: 'item' }, ['item' + 3])
])
onMounted(() => {
  const el = render(vdom)
  document.getElementById('v-dom').appendChild(el)
  console.log('el', el);
})

onUnmounted(() => {
})
</script>