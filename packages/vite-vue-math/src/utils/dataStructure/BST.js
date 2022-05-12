import Queue from './Queue'
class Node {
  constructor(v) {
    this.value = v
    this.left = null
    this.right = null
  }
}
// 二叉查找树
export default class BST {
  root = null
  size = 0
  // 遍历顺序
  order = ''
  list = []
  // 是否为空
  isEmpty() {
    return this.size === 0
  }

  // 传入数组创建树
  create(arr = []) {
    if (arr.length) {
      const array = [...new Set(arr)]
      for (let index = 0; index < array.length; index++) {
        const element = array[index]
        this.insert(element)
      }
    } else {
      this.root = null
    }
  }

  // 插入元素
  insert(key) {
    const addChild = (node) => {
      if (!node) {
        this.size++
        return new Node(key)
      }
      if (node.value > key) {
        node.left = addChild(node.left)
      }
      if (node.value < key) {
        node.right = addChild(node.right)
      }
      if (node.value === key) {
        console.log(`存在重复key`)
      }
      return node
    }

    this.root = addChild(this.root, key)
  }

  // 查找值
  search(key) {
    if (!this.root) {
      return '空树'
    }
    if (!key) {
      return '空值'
    }
    let node = this.root
    let parent = null
    let direction = ''
    while (node.value !== key) {
      if (node.value > key) {
        parent = node
        node = node.left
        direction = 'left'
      }
      if (node.value < key) {
        parent = node
        node = node.right
        direction = 'right'
      }
    }
    return { node, direction, parent }
  }

  // 遍历
  traverse(node) {
    if (!node) {
      return
    }
    if (this.order === 'pre') {
      this.list.push(node.value)
    }
    this.traverse(node.left)
    if (this.order === 'in') {
      this.list.push(node.value)
    }
    this.traverse(node.right)
    if (this.order === 'post') {
      this.list.push(node.value)
    }
  }

  // 先序遍历所有节点（根左右）
  preOrderTraverse() {
    this.list = []
    this.order = 'pre'
    this.display = ''
    this.traverse(this.root)
    console.log(`preOrderTraverset`, this.list)
    console.log(`this.display`, this.display)
  }

  // 中序遍历所有节点（左根右）
  inOrderTraverse() {
    // 中序遍历后值从小到大排列
    this.list = []
    this.order = 'in'
    this.traverse(this.root)
    console.log(`inOrderTraverse`, this.list)
  }

  // 后序遍历所有节点（左右根）
  postOrderTraverse() {
    this.list = []
    this.order = 'post'
    this.traverse(this.root)
    console.log(`postOrderTraverse`, this.list)
  }
  // 层序遍历
  levelOrderTraverse() {
    const queue = new Queue()
    queue.enqueue([this.root, 0])
    const res = []
    while (queue.size) {
      let [node, level] = queue.dequeue()
      if (!res[level]) {
        res.push([node])
      } else {
        res[level].push(node)
      }
      if (node.left) {
        queue.enqueue([node.left, level + 1])
      }
      if (node.right) {
        queue.enqueue([node.right, level + 1])
      }
    }
    console.log(`levelOrderTraverse`, res)
  }

  levelOrderTraverseX(x = 1000) {
    const queue = new Queue()
    queue.enqueue([this.root, 0, x / 2])
    const res = []
    const lines = []
    const points = []
    while (queue.size) {
      // 利用队列先进先出
      let [node, level, currentX] = queue.dequeue()
      if (!res[level]) {
        res.push([node])
      } else {
        res[level].push(node)
      }
      points.push({ value: node.value, currentX, level })
      if (node.left) {
        const nextX = currentX - x / Math.pow(2, level + 1 + 1)
        queue.enqueue([node.left, level + 1, nextX])
        lines.push({ x1: currentX, y1: level, x2: nextX, y2: level + 1 })
      }
      if (node.right) {
        const nextX = currentX + x / Math.pow(2, level + 1 + 1)
        queue.enqueue([node.right, level + 1, nextX])
        lines.push({ x1: currentX, y1: level, x2: nextX, y2: level + 1 })
      }
    }
    return {
      points,
      lines,
    }
  }

  // 返回树中最小的值/键
  min(node = this.root) {
    let min = 0
    if (!node) {
      return '空树'
    }
    while (node.left) {
      node = node.left
      min = node.value
    }
    console.log(`min`, min)
    return node
  }

  // 返回树中最小的值/键
  max(node = this.root) {
    // this.inOrderTraverse();
    // return this.list.pop();

    let max = 0
    if (!node) {
      return '空树'
    }
    while (node.right) {
      node = node.right
      max = node.value
    }
    console.log(`max`, max)
    return node
  }

