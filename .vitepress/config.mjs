import { defineConfig } from 'vitepress'






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

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MomoWiki",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: {
      '/生物化学/': BioChemy,
    },

    socialLinks: [
      { icon: 'github', link: '' }
    ],
    search: {
      provider: 'local'
    },

  }
})
