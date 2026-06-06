import DefaultTheme from 'vitepress/theme'
import Abcjs from './components/Abcjs.vue'
import AbcPlayer from './components/AbcPlayer.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Abcjs', Abcjs)
    app.component('AbcPlayer', AbcPlayer)
  }
}
