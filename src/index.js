import React,{ Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./i18n";
import { Provider } from 'react-redux'
import store from './store';


ReactDOM.render(
<React.StrictMode>
      <Suspense fallback={(<div>Loading</div>)}>
            <Provider store={store}>
              <App />
            </Provider>
      </Suspense>
</React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
