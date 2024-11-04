import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.jsx'
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import {Auth0Provider} from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom';



// const onRedirectCallback = (appState) => {
//   const navigate = useNavigate();
//   navigate(appState?.returnTo || '/dashboard');
// };



ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
<Provider store={store}>
<React.StrictMode>
<Auth0Provider
    domain="dev-mcghumbb0c71y3oo.us.auth0.com"
    clientId="VmhwabgwsgN8r2sjpRdkCiCcJFlUQ0js"
    authorizationParams={{
      redirect_uri: `${window.location.origin}/login`      
    }}
    // onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>
  </React.StrictMode>
  </Provider>
  </BrowserRouter>
);



