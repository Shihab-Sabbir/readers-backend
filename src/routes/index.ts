import express from 'express';
import userRoutes from '../app/modules/user/user.route';
import productRoutes from '../app/modules/product/product.route';
import orderRoutes from '../app/modules/order/order.route';
import authRoutes from '../app/modules/auth/auth.route';
import adminRoutes from '../app/modules/admin/admin.route';

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
  {
    path: '/orders',
    route: orderRoutes,
  },
  {
    path: '/admins',
    route: adminRoutes,
  },
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
