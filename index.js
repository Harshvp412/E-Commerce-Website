import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import 'assets/scss/material-kit-react.scss?v=1.9.0';
import 'antd/dist/antd.css';

// pages for this product
import Components from 'views/Components/Components';
import CoursePage from 'views/CoursePage/CoursePage';
import Blogs from 'views/Blogs/BlogsPage';
import Blog1 from 'views/Blogs/BlogsPage1';
import CartPage from 'views/CartPage/CartPage';
import PrivacyPolicy from 'views/OtherPage/PrivacyPolicy';
import RefundPolicy from 'views/OtherPage/RefundPolicy';
import TermsAndConditions from 'views/OtherPage/TermsAndConditions';
import ProfilePage from 'views/ProfilePage/ProfilePage';
import LoginPage from 'views/LoginPage/LoginPage';
import RegisterPage from 'views/RegisterPage/RegisterPage';
import { store, persistor } from './state/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import StudentDashboard from 'views/StudentDashboard/StudentDashbord';
import AdminDashboard from 'views/AdminDashboard/AdminDashboard';
import { AdminPrivateRoute } from 'common/AdminSpecialRoutes';
import LoginAdmin from 'views/AdminDashboard/Login/LoginAdmin';
import storeAdmin from './redux/storeAdmin';

var hist = createBrowserHistory();

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};
const customTheme = extendTheme({ config });

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={hist}>
        <Switch>
          <Route path="/courses" component={CoursePage} />
          <Route
            path="/cart"
            component={() => (
              <ChakraProvider theme={customTheme}>
                <CartPage />
              </ChakraProvider>
            )}
          />

          <Route path="/terms-and-conditions" component={TermsAndConditions} />
          <Route path="/blogs" component={Blogs} />
          <Route path="/blog1" component={Blog1} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/refund-policy" component={RefundPolicy} />
          <Route path="/profile-page" component={ProfilePage} />
          <Route path="/login-page" component={LoginPage} />
          <Route path="/register-page" component={RegisterPage} />
          <Route path="/student-dashboard" component={StudentDashboard} />
          <Route path="/admin-login" component={LoginAdmin} />

          <Route path="/" component={Components} />
          <Provider store={storeAdmin}>
            <AdminPrivateRoute
              path="/admin-dashboard"
              redirectTo="/admin-login"
              component={AdminDashboard}
            />
          </Provider>
        </Switch>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
