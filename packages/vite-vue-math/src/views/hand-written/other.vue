<template>
  <div>
    <div>
      <h2>实现深拷贝</h2>
      <highlightjs autodetect :code="deepClone.toString()" />
    </div>
    <div>
      <h2>实现 new</h2>
      <highlightjs autodetect :code="myNew.toString()" />
    </div>
    <div>
      <h2>实现 call</h2>
      <highlightjs autodetect :code="'Function.prototype.myCall = ' + myNew.myCall.toString()" />
    </div>
    <div>
      <h2>实现 apply</h2>
      <highlightjs autodetect :code="'Function.prototype.myApply = ' + myNew.myApply.toString()" />
    </div>
    <div>
      <h2>实现 bind</h2>
      <highlightjs autodetect :code="'Function.prototype.myBind = ' + myNew.myBind.toString()" />
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted } from 'vue';
import * as isType from '../../utils/currying';
Function.prototype.myCall = function (context) {
  context = context || window
  // 获取传入参数 // 此处的 this 即为该函数
  // 将 this 挂在 context 上
  context.fn = this
  const args = [].slice.call(arguments, 1)
  // 执行函数 fn 的 this 指向 context，获取结果
  const result = context.fn(...args)
  // 执行完毕 context 删除多余属性
  delete context.fn
  return result
}

Function.prototype.myApply = function (context) {
  context = context || window
  // 此处的 this 即为该函数
  // 将 this 挂在 context 上
  context.fn = this
  // 获取传入参数，获取第二个参数，为数组
  const args = [].slice.call(arguments, 1, 2)?.[0]
  if (!Array.isArray(args)) {
    throw new TypeError('第二个参数不是数组')
  }
  // 执行函数 fn 的 this 指向 context，获取结果
  const result = context.fn(...args)
  // 执行完毕 context 删除多余属性
  delete context.fn
  return result
}

Function.prototype.myBind = function (context) {
  // 获取传入参数
  const args = [].slice.call(arguments, 1)
  // 此处的 this 即为该函数
  const _this = this
  return function F(...params) {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...params)
    }
    return _this.myCall(context, ...args, ...params)
  }
}

function myNew() {
  // 创建新🈳️对象
  const obj = {}
  // 获取构造函数
  const constructor = [].shift.call(arguments)
  // 令新对象原型指向构造函数原型
  obj.__proto__ = constructor.prototype
  // 执行构造函数，并且this指向obj
  const result = constructor.apply(obj, arguments)
  // 函数返回一定为对象
  return typeof result === 'object' ? result : obj
}

function deepClone(obj) {
  // 判断是否为数组
  let objClone = Array.isArray(obj) ? [] : {}
  if (
    Object.prototype.toString.call(obj) === '[object Array]' ||
    Object.prototype.toString.call(obj) === '[object Object]'
  ) {
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        objClone[key] = deepClone(obj[key]);
      }
    }
  } else {
    objClone = obj
  }
  return objClone
}

onMounted(() => {
  window.deepClone = deepClone
  window.myNew = myNew
})

onUnmounted(() => {
  delete window.myNew
  delete window.deepClone
})
</script>