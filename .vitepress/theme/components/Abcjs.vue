<template>
  <div ref="abcContainer"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import abcjs from 'abcjs'

const props = defineProps({
  abc: { type: String, required: true }
})

const abcContainer = ref(null)

const renderOptions = {
  responsive: 'resize',
  selectTypes: [],       // 禁止选中
  clickListener: null,   // 禁止点击
  scale: 0.8,            // 适当缩小
  showHeader: true,      // 显示标题
  showComposer: true,
  showTempo: true,      // 隐藏速度标记
}

onMounted(() => {
  abcjs.renderAbc(abcContainer.value, props.abc, renderOptions)
})

watch(() => props.abc, () => {
  abcContainer.value.innerHTML = ''
  abcjs.renderAbc(abcContainer.value, props.abc, renderOptions)
})
</script>