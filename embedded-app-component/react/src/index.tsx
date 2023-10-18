import * as React from 'react';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import App from './App';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <header className="jumbotron text-center">
            <div className="container">
                <h1 className="jumbotron-heading">Unblu Embedded Component React Demo</h1>
                <p className="lead text-muted">
                    Simple demo showing how to integrate the Unblu Embedded App Component into a TypeScript react app
                </p>
            </div>
        </header>
        <App/>
    </StrictMode>
);
