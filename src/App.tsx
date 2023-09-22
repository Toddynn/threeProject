import { Loader, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import { ControlTable } from './components/Controls/ControlTable';
import { ExperienceTable } from './components/Experiences/ExperienceTable';
import { Button } from './components/ShadCN/ui/button';

export default function App() {
	const [active, setActive] = useState<boolean>(false);

	return (
		<div className="relative flex h-screen items-center justify-center ">
			<div className="outline-muted-foreground relative flex w-[70%] flex-col items-center overflow-hidden rounded-2xl outline lg:h-[650px] lg:flex-row">
				<ControlTable hidden={!active} path="models/table/Table.gltf" />
				<div className="flex h-full w-full flex-1 cursor-pointer">
					<Canvas shadows camera={{ position: [0, 0, 0], fov: 35 }}>
						<ExperienceTable name="table" active={active} setActive={setActive} portalArgs={[10, 10, 10]} />
						<OrbitControls enablePan={false} makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} maxDistance={5} />
					</Canvas>
				</div>
				<div className="flex h-full w-full flex-1 bg-slate-900">
					adicionar ao carrinho e bla bla bla bla aq
					<Button>COMPRAR </Button>
				</div>
			</div>
			{/* <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
				<ExperienceCharacters />
			</Canvas>
			<ControlAnimations /> */}
			<Loader />
		</div>
	);
}
