export default {
  site: {
    title: 'Mete0r 的个人主页', //网站标题
    icon: 'https://img.xscnet.cn//i/2026/04/11/69da42c41efd5.png', //网站图标
    background: 'https://img.xscnet.cn//i/2026/04/11/69da185da44e4.png', //网站背景
    useSpecialLightPalette: true, // 是否启用白天特殊配色
    useSpecialDarkPalette: false // 是否启用黑夜特殊配色
  },
  author: {
    name: 'Mete0r', //你的名称
    avatar: 'https://img.xscnet.cn//i/2026/04/11/69da166816afc.jpg', //你的头像
    intro: '你好，我是Mete0r，一名学生 | Trust The Process.', //你的简介
    aiPortrait: 'https://img.xscnet.cn//i/2026/04/11/69da42c41efd5.png', //你的画像
    mbti: 'INTP', //你的MBTI人格类型(影响到关于我页面)
    aboutMeintro: '一名高中生，⌈ 给时光以生命，给岁月以文明 ⌋  |  小王子说：你要对你种下的玫瑰花负责。 保护她的刺，保护她的花瓣。 是你在那朵玫瑰花上耗费的时间和经历，才使得他变得如此重要。 「因为被这朵玫瑰花驯养，所以我们彼此互相需要 。」' //关于我的介绍
  },
  navLinks: [ //导航栏
    { name: '首页', url: '/' },
    { name: '社交', url: '#socials' },
    { name: '项目', url: '#projects' },
    { name: '文章', url: '#articles' },
    { name: '关于我', url: '/about' }
  ],
  blog: { //跳转博客相关配置
    url: 'https://www.xscnet.cn',
    rssFeed: 'https://www.xscnet.cn/atom.xml',
    randomCoverApi: 'https://rand.xscnet.cn/mix' //随机封面API（可选，文章列表会使用这个接口获取随机封面图）
  },
  github: {
    useGithubApi: true, // 是否使用 GitHub API 获取项目（如果为 false，则只显示 manualRepos 中的项目）
    username: 'mete0rxsc', // GitHub 用户名
    maxRepos: 4, // 最大显示仓库数量
    excludeForks: true,  // 是否排除 Fork 的仓库

    // API 模式下：按仓库名称匹配封面
    covers: {
      // 'repo-name': 'https://example.com/repo-cover.jpg'
      'minimal-homepage': 'https://img.xscnet.cn//i/2026/04/12/69db326f931e2.webp',
      'Minecraft-Tree-Hole': 'https://img.xscnet.cn//i/2026/04/12/69db32f13bd07.webp',
      'Mete0r-Tree-Hole': 'https://img.xscnet.cn//i/2026/04/12/69db348b726e1.webp',
      'valaxy-yun-external-link': 'https://img.xscnet.cn//i/2026/04/12/69db34f47cc87.webp',
    },

    // 非 API 模式下：手动维护项目（不会显示 Star）
    manualRepos: [
      // {
      //   name: 'My Awesome Project',
      //   url: 'https://github.com/your-name/your-repo',
      //   description: '项目简介',
      //   language: 'JavaScript',
      //   visibility: 'public',
      //   cover: 'https://example.com/cover.jpg'
      // }
    ]
  },
  socials: [ //社交链接
    { name: 'GitHub', label: 'Open Source', icon: 'https://res.xscnet.cn/BlogStatic/Icon/svg/github-line.svg', url: 'https://github.com/mete0rxsc/' },
    { name: 'X', label: 'Daily Life', icon: 'https://res.xscnet.cn/BlogStatic/Icon/svg/twitter-x-line.svg', url: 'https://x.com/Cqmoyuan/' },
    { name: 'Bilibili', label: 'Videos', icon: 'https://res.xscnet.cn/BlogStatic/Icon/svg/bilibili-line.svg', url: 'https://space.bilibili.com/482787121' },
    { name: '163Music', label: 'Music', icon: 'https://res.xscnet.cn/BlogStatic/Icon/svg/MdiMusicClefTreble.svg', url: 'https://music.163.com/#/artist?id=95704903' },
    { name: 'Email', label: 'Contact Me', icon: 'https://res.xscnet.cn/BlogStatic/Icon/svg/mail-line.svg', url: 'mailto:Mete0r_xsc@hotmail.com' },
    { name: 'Youtube', label: 'Community', icon: 'https://res.xscnet.cn/BlogStatic/Icon/svg/LineMdYoutubeFilled.svg', url: 'https://www.youtube.com/@Mete0r7023' }
  ],
  footer: {
    icp: '吉ICP备2025026551号-2', //ICP备案号
    copyright: '© 2026 Mete0r. All rights reserved.', //版权信息
    email: 'Mete0r_xsc@hotmail.com', //联系邮箱
    links: [ //页脚右下角链接，可不写icon
      {
        name: 'Email',
        icon: 'https://res.xscnet.cn/BlogStatic/Icon/svg/mail-line.svg',
        url: 'mailto:Mete0r_xsc@hotmail.com'
      },
      {
        name: 'GitHub',
        icon: 'https://res.xscnet.cn/BlogStatic/Icon/svg/github-line.svg',
        url: 'https://github.com/mete0rxsc/minimal-homepage'
      }
    ]
  }
}

