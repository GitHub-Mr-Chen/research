class Node {
  constructor(data) {
    this.data = data // 节点的数据域
    // this.prev = null; // 节点的指针域
    this.next = null // 节点的指针域
  }
}

export default class LinkList {
  // 虚拟头部
  head = new Node('head')
  //   节点个数
  // size = 0;
  sizeValue = 0

  get size() {
    return this.sizeValue
  }

  set size(val) {
    this.display()
    this.sizeValue = val
  }

  // 传入数组创建链表
  create(array = []) {
    if (array.length) {
      for (let index = 0; index < array.length; index++) {
        const element = array[index]
        this.add(element)
      }
    } else {
      this.root = null
    }
  }
  //   校验index
  checkIndex(index) {
    if (index < 0 || index > this.size) throw Error('Index error')
  }

  //   查找节点
  find(index) {
    this.checkIndex(index)
    let currentIndex = 0
    let currentNode = this.head.next
    while (currentNode && index !== currentIndex) {
      currentNode = currentNode.next
      currentIndex++
    }
    return currentNode
  }

  //   递归查找节点
  // find(index = 0, currentIndex = 0, node = this.head.next) {
  //   if (index === currentIndex) {
  //     return node;
  //   }
  //   return this.find(index, currentIndex + 1, node?.next);
  // }

  // 查找指定元素从前往后第一次出现的索引。
  indexOf(data) {
    let currentNode = this.head.next
    let index = 0
    while (currentNode && data !== currentNode.data) {
      currentNode = currentNode.next
      index++

      if (index === this.size) {
        index = false
      }
    }
    return typeof index === 'number' ? index : '未找到'
  }

  //   向指定位置插入元素
  add(data, index = this.size) {
    this.checkIndex(index)

    const node = new Node(data)

    if (index === 0) {
      node.next = this.head.next
      this.head.next = node
    } else {
      const prev = this.find(index - 1)
      node.next = prev.next
      prev.next = node
    }

    this.size++
  }

  //   元素添加到头部。
  addFirst(v) {
    this.add(v, 0)
  }

  //   	元素添加到尾部。
  addLast(v) {
    this.add(v)
  }

  // 删除并返回第一个元素。
  removeFirst() {
    const node = this.find(0)
    this.head.next = node.next
    return node
  }

  // 删除并返回最后一个元素。
  removeLast() {
    const node = this.find(index - 1)
    node.next = null
    return this.find(index)
  }

  // 删除某节点
  remove(index = this.size) {
    this.checkIndex(index)
    if (index === this.size) {
      // 删除null节点则值不变
      return
    }

    if (index === 0) {
      // 删除第一个元素
      const curr = this.find(index)
      this.head = curr.next
    } else {
      const prev = this.find(index - 1)
      const curr = this.find(index)
      prev.next = curr.next
    }
    this.size--
  }

  //   遍历链表
  display() {
    let index = 0
    let list = this.head.data + ' -> '
    let currentNode = this.head.next
    while (currentNode) {
      list += `(${index}): ${currentNode.data}`
      currentNode = currentNode.next
      index++
      if (currentNode) {
        list += ' -> '
      }
    }
    // console.log(`list-lint: `, list)
    return list
  }

  //   获取指定节点
  get(index = this.size) {
    this.checkIndex(index)
    if (this.isEmpty()) return '链表为空'
    return this.find(index)
  }

  //   链表是否为空
  isEmpty() {
    return this.size === 0
  }

  // 清空单链表
  clear() {
    this.head.next = null
    this.size = 0
  }

  //   反转链表
  reverse() {
    if (this.head === null || this.head.next === null) {
      // 链表为空或只有一个节点时，不用反转
      return head
    }

    let newHead = null
    let current = this.head
    while (current) {
      // 暂存下一个节点
      let next = current.next
      // 当前节点下一个节点指向新的链表表头
      current.next = newHead
      // 新链表为当前链表
      newHead = current
      // 当前节点递进下一个节点
      current = next
    }
    
    return newHead

    // 递归
    // const newHead = fn(head.next)
    // head.next.next = head
    // head.next = null
    // return newHead
  }
}
