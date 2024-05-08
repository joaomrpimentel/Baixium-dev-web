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
    path: '/terms',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'terms', component: () => import('pages/TermsAndConditionsPage.vue') }],
  },
  {
    path: '/contact',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'contact', component: () => import('pages/ContactPage.vue') }],
  },
  {
    path: '/register_articles',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'registerArticles', component: () => import('pages/RegisterArticlesPage.vue') }],
    meta: { requiresAuth: true }
  },
  {
    path: '/feed_articles',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'feed-articles', component: () => import('pages/FeedArticles.vue') }],
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'profile', component: () => import('pages/ProfilePage.vue') }],
    meta: { requiresAuth: true }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];


export default routes;
