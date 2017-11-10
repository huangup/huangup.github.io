import Vue from 'vue'
import Router from 'vue-router'
import ArticleList from '../components/articleList/articleList.vue'
import ArticleDetail from '../components/articleDetail/articleDetail.vue'
import Info from '../components/info/info.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'article',
      component: ArticleList
    },
    {
      path: '/info',
      name: 'info',
      component: Info
    },
    {
      path: '/articleDetail/:articleId',
      name: 'articleDetail',
      component: ArticleDetail
    }
  ]
})
