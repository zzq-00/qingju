export default [
  {
    path: '/newsCenter',
    name: 'newsCenter',
    component: () => import('@/pages/newsCenter/index'),
    children: [
      {
        path: 'news',
        component: () => import('@/pages/newsCenter/news')
      },
      {
        path: 'activity',
        component: () => import('@/pages/newsCenter/activity')
      },
      {
        path: 'activeNewsDetail',
        component: () => import('@/pages/newsCenter/activeNewsDetail')
      },
      {
        path: 'newsDetail/:id',
        component: () => import('@/pages/newsCenter/newsDetail')
      }
    ]
  }

]
