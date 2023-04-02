import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../pages/HomePage.vue"),
  },

  {
    path: "/signup",
    component: () => import("../pages/SignUpPage.vue"),
  },
  {
    path: "/login",
    component: () => import("../pages/LoginPage.vue"),
  },
  {
    path: "/user/:id",
    component: () => import("../pages/UserPage.vue"),
  },
  {
    path: "/activate/:token",
    component: () => import("../pages/AccountActivationPage.vue"),
  },
];

const router = createRouter({ routes, history: createWebHistory() });

export default router;
