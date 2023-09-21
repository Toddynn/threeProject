import { Loader } from '@react-three/drei';
/* import { Canvas } from '@react-three/fiber';
import { ExperienceCharacters } from './components/Experiences/ExperienceCharacters'; */

export default function App() {
	return (
		<div className="flex h-screen items-center justify-center">
			{/* <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
				<ExperienceCharacters />
			</Canvas> */}

			<Loader />
		</div>
	);
}