  // 从树中移除某个键
  remove(key) {
    let { node, direction, parent } = this.search(key)
    if (node) {
      if (parent) {
        this.size--

        // 非根节点
        if (node.left === null && node.right === null) {
          parent[direction] = null
          return
        }

        if (node.left && node.right === null) {
          parent[direction] = node.left
          return
        }

        if (node.right && node.left === null) {
          parent[direction] = node.right
          return
        }

        if (node.right && node.left) {
          //找到左子树中最大的节点
          let maxNode = node.left
          if (maxNode.right === null) {
            parent[direction].value = maxNode.value
            node.left = maxNode.left
            return
          } else {
            let preMaxNode = node
            while (maxNode.right) {
              preMaxNode = maxNode
              maxNode = maxNode.right
            }
            parent[direction].value = maxNode.value
            preMaxNode.right = maxNode.left
          }
        }
      } else {
        console.warn('不允许删除根节点root节点')
      }
    }
  }

}

export function renderTree(domId, tree) {
  const parentDom = document.getElementById(domId)
  while (parentDom.lastElementChild) {
    parentDom.removeChild(parentDom.lastElementChild)
  }
  
  const canvas = document.createElement('canvas')
  canvas.style.transformOrigin = 'left top'
  canvas.style.transform = 'scale(.5)'
  parentDom.appendChild(canvas)
  canvas.width = parentDom.offsetWidth * devicePixelRatio
  canvas.height = parentDom.offsetHeight * devicePixelRatio
  // 然后，创建 context 对象：
  const ctx = canvas.getContext('2d')
  ctx.scale(2, 2)

  // 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。
  // 下面的两行代码绘制一个红色的矩形：
  ctx.font = 'bold 10px Arial,sans-serif'

  if (!tree) {
    return null
  }
  const { points, lines } = tree.levelOrderTraverseX(ctx.canvas.width / 2)
  // 连接线渲染
  lines.forEach((line) => {
    drawLine({ ctx, ...line })
  })
  // 节点渲染
  points.forEach((node) => {
    ctx.beginPath()
    ctx.arc(node.currentX, (node.level + 1) * 66, 10, 0, 2 * Math.PI, true)
    ctx.strokeStyle = 'blue'
    ctx.stroke()

    ctx.fillStyle = '#00000e'
    ctx.fill()
    ctx.closePath()

    ctx.fillStyle = '#fff'
    if (node.value < 10) {
      ctx.fillText(
        `${node.value}`,
        node.currentX - 3,
        (node.level + 1) * 66 + 3,
      )
    } else if (node.value < 100) {
      ctx.fillText(
        `${node.value}`,
        node.currentX - 6,
        (node.level + 1) * 66 + 3,
      )
    } else {
      ctx.fillText(
        `${node.value}`,
        node.currentX - 8,
        (node.level + 1) * 66 + 3,
      )
    }
  })

  ctx.canvas.addEventListener('mousedown', (event) => {
    const { layerX, layerY, button } = event
    let value = null
    // button:
    // 0	规定鼠标左键
    // 1	规定鼠标中键
    // 2	规定鼠标右键
    if (button === 0) {
      points.forEach((node) => {
        const x = node.currentX
        const y = (node.level + 1) * 66
        if (Math.abs(layerX - x) <= 10 && Math.abs(layerY - y) <= 10) {
          value = node.value
        }
      })

      console.log(`左键节点：`, value)
    }
  })

  // 鼠标移动到节点：并且按下D键进行删除
  ctx.canvas.addEventListener(
    'mousemove',
    throttle((event) => {
      const { layerX, layerY } = event
      let value = null
      points.forEach((node) => {
        const x = node.currentX
        const y = (node.level + 1) * 66
        if (Math.abs(layerX - x) <= 10 && Math.abs(layerY - y) <= 10) {
          value = node.value
        }
      })

      document.onkeydown = (e) => {
        if (e.code === 'KeyD' && value) {
          console.log(`移动到节点：并且按下D键`, value)
          tree.remove(value)
        }
      }
    }, 150),
  )
}

function drawLine({ ctx, x1, y1, x2, y2 }) {
  ctx.moveTo(x1, (y1 + 1) * 66)
  ctx.lineTo(x2, (y2 + 1) * 66)
  ctx.strokeStyle = 'red'
  ctx.stroke()
}

// 节流
function throttle(fn, awai) {
  let start = new Date().valueOf()
  let end = 0
  return function (...args) {
    end = new Date().valueOf()
    if (end - start > awai) {
      start = end
      fn.apply(this, args)
    }
  }
}
