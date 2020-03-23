import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import Example from './views/Example'
import CoursesIndex from './views/courses/Index'
import CoursesEdit from './views/courses/Edit'
import CoursesCreate from './views/courses/Create'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component:Index
    },
    {
      path: '/example',
      name: 'example',
      component: Example
    },
    {
      path:'/courses',
      name:'/coursesIndex',
      component:CoursesIndex
    },
    {
      path:'/courses/edit/:id',
      name:'/coursesEdit',
      component:CoursesEdit
    },
    {
      path:'/courses/create',
      name:'/coursesCreate',
      component:CoursesCreate
    }
  ]
})
