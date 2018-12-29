import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue';
import NewTodo from './components/NewTodo.vue'
import PageNotFound from './components/PageNotFound.vue'

Vue.use(Router)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/new',
        name: 'New',
        component: NewTodo
    },
    {
        path: "*",
        name: "err",
        component: PageNotFound
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