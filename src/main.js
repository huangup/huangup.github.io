import 'babel-polyfill';
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './app/app.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import '../styles/style.css'

Vue.use(ElementUI)

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})