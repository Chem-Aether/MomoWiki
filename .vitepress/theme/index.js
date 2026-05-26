import DefaultTheme from 'vitepress/theme'
import Abcjs from './components/Abcjs.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Abcjs', Abcjs)
  }
}
