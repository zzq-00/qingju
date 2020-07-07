export default [{
  path: '/Setting',
  component: () => import('@/pages/Setting/Setting'),
  // redirect: '/Setting',
  meta: {
    roles: ['q33u']
  },
  children: [{
      path: 'personInfo',
      component: () => import('@/pages/Setting/personInfo'),
      meta: {
        roles: ['q33u']
      }
    },
    {
      path: 'accountsecurity',
      component: () => import('@/pages/Setting/accountsecurity'),
    },
    {
      path: 'accountsecurity/resetpassword',
      component: () => import('@/pages/Setting/resetPassword'),
      meta: {
        roles: ['G81qMI']
      }
    },
    {
      path: 'accountsecurity/paymentpassword',
      component: () => import('@/pages/Setting/paymentpassword'),
      meta: {
        roles: ['lCVNOD']
      },
    },
    {
      path: 'accountsecurity/updatePassword',
      component: () => import('@/pages/Setting/updatePassword'),
      meta: {
        roles: ['lCVNOD']
      },
    },
    {
      path: 'operateRecord',
      component: () => import('@/pages/Setting/operateRecord'),
    },
    {
      path: 'accountsecurity/forgetpaymentpassword', // 忘记支付密码
      component: () => import('@/pages/Setting/forgetPaymentPassword')
    },
    {
      path: 'userAttestation',
      component: () => import('@/pages/Setting/userAttestation'),
      redirect: '/Setting/userAttestation/personage',
      children: [
        {
          path: 'personage',
          component: () => import('@/pages/Setting/personRealName'),
          meta: {
            roles: ['8MG5']
          },
        },
        {
          path: 'enterprise',
          component: () => import('@/pages/Setting/companyRealName')
        }
      ]
    },
    {
      path: 'address',
      component: () => import('@/pages/Setting/address'),
      meta: {
        roles: ['3kCm']
      }
    },
    {
      path: 'code',
      component: () => import('@/pages/Setting/code'),
      meta: {
        roles: ['B8YO']
      }
    },
    {
      path: 'authentication',
      component: () => import('@/pages/Setting/authentication'),
    },
    {
      path: 'verifyEmail',
      component: () => import('@/pages/Setting/verifyEmail'),
    },
  ]
}, {
  path: '/Setting/agreementUser',//认证协议
  component: () => import('@/pages/Setting/agreementUser'),
}]
