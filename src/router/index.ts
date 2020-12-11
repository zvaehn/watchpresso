import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Stopwatch from '../views/Stopwatch.vue';
import Archive from '../views/Archive.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Stopwatch',
    alias: '/stopwatch',
    component: Stopwatch,
  },
  {
    path: '/archive',
    name: 'Archive',
    component: Archive,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
