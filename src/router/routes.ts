import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    redirect: "main",
    children: [
      { path: "main", component: () => import("pages/IndexPage.vue") },
      { path: "bigdisplay", component: () => import("pages/BigDisplay.vue") }, {
        path: "mobileindex",
        component: () => import("pages/MobileIndex.vue"),
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  {
    path: "/login",
    component: () => import("pages/LoginPage.vue"),
  },
  {
    path: "/bigdisplay",
    component: () => import("pages/BigDisplay.vue"),
  },

];

export default routes;
