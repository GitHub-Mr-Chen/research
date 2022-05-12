import { some } from 'lodash'
import { onMounted } from 'vue'
function ListNode() {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
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

export default function () {
  const fn = function (rowIndex) {
    let i = 0
    // .charAt(index) char at position
    // ss .concat(str1, str2...) combine text
    // b .startsWith(str, size) check beginning
    // n .length string size
    // .repeat(n) repeat string n times
    // .charCodeAt(index) unicode at pos.
    // s .fromCharCode(n1, n2...) c
    // 'a'.charAt(0)
    console.log('.charAt(0)', 'a'.charAt(0))
    return 1

  }

  onMounted(() => { })
  return fn
}


function currying(fn) {
  let args = []
  console.log('fn.length', fn.length)
  const inner = (arr = []) => {
    args.push(...arr)
    return args.length >= fn.length ? fn(...args) : (...a) => inner(a)
  }
  return inner()
}
function add1(x1, x2, x3) {
  console.log('x1, x2, x3', x1, x2, x3)
  // clo
  // return args.reduce((a, b) => a + b)
}
const addC = currying(add1)
console.log('addC', addC)
// addC(1, 2)(3)()
console.log('addC(1, 2)(3)()', addC(1)(1)(2))
