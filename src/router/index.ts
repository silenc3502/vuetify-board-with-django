import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../home/pages/HomeView.vue'
import BoardRoutes from "@/board/router/BoardRoutes";
import ProductRoutes from "@/product/router/ProductRoutes";
import AccountRoutes from "@/account/router/AccountRoutes";
import AuthRoutes from "@/authentication/router/AuthRoutes";
import PostRoutes from "@/post/router/PostRoutes";
import LogisticRegressionRoutes from "@/logicsticRegression/router/LogisticRegressionRoutes";
import PolynomialRegressionRoutes from "@/polynomialRegression/router/PolynomialRegressionRoutes";
import ExponentialRegressionRoutes from "@/exponentialRegression/router/ExponentialRegressionRoutes";
import RandomForestRoutes from "@/random_forest/router/RandomForestRoutes";
import PCATestRoutes from "@/pca/router/PCATestRoutes";

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
  ...PostRoutes,
  ...LogisticRegressionRoutes,
  ...PolynomialRegressionRoutes,
  ...ExponentialRegressionRoutes,
  ...RandomForestRoutes,
  ...PCATestRoutes,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
