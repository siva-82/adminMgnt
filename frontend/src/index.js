
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'

import store from './store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'

import App from './App';
import ProfilePage from './ProfilePage';
import Home from './Home';

const router =createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={<App />}>
          <Route index={true} path='/' element={<Home/>}></Route>
          <Route path='/Profile' element={<ProfilePage />}></Route>
        </Route> 
      )
    )
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
     <Provider store={store}>
     <React.StrictMode>
    
        <RouterProvider router={router} />
       
      </React.StrictMode>
      </Provider>
    );
