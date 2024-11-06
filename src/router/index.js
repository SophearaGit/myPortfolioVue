import { createRouter, createWebHistory } from 'vue-router';
import store from '../stores/index.js';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import MasterPortfolio from '../views/MasterPortfolio.vue';
import ProfileEditView from '../views/ProfileEditView.vue';
import SecurityView from '../views/SecurityView.vue';

// CONTACT ME
import ContactView from '../views/page/ContactView.vue';
import AddContactView from '../views/page/AddContactView.vue';
// Education
import EducationView from '../views/page/EducationView.vue';
import AddEducationView from '../views/page/AddEducationView.vue';


const routes = [
  {
    path: '/',
    name: 'Portfolio',
    component: MasterPortfolio,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/profile-edit',
    name: 'ProfileEditView',
    component: ProfileEditView,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/profile-edit/security',
    name: 'Security',
    component: SecurityView,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/contact-me',
    name: 'ContactMe',
    component: ContactView,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/contact-me/add',
    name: 'ContactMeAdd',
    component: AddContactView,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/educations',
    name: 'EducationView',
    component: EducationView,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/educations/add',
    name: 'EducationViewAdd',
    component: AddEducationView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated;
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' });
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router;
