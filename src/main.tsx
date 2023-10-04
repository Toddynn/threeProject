import { Leva } from 'leva';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { AnimationsProvider } from './contexts/animations/index.js';
import { AmbientAudioProvider } from './contexts/audios/index.js';
import { ConfiguratorProvider } from './contexts/configurator/index.js';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ConfiguratorProvider>
			<AnimationsProvider>
				<AmbientAudioProvider>
					<App />
				</AmbientAudioProvider>
			</AnimationsProvider>
		</ConfiguratorProvider>
		<Leva />
	</React.StrictMode>,
);
