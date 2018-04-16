// 请求 www.apicloud.com 云数据库

const sha1 = require('sha1')
const axios = require('axios')

const dbName = 'todo'

// 设置请求地址
const request = axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api'
})

// 创建错误
const createError = (code, resp) => {
  const err = new Error(resp.message)
  err.code = code
  return err
}

// 请求结果处理
const handleRequest = ({ status, data, ...rest }) => {
  if (status === 200) return data
  throw createError(status, rest)
}

module.exports = (appId, appKey) => {
  // 请求数据库的header设置
  const getHeaders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  return {
    // 获取todo 列表
    async getAllTodos () {
      return handleRequest(await request.get(`/${dbName}`, {
        headers: getHeaders()
      }))
    },
    // 插入数据
    async addTodo (todo) {
      return handleRequest(await request.post(`/${dbName}`, todo, {
        headers: getHeaders()
      }))
    },
    // 更新数据
    async updateTodo (id, todo) {
      return handleRequest(await request.put(`/${dbName}/${id}`, todo, {
        headers: getHeaders()
      }))
    },
    // 删除一条数据
    async deleteTodo (id) {
      return handleRequest(await request.delete(`/${dbName}/${id}`, {
        headers: getHeaders()
      }))
    },
    // 删除已完成的
    async deleteCompleted (ids) {
      const requests = ids.map(id => {
        return {
          method: 'DELETE',
          path: `/mcm/api/${dbName}/${id}`
        }
      })
      return handleRequest(await request.post('/batch', { requests }, {
        headers: getHeaders()
      }))
    }
  }
}
