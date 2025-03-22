import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../ProtectedRoute';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/burgerSlice';
import { getFeeds } from '../../services/slices/feedSlice';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getFeeds());
  }, [dispatch]);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={backgroundLocation || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/login' element={<ProtectedRoute />}>
            <Route path='/login' element={<Login />} />
          </Route>
          <Route path='/register' element={<ProtectedRoute />}>
            <Route path='/register' element={<Register />} />
          </Route>
          <Route path='/forgot-password' element={<ProtectedRoute />}>
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Route>
          <Route path='/reset-password' element={<ProtectedRoute />}>
            <Route path='/reset-password' element={<ResetPassword />} />
          </Route>
          <Route path='/profile' element={<ProtectedRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/orders' element={<ProfileOrders />} />
          </Route>
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route path='/feed/:number' element={<OrderInfo />} />
        </Routes>
        {backgroundLocation && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal
                  title='Детали заказа'
                  onClose={() => {
                    navigate(-1);
                  }}
                >
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal
                  title='Детали ингредиента'
                  onClose={() => {
                    navigate(-1);
                  }}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route path='/profile/orders/:number' element={<ProtectedRoute />}>
              <Route
                path='/profile/orders/:number'
                element={
                  <Modal
                    title='#number'
                    onClose={() => {
                      navigate(-1);
                    }}
                  >
                    <OrderInfo />
                  </Modal>
                }
              />
            </Route>
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
