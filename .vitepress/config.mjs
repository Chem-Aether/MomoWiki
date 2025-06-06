import { defineConfig } from 'vitepress'
import { directoryTreeToJson, buildDirectoryTree } from './meun.mjs'

// npm run docs:dev


export default defineConfig({
  base: '/MomoWiki/',

  title: 'MomoWiki',
  description: '医药与计算机交叉学课资料站',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: {
      '/生物化学/': buildDirectoryTree('./生物化学'),
      '/动力学模拟/': buildDirectoryTree('./动力学模拟'),
      '/药物设计概论/': buildDirectoryTree('./药物设计概论'),
      '/机器学习/': buildDirectoryTree('./机器学习'),
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
      math: true
  },
})

