import express from 'express';
import userRoutes from '../app/modules/user/user.route';
import productRoutes from '../app/modules/product/product.route';
import authRoutes from '../app/modules/auth/auth.route';

const router = express.Router();

// shared routes
const defaultRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/products',
    route: productRoutes,
  },
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
