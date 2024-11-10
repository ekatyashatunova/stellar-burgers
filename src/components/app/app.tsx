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
import '../../index.css';
import styles from './app.module.css';

import { useLocation, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import { AppHeader, Modal } from '@components';
import { OrderInfo, IngredientDetails } from '@components';

/*import { ProtectedRoute } from '../protected-route/ProtectedRoute';*/

const App = () => {
  const navigate = useNavigate();
  const handleCloseModal = () => {
    navigate(-1);
  };

  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            /*<ProtectedRoute>*/
            <Login />
            /*</ProtectedRoute>*/
          }
        />
        <Route
          path='/register'
          element={
            /*<ProtectedRoute>*/
            <Register />
            /*</ProtectedRoute>*/
          }
        />
        <Route
          path='/forgot-password'
          element={
            /*<ProtectedRoute>*/
            <ForgotPassword />
            /*</ProtectedRoute>*/
          }
        />
        <Route
          path='/reset-password'
          element={
            /*<ProtectedRoute>*/
            <ResetPassword />
            /*</ProtectedRoute>*/
          }
        />
        <Route
          path='/profile'
          element={
            /*<ProtectedRoute>*/
            <Profile />
            /*</ProtectedRoute>*/
          }
        />
        <Route
          path='/profile/orders'
          element={
            /*<ProtectedRoute>*/
            <ProfileOrders />
            /* </ProtectedRoute>*/
          }
        />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Детали заказа' onClose={handleCloseModal}>
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
