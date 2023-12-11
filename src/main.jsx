import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.scss'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from './redux/store.js';
import { Provider } from 'react-redux';



ReactDOM.createRoot(document.getElementById('root')).render(

  <>
    <Provider store={store}>

      <App />

    </Provider>
    <ToastContainer />
  </>
)
