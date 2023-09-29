import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Portais from '../pages/portais';
import Portas from '../pages/portas';

export default function Rotas() {
	return (
		<Router key={location.pathname}>
			<Routes>
				<Route path="/portas" element={<Portas />} />
				<Route path="/portais" element={<Portais />} />
			</Routes>
		</Router>
	);
}
