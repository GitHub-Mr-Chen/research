const router = require('koa-router')()
const Mysql = require('../mysql')
const handler = Mysql('koa_student')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

const prefix = '/student'

router.get(`${prefix}/list`, async (ctx, next) => {
  let request = ctx.request
  let getParam = request.query
  const data = await handler.query(getParam)
  ctx.body = {
    code: 200,
    msg: 'success',
    data
  }
})

router.post(`${prefix}/update`, async (ctx, next) => {
  let postParam = ctx.request.body //获取post提交的数据
  const data = await handler.update(postParam)
  ctx.body = {
    code: 200,
    msg: 'success',
    data
  }
})

router.post(`${prefix}/delete`, async (ctx, next) => {
  let postParam = ctx.request.body //获取post提交的数据
  const data = await handler.delete(postParam)
  ctx.body = {
    code: 200,
    msg: 'success',
    data
  }
})

router.post(`${prefix}/add`, async (ctx, next) => {
  let postParam = ctx.request.body //获取post提交的数据
  const data = await handler.add(postParam)
  ctx.body = {
    code: 200,
    msg: 'success',
    data
  }
})

module.exports = router
