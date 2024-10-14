// src/components/app/app.tsx
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { Modal, OrderInfo, IngredientDetails } from '@components';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppHeader } from '@components';
// import { AppHeader } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { fetchFeeds } from '../../services/slices/feedsSlice';
import { fetchUser } from '../../services/slices/userSlice';

const App = () => {
  const navigate = useNavigate();
  const closeModal = (path: string) => {
    navigate(`${path}`, { replace: true });
  };

  // Заглушка для защищённых роутов (в дальнейшем можно заменить на реальную проверку авторизации)
  const isAuthenticated = useSelector((state) => state.user.user); // или true, в зависимости от состояния авторизации
  const dispatch = useDispatch();

  // Get the ingredients/feeds data from the Redux store
  useEffect(() => {
    dispatch(fetchIngredients());
    // dispatch(fetchFeeds());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        {/* Роуты, не требующие авторизации */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:id'
          element={
            <Modal title='Детали заказа' onClose={() => closeModal('/feed')}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='Информация о ингредиенте'
              onClose={() => closeModal('/')}
            >
              <IngredientDetails />
            </Modal>
          }
        />

        {/* Защищённые роуты */}
        <Route
          path='/login'
          element={!isAuthenticated ? <Login /> : <Navigate to='/profile' />}
        />
        <Route
          path='/register'
          element={!isAuthenticated ? <Register /> : <Navigate to='/profile' />}
        />
        <Route
          path='/forgot-password'
          element={
            !isAuthenticated ? <ForgotPassword /> : <Navigate to='/profile' />
          }
        />
        <Route
          path='/reset-password'
          element={
            !isAuthenticated ? <ResetPassword /> : <Navigate to='/profile' />
          }
        />
        <Route
          path='/profile'
          element={!isAuthenticated ? <Navigate to='/login' /> : <Profile />}
        />
        <Route
          path='/profile/orders'
          element={
            !isAuthenticated ? <Navigate to='/login' /> : <ProfileOrders />
          }
        />
        <Route
          path='/profile/orders/:id'
          element={
            !isAuthenticated ? (
              <Navigate to='/login' />
            ) : (
              <Modal title='Детали заказа' onClose={() => closeModal('/profile/orders')}>
                <OrderInfo />
              </Modal>
            )
          }
        />

        {/* Страница 404 */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
