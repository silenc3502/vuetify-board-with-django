import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../home/pages/HomeView.vue'
import BoardRoutes from "@/board/router/BoardRoutes";
import ProductRoutes from "@/product/router/ProductRoutes";
import AccountRoutes from "@/account/router/AccountRoutes";
import AuthRoutes from "@/authentication/router/AuthRoutes";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  ...BoardRoutes,
  ...ProductRoutes,
  ...AccountRoutes,
  ...AuthRoutes,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
