<template>
	<div>
		<el-button type="primary" size="small" @click="tap">点击激活.then()</el-button>
    Promise Class实现
		<highlightjs autodetect :code="MyPromiseClass.toString()" />
	</div>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import MyPromise from '../../utils/promise';
import MyPromiseClass from '../../utils/promise_';

const { push, replace } = useRouter()
const tap = (v) => {
	isThrow.value = !isThrow.value
}
const isThrow = ref(false)
// Promise 对象有以下两个特点:
// 1、对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：

// pending: 初始状态，不是成功或失败状态。
// fulfilled: 意味着操作成功完成。
// rejected: 意味着操作失败。
function mP(params = 0) {
	return new MyPromise((resolve, reject) => {
		setTimeout(() => {
			if (new Date().getTime() % 2) {
				resolve('then ' + params)
			} else {
				reject('reject ' + params)
			}
			// console.log(`resolve`, resolve)
		}, 1000)
	})
}



watchEffect(() => {
	isThrow.value
	// mP()
	// 	.then(
	// 		(res) => {
	// 			console.log(`onResolved 1`, res)
	// 			return mP(1)
	// 		},
	// 		(err) => {
	// 			console.log(`onRejected 1`, err)
	// 		}
	// 	)
	// 	.then(
	// 		(res) => {
	// 			console.log(`onResolved 2`, res)
	// 			throw 'throw '
	// 		},
	// 		(err) => {
	// 			console.log(`onRejected 2`, err)
	// 			throw 'throw err'
	// 		}
	// 	)
	// 	.catch((err) => {
	// 		console.log(`onRejected 3`, err)
	// 		return mP(2)
	// 	})
	// 	.then(
	// 		(res) => {
	// 			console.log(`onResolved 4`, res)
	// 			return mP(3)
	// 		},
	// 		(err) => {
	// 			console.log(`onRejected 4`, err)
	// 		}
	// 	)
	// 	.then(
	// 		(res) => {
	// 			console.log(`onResolved 5`, res)
	// 		},
	// 		(err) => {
	// 			console.log(`onRejected 5`, err)
	// 		}
	// 	)


	const p4 = new MyPromise((resolve, reject) => {
		setTimeout(() => {
			resolve('resolve ' + 4)
			// console.log(`resolve`, resolve)
		}, 800)
	})

	const p1 = MyPromise.resolveDelay(MyPromise.resolve(1), 3000)

	const p2 = MyPromise.resolve(MyPromise.resolve(2))
	// const p3 = MyPromise.resolve(MyPromise.resolve(4))

	MyPromise.all([p4, p2, p1, 'end']).then(
		(value) => { console.log(`p all`, value) },
		(err) => { console.log(`p all err`, err) },
	)

	MyPromise.race([p1, p4,])
		.then(
			(value) => {
				console.log(`p race`, value)
			},
			(err) => { console.log(`p race err`, err) },
		)
})

</script>
