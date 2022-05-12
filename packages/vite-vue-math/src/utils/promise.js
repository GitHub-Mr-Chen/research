import { isFunction, iteratorToMap } from './currying'
export default function MyPromise(execute) {
  const _this = this
  _this.data = undefined
  _this.callbacks = []
  _this.state = 'pending'
  const resolve = (res) => handle(res, 'fulfilled', 'onResolved')
  const reject = (res) => handle(res, 'rejected', 'onRejected')

  execute(resolve, reject)

  function handle(res, state, onFun) {
    if (_this.state === 'pending') {
      _this.data = res
      _this.state = state
      _this.callbacks.forEach((f) => f[onFun](res))
    }
  }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
  onResolved = isFunction(onResolved) ? onResolved : (value) => value
  onRejected = isFunction(onRejected)
    ? onRejected
    : (error) => {
        throw error
      }

  return new MyPromise((resolve, reject) => {
    const handle = (fn) => {
      try {
        const result = fn(this.data)
        if (result instanceof MyPromise) {
          result.then(resolve, reject)
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }

    if (this.state === 'pending') {
      this.callbacks.push({
        onResolved() {
          handle(onResolved)
        },
        onRejected() {
          handle(onRejected)
        },
      })
    }
    if (this.state === 'fulfilled') {
      handle(onResolved)
    }
    if (this.state === 'rejected') {
      handle(onRejected)
    }
  })
}

MyPromise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

MyPromise.prototype.finally = function (onFinally) {
  return this.then(onFinally, onFinally)
}

MyPromise.resolve = function (value) {
  return value instanceof MyPromise
    ? value
    : new MyPromise((resolve, reject) => {
        resolve(value)
      })
}

MyPromise.reject = function (err) {
  return new MyPromise((resolve, reject) => {
    reject(err)
  })
}

MyPromise.all = function (iterator) {
  iterator = iteratorToMap(iterator)

  return new MyPromise((resolve, reject) => {
    const resolves = []
    let numbers = 0
    for (const [index, item] of iterator) {
      MyPromise.resolve(item).then((value) => {
        numbers++
        resolves[index] = value

        if (resolves.length === numbers) {
          resolve(resolves)
        }
      }, reject)
    }
  })
}

MyPromise.allSettled = function (iterator) {
  iterator = iteratorToMap(iterator)
  return new MyPromise((resolve, reject) => {
    const resolves = []
    let numbers = 0
    for (const [index, item] of iterator) {
      MyPromise.resolve(item).then(
        (value) => {
          resolves[index] = value
          cb()
        },
        (err) => {
          resolves[index] = err
          cb()
        },
      )
    }
    function cb() {
      numbers++
      if (resolves.length === numbers) {
        resolve(resolves)
      }
    }
  })
}

MyPromise.race = function (iterator) {
  iteratorToMap(iterator)
  return new MyPromise((resolve, reject) => {
    for (const item of iterator) {
      MyPromise.resolve(item).then(resolve, reject)
    }
  })
}

MyPromise.resolveDelay = function (value, timeout = 0) {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      if (value instanceof MyPromise) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    }, timeout)
  })
}

MyPromise.rejectDelay = function (err, timeout = 0) {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      reject(err)
    }, timeout)
  })
}
