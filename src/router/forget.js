
export default [{
  path: '/forget',
  component: () => import('@/pages/forget/index'),
}, {
  path: '/mobileForget/:id',
  component: () => import('@/pages/forget/mobileForget'),
},
{
  path: '/reset/:id',
  component: () => import('@/pages/forget/reset'),
},
{
  path: '/emailForget/:id',
  component: () => import('@/pages/forget/emailForget'),
}
]
