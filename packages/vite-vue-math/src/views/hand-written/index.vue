<template>
	<router-view></router-view>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const { push, replace } = useRouter()
</script>
