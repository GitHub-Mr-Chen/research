import axios from 'axios'

export const fetchAdd = (params) => {
  return axios.post('/api/student/add', params)
}

export const fetchUpdate = ({ id, ...params }) => {
  return axios.post('/api/student/update', { id, ...params })
}

export const fetchDelete = (id) => {
  return axios.post('/api/student/delete', { id })
}

export const fetchList = () => {
  return axios.get('/api/student/list', {
    params: { pageSize: 10, page: 10 }
  })
}
