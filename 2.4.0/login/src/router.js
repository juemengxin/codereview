import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'index',
      component: () => import('./views/Index.vue')
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('./views/SignIn.vue')
    }, {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('./views/SignUp.vue')
    }, {
      path: '/user-info',
      name: 'user-info',
      component: () => import('./views/UserInfo.vue')
    }, {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('./views/ResetPassword.vue')
    }, {
      path: '/mobile-reset',
      name: 'mobile-reset',
      component: () => import('./views/MobileReset.vue')
    }, {
      path: '/email-reset',
      name: 'email-reset',
      component: () => import('./views/EmailReset.vue')
    }, {
      path: '/question-reset',
      name: 'question-reset',
      component: () => import('./views/QuestionReset.vue')
    }, {
      path: '/none-reset',
      name: 'none-reset',
      component: () => import('./views/NoneReset.vue')
    }, {
      path: '/product-description',
      name: 'product-description',
      component: () => import('./views/ProductDescription.vue')
    }, {
      path: '/contact-information',
      name: 'contact-information',
      component: () => import('./views/ContactInformation.vue')
    }, {
      path: '/disclaimer',
      name: 'disclaimer',
      component: () => import('./views/Disclaimer.vue')
    }, {
      path: '/buy-books',
      name: 'buy-books',
      component: () => import('./views/BuyBooks.vue')
    }, {
      path: '/bound-mobile',
      name: 'bound-mobile',
      component: () => import('./views/BoundMobile.vue')
    }, {
      path: '/understand',
      name: 'understand',
      component: () => import('./views/Understand.vue')
    }, {
      path: '/select-user-type',
      name: 'select-user-type',
      component: () => import('./views/SelectUserType.vue')
    }, {
      path: '/bound-account',
      name: 'bound-account',
      component: () => import('./views/BoundAccount.vue')
    }, {
      path: '/change-password',
      name: 'change-password',
      component: () => import('./views/ChangePassword.vue')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // 判断from页面是否有滚动行为
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
