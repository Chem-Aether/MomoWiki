import { defineConfig } from 'vitepress'
import { directoryTreeToJson , buildDirectoryTree} from './meun.mjs'


const BioChemy = [
  {
    text:'生物化学原理',
    items:[
      {text:'1.氨基酸',link:''},
      {text:'14.维生素与辅酶',link:'/生物化学/14.维生素与辅酶/',
        items:[
          {text:'1.水溶性维生素',link:'/生物化学/14.维生素与辅酶/1.水溶性维生素/',
            items:[
              {text:'1.B族维生素',link:'/生物化学/14.维生素与辅酶/1.水溶性维生素/1.B族维生素/1.维生素B1',collapsed: true,
                items:[
                  {text:'1.维生素B1',link:'/生物化学/14.维生素与辅酶/1.水溶性维生素/1.B族维生素/1.维生素B1'},
                  {text:'2.维生素B2',link:'/生物化学/14.维生素与辅酶/1.水溶性维生素/1.B族维生素/2.维生素B2'},
                  {text:'3.维生素B3',link:'/生物化学/14.维生素与辅酶/1.水溶性维生素/1.B族维生素/3.维生素B3'},
                  {text:'4.维生素B5',link:'/生物化学/14.维生素与辅酶/1.水溶性维生素/1.B族维生素/4.维生素B5'},
                  {text:'5.维生素B6',link:'/生物化学/14.维生素与辅酶/1.水溶性维生素/1.B族维生素/5.维生素B6'},
                  {text:'6.叶酸',link:'/生物化学/14.维生素与辅酶/1.水溶性维生素/1.B族维生素/6.叶酸'},
                  {text:'7.维生素B7',link:'/生物化学/14.维生素与辅酶/1.水溶性维生素/1.B族维生素/7.维生素B7'},
                  {text:'8.维生素B12',link:'/生物化学/14.维生素与辅酶/1.水溶性维生素/1.B族维生素/8.维生素B12'},
                ]
              },
              {text:'2.维生素C',link:'/生物化学/14.维生素与辅酶/1.水溶性维生素/2.维生素C'},
            ]
          },
        ]
      },
    ]
  }
];

const kaoyanzz = [
  {
    text:'考研政治理论知识',
    items:[
      { text:'马克思主义原理',
        items:[
          {
            text:'0.导学',link:'/考研政治/理论知识/马克思主义原理/0.导学/1.马克思主义的内涵及构成',collapsed: true,
            items: [{
              text:'马克思主义的内涵及构成',link:'/考研政治/理论知识/马克思主义原理/0.导学/1.马克思主义的内涵及构成',
            }]
          },
          {
            text:'1.马克思主义哲学',link:'/考研政治/理论知识/马克思主义原理/0.导学/1.马克思主义的内涵及构成',collapsed: true,
            items: [],
          }
        ],
      },
      {text:'毛泽东思想和中国特色社会主义理论体系概论',link:'/考研政治/理论知识'},
      {text:'思想道德与法制',link:'/考研政治/理论知识'},
      {text:'习近平新时代中国特色社会主义思想概论',link:'/考研政治/理论知识'},
      {text:'中国近代史纲要',link:'/考研政治/理论知识'},
    ],
  }
];

export default defineConfig({
  base: "/MomoWiki/",
  
  title: "MomoWiki",
  description: "2025考研资料站",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: {
      '/生物化学/': buildDirectoryTree('./生物化学'),
      '/考研政治/': buildDirectoryTree('./考研政治'),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Chem-Aether/MomoWiki' }
    ],
    search: {
      provider: 'local'
    },

  }
})
