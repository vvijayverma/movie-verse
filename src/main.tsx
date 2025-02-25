// import "dotenv/config";
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

import App from './app/app';
import { store, persistor } from './app/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
