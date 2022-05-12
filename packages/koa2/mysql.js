const mysql = require('mysql')

const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mysql'
})

pool.connect()

const fields = ['name', 'age', 'weight', 'gender', 'height', 'city']

module.exports = function (tableName) {
  return {
    query(getParam) {
      const { page, pageSize } = getParam
      return new Promise((resolve, reject) => {
        // const querySql = `SELECT * FROM ${tableName} limit ${
        //   (page - 1) * pageSize
        // },${pageSize}`
        const querySql = `SELECT * FROM ${tableName}`
        pool.query(querySql, function (error, result, fields) {
          // let sql = `SELECT COUNT(*) as total FROM ${tableName};`
          // pool.query(sql, [], (err, rows1, fileds) => {
          //   console.log('rows1', rows1)
          //   let total = rows1[0]['total']
          //   console.log('total', total)
          //   // res.json({
          //   //   message: 'ok',
          //   //   data: {
          //   //     rows,
          //   //     total
          //   //   },
          //   //   code: 'S000'
          //   // })
          // })

          if (error) {
            reject(error)
            throw error
          }
          resolve(result)
        })
      })
    },
    add(postParam) {
      return new Promise((resolve, reject) => {
        console.log('add', postParam)
        const addSql = `INSERT INTO ${tableName}(${fields.toString()}) VALUES(?,?,?,?,?,?)`
        const addSqlParams = []
        fields.forEach((key) => {
          addSqlParams.push(postParam[key])
        })
        //增
        pool.query(addSql, addSqlParams, function (error, result, fields) {
          if (error) {
            reject(error)
            throw error
          }
          resolve(result)
        })
      })
    },
    update(postParam) {
      return new Promise((resolve, reject) => {
        console.log('update', postParam)
        const collectionFields = fields.reduce((pre, current, index, array) => {
          return `${pre}${current} = ?${index === array.length - 1 ? ' ' : ','}`
        }, '')
        const modSql = `UPDATE ${tableName} SET ${collectionFields} WHERE id = ${postParam.id}`
        const modSqlParams = []
        delete postParam.id
        fields.forEach((key) => {
          modSqlParams.push(postParam[key])
        })
        //改
        pool.query(modSql, modSqlParams, function (error, result) {
          if (error) {
            reject(error)
            throw error
          }
          resolve(result)
        })
      })
    },
    delete(postParam) {
      return new Promise((resolve, reject) => {
        console.log('delete', postParam)
        const delSql = `DELETE FROM ${tableName} where id=${postParam.id}`
        //删
        pool.query(delSql, function (error, result) {
          if (error) {
            reject(error)
            throw error
          }
          resolve(result)
        })
      })
    }
  }
}
