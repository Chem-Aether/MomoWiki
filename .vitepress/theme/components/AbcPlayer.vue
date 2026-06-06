<template>
  <div>
    <div ref="abcContainer"></div>
    <div ref="audioContainer"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import abcjs from 'abcjs'
import 'abcjs/abcjs-audio.css'

const props = defineProps({
  abc: { type: String, required: true }
})

const abcContainer = ref(null)
const audioContainer = ref(null)

let synthCtrl = null
let currentTune = null

const renderOptions = {
  responsive: 'resize',
  scale: 0.8,
  showHeader: true,
  showComposer: true,
  showTempo: true,
  add_classes: true
}

const renderScore = () => {
  if (!abcContainer.value || !audioContainer.value) return
  
  abcContainer.value.innerHTML = ''
  audioContainer.value.innerHTML = ''
  
  const tunes = abcjs.renderAbc(abcContainer.value, props.abc, renderOptions)
  
  if (!tunes || tunes.length === 0) return
  currentTune = tunes[0]
  
  synthCtrl = new abcjs.synth.SynthController()
  synthCtrl.load(audioContainer.value, null, {
    displayPlay: true,
    displayLoop: true,
    displayProgress: true,
    displayRestart: true,
    instrument: 'piano', // ✅ 指定乐器
    volume: 85
  })
  
  synthCtrl.setTune(currentTune, false)
}

const stop = () => {
  if (synthCtrl) synthCtrl.stop()
}

onMounted(renderScore)
watch(() => props.abc, () => {
  stop()
  renderScore()
})
</script>

<style scoped>
:deep(.abcjs-audio) {
  margin-top: 12px;
}
</style>