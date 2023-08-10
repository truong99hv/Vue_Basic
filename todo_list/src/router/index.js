// Composables
import { createRouter, createWebHistory } from "vue-router";
import Todos from "../views/Todos.vue";
import Test from "../views/Test.vue";
const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",

        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "todos",
        name: "todos",
        component: Todos,
      },
      {
        path: "test",
        name: "test",
        component: Test,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
