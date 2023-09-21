import { Leva } from 'leva';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AnimationsProvider } from './contexts/animations/index.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AnimationsProvider>
			<App />
		</AnimationsProvider>
		<Leva />
	</React.StrictMode>,
);
