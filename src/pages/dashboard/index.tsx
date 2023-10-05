import { Link } from 'react-router-dom';
import { Button } from '../../components/ShadCN/ui/button';

export default function Dashboard() {
	return (
		<div className="flex h-screen items-center justify-center gap-3">
			<Link to="/portas">
				<Button>portas</Button>
			</Link>
			<Link to="/portais">
				<Button>portais</Button>
			</Link>
		</div>
	);
}
