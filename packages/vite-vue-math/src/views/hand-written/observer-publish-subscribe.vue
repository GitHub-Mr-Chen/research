<template>
  <div>
    <h2>实现观察者模式</h2>
    <div>
      观察者类函数
      <highlightjs autodetect :code="Observer.toString()" />
    </div>
    <div>
      被观察者类函数
      <highlightjs autodetect :code="Subject.toString()" />
    </div>
    <h2>实现观察者模式</h2>
    <div>
      观察者类函数
      <highlightjs autodetect :code="Observer.toString()" />
    </div>
    <div>
      发布订阅模式
      <highlightjs autodetect :code="EventCenter.toString()" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
// ------------------- 观察者模式 -------------------
// 观察者
class Observer {
  constructor(name) {
    this.name = name
  }
  // 用来通知所有的观察者状态更新了
  update(newState) {
    console.log('Observer', this, 'newState', newState);
  }
}
// 被观察者
class Subject {
  observers = [];
  state = '状态'
  // 被观察者提供一个接受观察者的方法
  attach(observer) {
    this.observers.push(observer)
  }
  // 移除观察者
  remove(observer) {
    const index = this.observers.findIndex((item) => item === observer)
    this.observers.splice(index, 1)
  }
  // 通知
  notify(newState) {
    this.state = newState
    this.observers.forEach(observer => observer.update(newState));
  }
}
const subject = new Subject()
// const obs1 = new Observer('观察者1');
// const obs2 = new Observer('观察者2');

// subject.attach(obs1);
// subject.attach(obs2);
// subject.remove(obs2);

// subject.notify('出问题了');  //my name is ttsy1

// ------------------- 发布订阅模式 -------------------
class EventCenter {
  state = new Proxy({}, {
    get: function (target, property, receiver) {
      console.log('target', target);
      return Reflect.get(...arguments);
    },
    set: function (target, property, value, receiver) {
      return Reflect.set(...arguments)
    }
  })

  events = {}

  on(eventName, handler) {
    this.events[eventName] = this.events[eventName] || []
    this.events[eventName].push(handler)
  }

  emit(eventName, ...args) {
    this.events[eventName].forEach(handler => handler(...args));
  }

  remove(eventName, handler) {
    const index = this.events[eventName]?.findIndex((item) => item === handler)
    if (index !== -1) {
      this.events[eventName]?.splice(index, 1)
    } else {
      console.warn('未找到对应事件');
    }
  }


}
const even = new EventCenter()
function test(params) {
  console.log('params', params);
}
even.on('test', (first) => {
  console.log('first', first);
})

even.on('test', test)

even.on('test', (first) => {
  console.log('first2', first);
})






onMounted(() => {
  window.subject = subject
  window.even = even
})

onUnmounted(() => {
  delete window.subject
  delete window.even
})

</script>
