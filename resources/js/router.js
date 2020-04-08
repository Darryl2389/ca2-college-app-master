import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import Example from './views/Example'

// course routes
import CoursesIndex from './views/courses/Index'
import CoursesEdit from './views/courses/Edit'
import CoursesCreate from './views/courses/Create'
import CoursesShow from './views/courses/Show'

// lecturer routes
import LecturersIndex from './views/lecturers/Index'
import LecturersCreate from './views/lecturers/Create'
import LecturersEdit from './views/lecturers/Edit'
import LecturersShow from './views/lecturers/Show'

// enrolment routes
import EnrolmentsIndex from './views/enrolments/Index'
import EnrolmentsCreate from './views/enrolments/Create'
import EnrolmentsEdit from './views/enrolments/Edit'
import EnrolmentsShow from './views/enrolments/Show'



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
    },
    {
      path:'/courses/show/:id',
      name:'/coursesShow',
      component:CoursesShow
    },
    {
      path:'/lecturers',
      name:'/lecturersIndex',
      component:LecturersIndex
    },
    {
      path:'/lecturers/edit/:id',
      name:'/lecturersEdit',
      component:LecturersEdit
    },
    {
      path:'/lecturers/create',
      name:'/lecturersCreate',
      component:LecturersCreate
    },
    {
      path:'/lecturers/show/:id',
      name:'/lecturersShow',
      component:LecturersShow
    },
    {
      path:'/enrolments',
      name:'/enrolmentsIndex',
      component:EnrolmentsIndex
    },
    {
      path:'/enrolments/create',
      name:'/enrolmentsCreate',
      component:EnrolmentsCreate
    },
    {
      path:'/enrolments/edit/:id',
      name:'/enrolmentsEdit',
      component:EnrolmentsEdit
    },
    {
      path:'/enrolments/show/:id',
      name:'/enrolmentShow',
      component:EnrolmentsShow
    }
  ]
})
