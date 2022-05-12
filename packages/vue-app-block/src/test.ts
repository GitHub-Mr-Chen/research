import { onMounted } from 'vue'
import { iteratorToMap } from '../../vite-vue-math/src/utils/currying'
function ListNode(val?, next?) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}
type Abc = {
  a: symbol
  b: number
}
interface Cat {
  age: number
  name: string
  weight: number
}
// let node: Node | undefined | null = null
// list1.forEach((el) => {
//   if (node instanceof ListNode) {
//     node.next = new ListNode(el)
//     node = node.next
//   } else {
//     node = new ListNode(el)
//     l1 = node
//   }
// })
interface Node {
  val: number | undefined
  next: any
}

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

interface params {
  name: string | undefined
  age: number
}
export default function () {
  const fn = function (n: number): number {
    let i = 1
    let preCount = 0
    let count = 0
    while(n >= i) {
        if(i === 1) {
            preCount = 0
            count = 1
        }
        if(i === 2) {
            preCount = 1
            count = 2
        }
        if(i > 2) {
            const pre = count
            count = count + preCount
            preCount = pre
        }
        i++
    }
    return count
  }

  onMounted(() => {})
  return fn
}
