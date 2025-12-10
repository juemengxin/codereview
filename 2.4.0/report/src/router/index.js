import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import History from '@/components/History'
import Health from '@/components/Health'
import Help from '@/components/Help'
import HelpInfo from '@/components/HelpInfo'
import HealthInfo from '@/components/HealthInfo'
import Questionnaire from '@/components/Questionnaire'
import AnalysisReport from '@/components/AnalysisReport'
import UpdateRemark from '@/components/UpdateRemark'
import NjExplains from '@/components/NjExplains'
import EntryDetails from '@/components/EntryDetails'
import NjContent from '@/components/NjContent'
import HealthTrends from '@/components/HealthTrends'
import EntryHTML from '@/components/EntryHTML'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/', // 首页
      name: 'index',
      component: Index
    },
    {
      path: '/history', // 历史记录页面
      name: 'history',
      component: History
    },
    {
      path: '/health', // 健康百科页面
      name: 'health',
      component: Health
    },
    {
      path: '/healthinfo', // 健康百科详情页
      name: 'healthinfo',
      component: HealthInfo
    },
    {
      path: '/help', // 帮助中心
      name: 'help',
      component: Help
    },
    {
      path: '/helpinfo', // 帮助中心详情页
      name: 'helpinfo',
      component: HelpInfo
    },
    {
      path: '/questionnaire', // 问答页面
      name: 'questionnaire',
      component: Questionnaire
    },
    {
      path: '/analysisreport', // 分析报告页面
      name: 'analysisreport',
      component: AnalysisReport,
      children: [
        {
          path: '/njexplains', // 女性健康详情页
          name: 'njexplains',
          component: NjExplains,
          children: [
            {
              path: '/njcontent', // 女性健康完整描述
              name: 'njcontent',
              component: NjContent
            }
          ]
        },
        {
          path: '/entrydetails', // 词条详情页
          name: 'entrydetails',
          component: EntryDetails
        },
        {
          path: '/entry-html', // 词条页面
          name: 'entry-html',
          component: EntryHTML
        }
      ]
    },
    {
      path: '/updateremark', // 填写备注页面
      name: 'updateremark',
      component: UpdateRemark
    },
    {
      path: '/health-trends', // 趋势分析
      name: 'health-trends',
      component: HealthTrends
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
