import { CameraControls, Environment } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';
import ObjectPerson, { Objects } from '../../ObjectPerson';
import { Portal } from '../../Portal';

export function ExperienceCharacters() {
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
			<CameraControls ref={cameraControlsRef} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} maxDistance={10} />

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
					<ObjectPerson
						name="ninja"
						path="models/ninja/Ninja.gltf"
						presets="city"
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
					<ObjectPerson
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
					name={'woman'}
					active={active}
					setActive={setActive}
					texture={'textures/interior.jpg'}
					scene={scene}
					position={[2.5, 0, 0]}
					rotation={[0, -22.5, 0]}
				>
					<ObjectPerson
						name="woman"
						path="models/woman/woman.gltf"
						presets="city"
						scale={0.9}
						position={[0, -1, 0]}
						rotation={[0, -22, 0]}
						onDoubleClick={() => setDoubleClicked('woman')}
						doubleClicked={doubleClicked}
					/>
				</Portal>
			</group>
		</>
	);
}
