// 是否渲染完成
let isMount = true
// hook工作进程
let workInProgressHook = null

const fiber = {
  // 状态节点
  stateNode: () => renderVNode(App()),
  // 记忆状态
  memorizedState: null
}
function useState(initialState) {
  // 当前是哪个hook使用的useState
  let hook
  // 初次渲染
  if (isMount) {
    hook = {
      // 初始化状态
      memorizedState: initialState,
      // hook是一个链表，指针指向下一个hook
      next: null,
      // 更新队列
      queue: {
        pending: null
      }
    }
    // 如果memorizedState不存在
    if (!fiber.memorizedState) {
      fiber.memorizedState = hook
    } else {
      // 已经创建过hook
      // 则将接下来的hook用链表连接
      workInProgressHook.next = hook
    }
    // 当前hook为
    workInProgressHook = hook
  } else {
    // 非mount，则为update
    // 已经存在当前hook
    hook = workInProgressHook
    workInProgressHook = workInProgressHook.next
  }

  let baseState = hook.memorizedState
  if (hook.queue.pending) {
    // 本次更新有新的update需要被执行
    let firstUpdate = hook.queue.pending.next

    do {
      const action = firstUpdate.action
      // 可接收方法和常量
      baseState =
        Object.prototype.toString.call(action) === '[object Function]'
          ? action(baseState)
          : action
      firstUpdate = firstUpdate.next
    } while (firstUpdate !== hook.queue.pending.next)

    hook.queue.pending = null
  }

  hook.memorizedState = baseState
  return [baseState, dispatchAction.bind(null, hook.queue)]
  // return [baseState, () => dispatchAction(hook.queue)]
}
// 派遣行动
function dispatchAction(queue, action) {
  const update = {
    action,
    next: null
  }
  // 第一次调用
  if (queue.pending === null) {
    // 更新状态为环状链表，因为用户触发更新要优先于请求更新，这样用户操作响应更快，渲染更平滑
    update.next = update
  } else {
    // 成环
    update.next = queue.pending.next
    queue.pending.next = update
  }
  queue.pending = update

  schedule()
}
// // 销毁
export function destroyed() {
  isMount = true
  workInProgressHook = null
  fiber.memorizedState = null
}
// 更新数据
export default function schedule(domId = 'hook-root') {
  // 每次触发更新schedule，更新hook指针
  workInProgressHook = fiber.memorizedState
  const app = fiber.stateNode()
  isMount = false

  const root = document.getElementById(domId)
  root.innerHTML = null
  root.appendChild(app)
  return app
}
// -------------- 华丽的分割线，上面实现hook，下面实现虚拟dom --------------
function App() {
  const [state, setstate] = useState(0)
  const [state1, setstate1] = useState(10)
  console.log('isMount :>> ', isMount, 'isUpdate :>> ', !isMount)
  console.log('state :>> ', state)
  console.log('state1 :>> ', state1)
  return createElement(
    'div',
    {
      class: 'test'
    },
    [
      createElement(
        'ul',
        {
          class: 'test'
        },
        [
          createElement(
            'li',
            {
              class: 'test'
            },
            [
              createElement('p', {}, [`state => ${state}`]),
              createElement(
                'button',
                {
                  onClick: (e) => {
                    setstate((state) => state + 1)
                    // setstate((state) => state * 2n)
                  }
                },
                [`点击计算 (state + 1) * 2`]
              )
            ]
          ),

          createElement('li', { class: 'test' }, [
            createElement(
              'button',
              {
                class: 'test',
                onClick: (e) => {
                  setstate1(state1 + 10)
                }
              },
              [`请点击列表子元素`]
            ),
            ` state1 => ${state1}`
          ])
        ]
      ),
      '这是一个 textNode'
    ]
  )
}

function createElement(tag, porps, children) {
  return {
    tag,
    porps,
    children
  }
}

function renderVNode(vnode) {
  const dom = document.createElement(vnode.tag)
  const porps = vnode.porps
  for (const key in vnode.porps) {
    if (Object.hasOwnProperty.call(porps, key)) {
      if (/^on/.test(key)) {
        // 设置事件
        dom[key.toLowerCase()] = porps[key]
      } else {
        dom.setAttribute(key, porps[key])
      }
    }
  }
  const children = vnode.children
  for (let index = 0; index < children.length; index++) {
    const element = children[index]
    if (typeof element === 'object') {
      dom.appendChild(renderVNode(element))
    } else {
      dom.appendChild(document.createTextNode(element))
    }
  }
  return dom
}
