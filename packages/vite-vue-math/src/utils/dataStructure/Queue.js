export default class Queue {
  list = []

  //   元素个数
  get size() {
    return this.list.length
  }
  // 传入数组创建队列
  create(array = []) {
    if (array.length) {
      for (let index = 0; index < array.length; index++) {
        const element = array[index]
        this.enqueue(element)
      }
    } else {
      this.root = null
    }
  }
  //   入队
  enqueue(item) {
    this.list.push(item)
  }
  //   出队
  dequeue() {
    return this.list.shift()
  }
  //   读取队首
  front() {
    return this.list[0]
  }
  //   读取队尾
  back() {
    return this.list[this.size - 1]
  }
  //   清空
  clear() {
    this.list = []
    return this.list
  }
  //   是否为空
  isEmpty() {
    return !!this.size
  }
  //   转字符串
  toString() {
    return this.list.toString()
  }
}
