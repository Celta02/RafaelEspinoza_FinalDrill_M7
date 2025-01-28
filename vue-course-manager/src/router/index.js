import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AdminView from '@/views/AdminView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/admin', name: 'Admin', component: AdminView },
  { path: '*', name: 'Notfound', component: NotFoundView },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
