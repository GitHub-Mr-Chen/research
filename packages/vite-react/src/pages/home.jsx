import { useEffect } from 'react'
import axios from 'axios'

const fetchList = () => {
  return axios.get('http://47.112.97.151:8000/users', {
    params: { pageSize: 10, page: 10 },
  })
}

const fetchGet = () => {
  return axios.get('http://47.112.97.151:8000/users/bar', {
    params: { pageSize: 10, page: 10 },
  })
}

export default function () {
  useEffect(async () => {
    const users = fetchList()
    console.log('users :>> ', users)
    const bar = fetchGet()
    console.log('bar :>> ', bar)
  }, [])
  return <div>首页</div>
}
