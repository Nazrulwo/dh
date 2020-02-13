import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './components/List/i18n'

ReactDOM.render(
    <Suspense fallback={(<div>Loading...</div>)}>
        <I18nextProvider i18n={i18next}>
            <App />
        </I18nextProvider>
    </Suspense>,
 document.getElementById('root'));
registerServiceWorker();
