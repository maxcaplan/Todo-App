import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue';
import Test from './components/Test.vue'

Vue.use(Router)

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/test',
        name: 'test',
        component: Test
    }
]

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes,
    scrollBehavior() {
        return {
            x: 0,
            y: 0
        }
    }
})