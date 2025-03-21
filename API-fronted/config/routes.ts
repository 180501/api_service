// export default [
//   { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
//   { path: '/welcome', icon: 'smile', component: './Index' },
//   {
//     path: '/admin',
//     icon: 'crown',
//     name: '管理页',
//     access: 'canAdmin',
//     routes: [
//       { name: '子页面', path: '/admin', redirect: '/admin/sub-page' },
//       { name: '无用', path: '/admin/sub-page', component: './Admin' },
//     ],
//   },
//   { name: '欢迎', icon: 'smile', path: '/', redirect: '/welcome' },
//   { name: '查询表格' , icon: 'table', path: '/list', component: './InterfaceInfo' },
//   { path: '*', layout: false, component: './404' },
// ];



export default [
  {path: '/', name:'主页',icon:'smile',component:'./Index'},
  {path: '/interface_info/:id', name:'查看接口',icon:'smile',component:'./InterfaceInfo',hideInMenu:true},
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  // { path: '/welcome', name: '欢迎', icon: 'smile', component: './Index' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    // 权限控制可以去看 and design pro 的官方文档，不用纠结为什么这么写，就是人家设定的规则而已
    access: 'canAdmin',
    routes: [
      { name: '接口管理', icon: 'table', path: '/admin/interface_info', component: './Admin/InterfaceInfo' },
      { name: '接口分析', icon: 'analysis', path: '/admin/interface_analysis', component: './Admin/InterfaceAnalysis' },

    ],
  },

  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
