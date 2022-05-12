// 柯里化函数
export default function currying(fn) {
  const args = []
  const inner = (arr = []) => {
    args.push(...arr)
    return args.length >= fn.length ? fn(...args) : (...a) => inner(a)
  }
  return inner()
}

function isType(type) {
  return (value) => Object.prototype.toString.call(value) === `[object ${type}]`
}

export const isNumber = currying(isType)('Number')
export const isFunction = currying(isType)('Function')
export const isArray = currying(isType)('Array')
export const isString = currying(isType)('String')
export const isNull = currying(isType)('Null')
export const isDate = currying(isType)('Date')
export const isUndefined = currying(isType)('Undefined')
export const isSymbol = currying(isType)('Symbol')
export const isObject = currying(isType)('Object')
export const isBigInt = currying(isType)('BigInt')
export const isRegExp = currying(isType)('RegExp')

export function iteratorToMap(iterator) {
  if (isFunction(iterator[Symbol.iterator])) {
    const mapIterator = new Map()
    let key = 0
    for (const item of iterator) {
      mapIterator.set(key, item)
      key++
    }
    return mapIterator
  } else {
    throw new Error('参数错误，无iterator')
  }
}
