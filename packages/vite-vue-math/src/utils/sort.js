function swap(array, left, right) {
  //  异或交换位置
  array[left] = array[left] ^ array[right]
  array[right] = array[left] ^ array[right]
  array[left] = array[left] ^ array[right]
}

export const bubbleSort = (array = []) => {
  // 升序 isAscendingOrder = true
  for (let i = 0; i < array.length - 1; i++) {
    // 从 0 到 `length - 1` 遍历
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        // 交换位置
        swap(array, j, j + 1)
      }
    }
  }
  return array
}
// selectSort
export const selectSort = (array = []) => {
  // let minIndex
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < array.length; j++) {
      if (array[minIndex] > array[j]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      swap(array, minIndex, i)
    }
  }

  return array
}
// 插入排序的原理如下。第一个元素默认是已排序元素，
// 取出下一个元素和当前元素比较，如果当前元素大就交换位置。
// 那么此时第一个元素就是当前的最小数，所以下次取出操作从第三个元素开始，
// 向前对比，重复之前的操作。
// insertSort
export const insertSort = (array = []) => {
  for (let i = 1; i < array.length; i++) {
    let preIndex = i - 1
    let current = array[i]
    while (preIndex >= 0 && array[preIndex] > current) {
      array[preIndex + 1] = array[preIndex]
      preIndex--
    }
    array[preIndex + 1] = current

    // 最小的索引交换至当前索引之前
  }
  return array
}

// #归并排序
// 归并排序的原理如下。递归的将数组两两分开直到最多包含两个元素，
// 然后将数组排序合并，最终合并为排序好的数组。
// 假设我有一组数组 [3, 1, 2, 8, 9, 7, 6]，中间数索引是 3，
// 先排序数组 [3, 1, 2, 8] 。在这个左边数组上，继续拆分直到变成数组包含两个元素
// （如果数组长度是奇数的话，会有一个拆分数组只包含一个元素）。
// 然后排序数组 [3, 1] 和 [2, 8] ，然后再排序数组 [1, 3, 2, 8] ，
// 这样左边数组就排序完成，然后按照以上思路排序右边数组，
// 最后将数组 [1, 2, 3, 8] 和 [6, 7, 9] 排序。

// #归并排序
export function mergeSort(array, left, right) {
  // 左右索引相同说明已经只有一个数
  if (left === right) return
  // 等同于 `left + (right - left) / 2`
  // 相比 `(left + right) / 2` 来说更加安全，不会溢出
  // 使用位运算是因为位运算比四则运算快
  let mid = parseInt(left + ((right - left) >> 1))
  mergeSort(array, left, mid)
  mergeSort(array, mid + 1, right)

  let help = []
  let i = 0
  let p1 = left
  let p2 = mid + 1
  while (p1 <= mid && p2 <= right) {
    help[i++] = array[p1] < array[p2] ? array[p1++] : array[p2++]
  }
  while (p1 <= mid) {
    help[i++] = array[p1++]
  }
  while (p2 <= right) {
    help[i++] = array[p2++]
  }
  for (let i = 0; i < help.length; i++) {
    array[left + i] = help[i]
  }
  return array
}

export function quickSort(array) {
  /*  快排
      快排的原理如下。
      随机选取一个数组中的值作为基准值，从左至右取值与基准值对比大小。
      比基准值小的放数组左边，大的放右边，对比完成后将基准值和
      第一个比基准值大的值交换位置。
      然后将数组以基准值的位置分为两部分，继续递归以上操作。 */

  // 如果只剩下一个数，无需比较直接返回
  if (array.length <= 1) {
    return array
  }
  // 默认选择中间数为基准值
  const j = Math.floor(array.length / 2)
  // 取出中间数，取出的原因是可能有相等的数，以免重复比较
  const jValue = array.splice(j, 1)

  // 准备左右两个数组
  const left = []
  const right = []
  for (let i = 0; i < array.length; i++) {
    const el = array[i]
    // 升序
    // 小于基准值的放左边数组
    // 其他大基准值的放右边数组
    if (el < jValue) {
      left.push(el)
    } else {
      right.push(el)
    }
  }
  return [...quickSort(left), ...jValue, ...quickSort(right)]
}
