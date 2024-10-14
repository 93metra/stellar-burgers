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
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AppHeader } from '@components';

import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { fetchUser } from '../../services/slices/userSlice';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Сохраняем текущее местоположение, если оно не является модальным
  const backgroundLocation = location.state?.background;

  const closeModal = (path: string) => {
    navigate(path, { replace: true });
  };

  // Заглушка для защищённых роутов
  const isAuthenticated = useSelector((state) => state.user.user);

  // Получение данных ингредиентов/пользователя
  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        {/* Обычные маршруты */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:id' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        {/* Защищённые маршруты */}
        <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to='/profile' />} />
        <Route path='/register' element={!isAuthenticated ? <Register /> : <Navigate to='/profile' />} />
        <Route path='/forgot-password' element={!isAuthenticated ? <ForgotPassword /> : <Navigate to='/profile' />} />
        <Route path='/reset-password' element={!isAuthenticated ? <ResetPassword /> : <Navigate to='/profile' />} />
        <Route path='/profile' element={!isAuthenticated ? <Navigate to='/login' /> : <Profile />} />
        <Route path='/profile/orders' element={!isAuthenticated ? <Navigate to='/login' /> : <ProfileOrders />} />
        <Route path='/profile/orders/:id' element={!isAuthenticated ? <Navigate to='/login' /> : <OrderInfo />} />

        {/* Страница 404 */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные окна */}
      {backgroundLocation && (
        <Routes>
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
              <Modal title='Информация о ингредиенте' onClose={() => closeModal('/')}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:id'
            element={
              <Modal title='Детали заказа' onClose={() => closeModal('/profile/orders')}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;