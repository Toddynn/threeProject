import { Canvas } from '@react-three/fiber';
import ExperiencePortals from '../../components/Experiences/ExperiencePortals';
import { Overlay } from '../../components/Overlay';

export default function Portais() {
	return (
		<>
			<Overlay />
			<Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }} gl={{ preserveDrawingBuffer: true }} className="fixed inset-0">
				<color attach="background" args={['#ececec']} />
				<ExperiencePortals />
			</Canvas>
		</>
	);
}
