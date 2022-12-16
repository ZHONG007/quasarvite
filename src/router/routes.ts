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
  { path: '/page/:id', component: () => import("pages/video/VideosPage.vue"), },
  { path: '/video/create', component: () => import("pages/video/CreateVideo.vue"), },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  {
    path: "/login",
    component: () => import("pages/login/LoginView.vue"),
  },
  {
    path: "/register",
    component: () => import("pages/login/RegisterView.vue"),
  },
  {
    path: "/bigdisplay",
    component: () => import("pages/BigDisplay.vue"),
  },
  {
    path: "/generator",
    component: () => import("pages/GoGenerator.vue"),
  },

];

export default routes;
