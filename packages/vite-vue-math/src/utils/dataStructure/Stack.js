export default class Stack {
  list = []

  //   元素个数
  get size() {
    return this.list.length
  }
  // 传入数组创建栈
  create(array = []) {
    if (array.length) {
      for (let index = 0; index < array.length; index++) {
        const element = array[index]
        this.push(element)
      }
    } else {
      this.root = null
    }
  }
  //   进栈
  push(item) {
    this.list.push(item)
  }
  //   出栈
  pop() {
    this.list.pop()
  }
  //   获取栈顶
  peek() {
    return this.list[this.size - 1]
  }
  //   转字符串
  toString() {
    return this.list.join()
  }
  //   是否为空
  isEmpty() {
    return !!this.size
  }
}
