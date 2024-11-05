import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
  ]
})

router.beforeEach((to) => {
  const store = useAuthStore()

  if (localStorage.getItem("username") && store.user.username == "") {
    store.user.id = localStorage.getItem("id")
    store.user.username = localStorage.getItem("username")
    store.user.role = localStorage.getItem("role")
    store.user.isAuthenticated = localStorage.getItem("isAuthenticated") == "true" ? true : false
    store.user.token = localStorage.getItem("token")
  }

  if (to.meta.requiresAuthAdmin && !(store.user.role == "ROLE_ADMIN")) {
    return {
      path: "/home",
    }
  }

  if (to.meta.requiresAuth && !store.user.isAuthenticated) {
    return {
      path: "/home",
    }
  }
})

export default router
