import { Button, Badge, Card } from 'antd'
import { useEffect, useRef, useState } from 'react'

import defineHookDom, { destroyed } from '../utils/define-hook'

function useMount(fn) {
  useEffect(() => {
    fn()
  }, [])
}
function useUnmount(fn) {
  useEffect(() => {
    return fn
  }, [])
}
function useTimeout(fn, delay = 2000) {
  const [state, setstate] = useState(null)
  useEffect(() => {
    setTimeout(fn, delay)
  }, [delay])
  function run(params = 0) {
    setstate(Math.pow(params, 3))
  }
  return [state, run]
}
export default function () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    defineHookDom()
    return () => {
      destroyed()
    }
  }, [])

  const [data, run] = useTimeout((e) => {
    console.log('延时执行', e)
    run(20)
    // run('hello')
  }, 1000)

  useEffect(() => {
    console.log('data :>> ', data)
  }, [data])

  useMount(() => {
    console.log('组件渲染完成')
  })
  useUnmount(() => {
    console.log('组件已卸载')
  })
  return (
    <>
      <div id="hook-root">hook实现</div>
      <h4>&nbsp;</h4>
      <Badge.Ribbon text={`count => ${count}`} color="red">
        <Card title="Pushes open the window" size="small">
          <Button type="primary" onClick={() => setCount(count + 1)}>
            点击
          </Button>
        </Card>
      </Badge.Ribbon>
    </>
  )
}
