import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Portais from '../pages/portais';
import Portas from '../pages/portas';

export default function Rotas() {
	return (
		<Router key={location.pathname}>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/portas" element={<Portas />} />
				<Route path="/portais" element={<Portais />} />
			</Routes>
		</Router>
	);
}
