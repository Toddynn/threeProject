import { CameraControls, Environment, MeshPortalMaterial, PortalMaterialType, RoundedBox, useTexture } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { BackSide, DoubleSide, Scene, Vector3 } from 'three';
import Object from './Object';

export default function App() {
	return (
		<div className="flex h-screen items-center justify-center">
			<Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
				<Experience />
			</Canvas>
		</div>
	);
}

export type Objects = 'alien' | 'demon' | 'ninja' | undefined;

export function Experience() {
	const [active, setActive] = useState<string | undefined>(undefined);

	const scene = useThree((state) => state.scene);
	const cameraControlsRef = useRef<CameraControls>(null);

	const targetPosition = new Vector3();
	useEffect(() => {
		if (active) {
			scene.getObjectByName(active)?.getWorldPosition(targetPosition);
			cameraControlsRef.current?.setLookAt(0, 0, 5, targetPosition.x, targetPosition.y, targetPosition.z, true);
		} else {
			cameraControlsRef.current?.setLookAt(0, 0, 10, 0, 0, 0, true);
		}
	}, [active]);

	const [doubleClicked, setDoubleClicked] = useState<Objects>(undefined);

	return (
		<>
			<ambientLight intensity={1} />
			<Environment preset="sunset" />
			<CameraControls ref={cameraControlsRef} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} />

			<group>
				<Portal
					name={'ninja'}
					active={active}
					setActive={setActive}
					texture={'textures/interior.jpg'}
					scene={scene}
					rotation={[0, 22.5, 0]}
					position={[-2.5, 0, 0]}
				>
					<Object
						name="ninja"
						path="models/ninja/Ninja.gltf"
						presets="sunset"
						scale={0.5}
						position={[0, -1, 0]}
						rotation={[0, 22, 0]}
						onDoubleClick={() => setDoubleClicked('ninja')}
						doubleClicked={doubleClicked}
					/>
				</Portal>
				<Portal
					name={'demon'}
					active={active}
					setActive={setActive}
					texture={'textures/interior.jpg'}
					scene={scene}
					rotation={[0, 0, 0]}
					position={[0, 0, -0.5]}
				>
					<Object
						name="demon"
						path="models/demon/Demon.gltf"
						presets="city"
						scale={0.5}
						position={[0, -1, 0]}
						onDoubleClick={() => setDoubleClicked('demon')}
						doubleClicked={doubleClicked}
					/>
				</Portal>
				<Portal
					name={'alien'}
					active={active}
					setActive={setActive}
					texture={'textures/interior.jpg'}
					scene={scene}
					position={[2.5, 0, 0]}
					rotation={[0, -22.5, 0]}
				>
					<Object
						name="alien"
						path="models/alien/Alien.gltf"
						presets="night"
						scale={0.5}
						position={[0, -1, 0]}
						rotation={[0, -22, 0]}
						onDoubleClick={() => setDoubleClicked('alien')}
						doubleClicked={doubleClicked}
					/>
				</Portal>
			</group>
		</>
	);
}

interface PortalProps {
	texture: string;
	active: string | undefined;
	setActive: React.Dispatch<React.SetStateAction<string | undefined>>;
	name: string;
	scene: Scene;
	children: ReactNode;
	position?: [number, number, number];
	rotation?: [number, number, number];
}
export function Portal({ texture, children, active, setActive, name, position, rotation }: PortalProps) {
	const map = useTexture(texture);
	const portalRef = useRef<PortalMaterialType>(null);

	useFrame((_state, delta) => {
		if (!portalRef.current) return;
		const open = active === name;

		easing.damp(portalRef.current, 'blend', open ? 1 : 0, 0.5, delta);
	});

	return (
		<group>
			<RoundedBox
				name={name}
				position={position}
				rotation={rotation}
				args={[2, 3, 0.1]}
				onDoubleClick={() => setActive(active === name ? undefined : name)}
			>
				<MeshPortalMaterial ref={portalRef} side={DoubleSide}>
					<ambientLight intensity={1} />
					<Environment preset="sunset" />
					{children}
					<mesh>
						<sphereGeometry args={[5, 64, 64]} />
						<meshStandardMaterial map={map} side={BackSide} />
					</mesh>
				</MeshPortalMaterial>
			</RoundedBox>
		</group>
	);
}
