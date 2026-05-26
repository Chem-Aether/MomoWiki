<template>
  <div>
    <!-- 乐谱容器 -->
    <div ref="abcContainer"></div>
    <!-- 播放控件容器（必须单独放一个） -->
    <div ref="audioContainer"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import abcjs from 'abcjs'
// 关键：音频样式必须引入
import 'abcjs/abcjs-audio.css'

const props = defineProps({
  abc: { type: String, required: true }
})

const abcContainer = ref(null)
const audioContainer = ref(null)

// 渲染配置
const renderOptions = {
  responsive: 'resize',
  scale: 0.9,
  showHeader: true,
  showComposer: true,
  showTempo: true, // 显示 ♩=90
  add_classes: true
}

let synthCtrl = null
let lastTune = null

onMounted(() => {
  renderScore()
})

watch(() => props.abc, () => {
  renderScore()
})

function renderScore() {
  if (!abcContainer.value || !audioContainer.value) return

  // 清空旧内容
  abcContainer.value.innerHTML = ''
  audioContainer.value.innerHTML = ''

  // 渲染乐谱
  const tunes = abcjs.renderAbc(
    abcContainer.value,
    props.abc,
    renderOptions
  )

  if (!tunes || tunes.length === 0) return

  lastTune = tunes[0]

  // 初始化播放控制器（核心：这里才会生成播放按钮）
  synthCtrl = new abcjs.synth.SynthController()
  synthCtrl.load(audioContainer.value, null, {
    displayPlay: true,
    displayLoop: true,
    displayProgress: true,
    displayRestart: true
  })

  // 加载曲子
  synthCtrl.setTune(lastTune, false)
}
</script>

<style scoped>
/* 给播放控件一点上边距，不和乐谱贴太近 */
#audio {
  margin-top: 8px;
}
</style>