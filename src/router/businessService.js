export default [
  {
    path: '/businessService',
    name: 'businessService',
    component: () => import('@/pages/businessService/index'),
    children: [
      {
        path: 'estimate',
        component: () => import('@/pages/businessService/estimate')
      },
      {
        path: 'BIM',
        component: () => import('@/pages/businessService/BIM')
      },
      {
        path: 'releaseBIM',
        component: () => import('@/pages/businessService/releaseBIM')
      },
      {
        path: 'releaseEstimate',
        component: () => import('@/pages/businessService/releaseEstimate')
      },
      {
        path: 'releaseEstablishment',
        component: () => import('@/pages/businessService/releaseEstablishment')
      },
      {
        path: 'releaseDesign',
        component: () => import('@/pages/businessService/releaseDesign')
      },
      {
        path: 'releaseModeling',
        component: () => import('@/pages/businessService/releaseModeling')
      },
      {
        path: 'classicCaseList',
        component: () => import('@/pages/businessService/classicCaseList')
      },
      {
        path: 'classicCaseDetail/:id',
        component: () => import('@/pages/businessService/classicCaseDetail')
      },
      {
        path: 'productPresentation',
        component: () => import('@/pages/businessService/productPresentation')
      },
      {
        path: 'inquiryPrice',
        component: () => import('@/pages/businessService/inquiryPrice')
      },
      {
        path: 'design',
        component: () => import('@/pages/businessService/design')
      },
      {
        path: 'intelligentModeling',
        component: () => import('@/pages/businessService/intelligentModeling')
      },
    ]
  }
]
