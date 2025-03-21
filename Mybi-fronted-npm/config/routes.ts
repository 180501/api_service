export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {path: '/add_chart', name: '数据分析', icon: 'barChart', component: './AddChart'},
  {path: '/add_chart_async', name: '数据分析异步', icon: 'barChart', component: './AddChartAsync'},
  { name:'我的图表',path: '/my_chart', icon: 'pieChart', component: './MyChart' },
  {path: '/prompt', name: 'AI提词', icon: 'form', component: './Welcome'},
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
