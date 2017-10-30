import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/article/article.vue'
import ArticleDetail from '../components/articleDetail/articleDetail.vue'
import Info from '../components/info/info.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'article',
            component: Article
        },
        {
            path: '/info',
            name: 'info',
            component: Info
        },
        {
            path: '/articleDetail/:id',
            name: 'articleDetail',
            component: ArticleDetail
        }
    ]
})
