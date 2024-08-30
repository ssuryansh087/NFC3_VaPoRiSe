import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/AdminDashboard';
import NewEvent from './pages/NewEvent';
import NewFundraiser from './pages/NewFundraiser';
import Events from './pages/Events';
import Event from './pages/Event';
import FAQ from './pages/FAQ';
import Fundraisers from './pages/Fundraisers';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/admindashboard',
    element: <AdminDashboard />
  },
  {
    path: '/newevent',
    element: <NewEvent />
  },
  {
    path: '/newfundraiser',
    element: <NewFundraiser />
  },
  {
    path: '/events',
    element: <Events />
  },
  {
    path: '/event/:eventName',
    element: <Event />
  },
  {
    path: '/faq',
    element: <FAQ />
  },
  {
    path: '/fundraisers',
    element: <Fundraisers />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);