import React, { useState, useEffect } from 'react';
import { Web3Button } from '@web3modal/react';
import { useSignMessage } from 'wagmi';
import { signMessage } from '@wagmi/core';

export default function App() {
    const [debugStack, setDebugStack] = useState<Array<any>>([]);

    const log = (...args) => {
        setDebugStack((prev) => {
            return [
                args.map((arg) => typeof arg === 'object' ? JSON.stringify(arg) : arg),
                ...prev,
            ];
        });

        console.log(...args);
    };

    const wagmiSign = useSignMessage({
        onSuccess(...args) {
            log('sign SYNC success:', ...args);
        },
        onError(...args) {
            log('sign SYNC error:', ...args);
        },
        onMutate(...args) {
            log('sign mutate:', ...args);
        },
        onSettled(...args) {
            log('sign settled:', ...args);
        },
    });

    useEffect(() => {
        console.log('wagmiSign update:', wagmiSign);
    }, [wagmiSign]);

    const signMessageAsync = () => {
        wagmiSign.signMessageAsync({
            message: 'Custom async message',
        }).then((...args) => {
            log('sign ASYNC success:', ...args);
        }).catch((...args) => {
            log('sign ASYNC error:', ...args);
        });
    };

    const signMessageSync = () => {
        wagmiSign.signMessage({
            message: 'Custom sync message',
        });
    };

    const signMessageCore = () => {
        signMessage({
            message: 'Custom @wagmi/core message',
        }).then((...args) => {
            log('sign @wagmi/core success:', ...args);
        }).catch((...args) => {
            log('sign @wagmi/core error:', ...args);
        });
    };

    return <>
        Web3Modal setup source code: <a href="https://github.com/krehak/react-wagmi-walletconnect/tree/master/src/context/Wallet.tsx" target="_blank">https://github.com/.../src/context/Wallet.tsx</a>
        <br />
        This page source code: <a href="https://github.com/krehak/react-wagmi-walletconnect/tree/master/src/App.tsx" target="_blank">https://github.com/.../src/App.tsx</a>

        <h2>1. Connect</h2>
        <Web3Button />

        <h2>2. Try sign</h2>
        <div className="buttons">
            <button onClick={signMessageAsync}>Sign asynchronous</button>
            <button onClick={signMessageSync}>Sign synchronous</button>
            <button onClick={signMessageCore}>Sign through @wagmi/core</button>
        </div>

        <h2>3. Console logs:</h2>
        <div className="logs">
            {debugStack.map((item, index) => <div className="log" key={index}>{item}</div>)}
        </div>

        <div className="outro">
            Followed the instructions provided by the <a href="https://docs.walletconnect.com/2.0/web3modal/react/installation" target="_blank">WalletConnect Docs</a>
        </div>
    </>;
}
