import React from 'react';
import ReactDOM from 'react-dom/client';

import { WalletProvider } from './context/Wallet';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <WalletProvider>
            <App />
        </WalletProvider>
    </React.StrictMode>
);
