import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import setupAxiosClient from './api/setupAxiosClient';
import App from './App';
import { store } from './app/store';
import './index.scss';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

// turn off log err
setLogger({
    error: () => {}
})

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <PersistGate loading={null} persistor={persistor}>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <App />
                    <ReactQueryDevtools position={'bottom-right'} initialIsOpen={false} />
                </QueryClientProvider>
            </Provider>
        </PersistGate>
    </React.StrictMode>
);

setupAxiosClient(store);
