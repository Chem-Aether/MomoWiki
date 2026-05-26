import { defineConfig } from 'vitepress'
import { buildDirectoryTree } from './scripts/meun.mjs'
import { abcjsPlugin } from './scripts/markdown-abcjs.js'

// npm run docs:dev

export default defineConfig({
  base: '/MomoWiki/',

  vite: {
    resolve: {
      alias: {
        '@theme': __dirname + '/theme',
      },
    },
  },

  title: 'MomoWiki',
  description: '医药与计算机交叉学课资料站',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: {
      '/计算化学与分子模拟/': buildDirectoryTree('./计算化学与分子模拟'),
      '/药物设计概论/': buildDirectoryTree('./药物设计概论'),
      '/人工智能/': buildDirectoryTree('./人工智能'),
      '/系统配置/': buildDirectoryTree('./系统配置'),
      '/计算机体系基础/': buildDirectoryTree('./计算机体系基础'),
      '/科普知识/': buildDirectoryTree('./科普知识'),
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Chem-Aether/MomoWiki' }
    ],
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3],
    },
    lastUpdated: {
      text: '最新更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }

  },

  markdown: {
    config: (md) => {
      md.use(abcjsPlugin)
    },
    math: true
  },
})

