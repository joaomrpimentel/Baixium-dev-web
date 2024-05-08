import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'home', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'login', component: () => import('pages/LoginAndRegisterPage.vue') }],
  },

  {
    path: '/register',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'register', component: () => import('pages/RegisterPage.vue') }],
  },

  {
    path: '/about_us',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'aboutUs', component: () => import('pages/AboutUsPage.vue') }],
  },
  {
    path: '/register_articles',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'registerArticles', component: () => import('pages/RegisterArticlesPage.vue') }],
  },
  {
    path: '/feed_articles',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'feed-articles', component: () => import('pages/FeedArticles.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];
export default routes;
