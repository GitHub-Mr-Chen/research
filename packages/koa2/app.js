const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// 导入处理history模式的模块
const { historyApiFallback } = require('koa2-connect-history-api-fallback')
// 静态文件强制缓存
const staticCache = require('koa-static-cache');

// const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// 处理history模式中间接
// koa2-connect-history-api-fallback中间件一定要放在静态资源服务中间件前面加载
app.use(historyApiFallback({
  index: '/index.html'
}))

// app.use(
//   staticCache(require('koa-static')(__dirname + '/public/assets'), {
//     maxAge: 10 * 24 * 60 * 60,
//   }),
//   staticCache(require('koa-static')(__dirname + '/public/stylesheets'), {
//     maxAge: 10 * 24 * 60 * 60,
//   }),
// );
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))


app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
