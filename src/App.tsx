import { Loader, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import { ControlTable } from './components/Controls/ControlTable';
import { ExperienceTable } from './components/Experiences/ExperienceTable';

export default function App() {
	const [active, setActive] = useState<boolean>(false);

	return (
		<div className="relative flex h-screen items-center justify-center">
			<ControlTable hidden={!active} path="models/table/Table.gltf" />
			<Canvas shadows camera={{ position: [4, 4, -12], fov: 35 }}>
				<ExperienceTable active={active} setActive={setActive} />
				<OrbitControls enablePan={false} makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} maxDistance={12} />
			</Canvas>
			{/* <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
				<ExperienceCharacters />
			</Canvas>
			<ControlAnimations /> */}
			<Loader />
		</div>
	);
}
