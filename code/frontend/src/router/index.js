import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: "/",
    name: "bookings", 
    component: () =>
      import("../views/bookings.vue")
  },
  {
    path: "/login",
    name: "login", 
    component: () =>
      import("../views/login.vue")
  },
  {
    path: "/history",
    name: "history", 
    component: () =>
      import("../views/history.vue")
  },
  {
    path: "/lockers",
    name: "lockers", 
    component: () =>
      import("../views/lockers.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
