import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custom.css'
import Trivial from './Trivial.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Trivial', Trivial)
  }
}