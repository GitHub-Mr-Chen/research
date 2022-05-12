import { isFunction, iteratorToMap } from './currying'
export default class MyPromise {
  data = undefined
  state = 'pending'
  callbacks = []

  constructor(execute) {
    const handle = (res, state, onFun) => {
      if (this.state === 'pending') {
        this.data = res
        this.state = state
        this.callbacks.forEach((f) => f[onFun](res))
      }
    }
    const resolve = (res) => handle(res, 'fulfilled', 'onResolved')
    const reject = (res) => handle(res, 'rejected', 'onRejected')

    execute(resolve, reject)
  }

  then(onResolved, onRejected) {
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

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    return this.then(onFinally, onFinally)
  }

  static resolve(value) {
    return value instanceof MyPromise
      ? value
      : new MyPromise((resolve, reject) => {
          resolve(value)
        })
  }

  static reject(err) {
    return new MyPromise((resolve, reject) => {
      reject(err)
    })
  }

  static all(iterator) {
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

  static allSettled(iterator) {
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

  static race(iterator) {
    iteratorToMap(iterator)
    return new MyPromise((resolve, reject) => {
      for (const item of iterator) {
        MyPromise.resolve(item).then(resolve, reject)
      }
    })
  }

  static resolveDelay(value, timeout = 0) {
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

  static rejectDelay(err, timeout = 0) {
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        reject(err)
      }, timeout)
    })
  }
}
