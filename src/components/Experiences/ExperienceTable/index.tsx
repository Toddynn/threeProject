import { CameraControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Vector3 } from 'three/src/math/Vector3.js';
import Table from '../../Objects/Table';
import { Portal } from '../../Portal';

interface ExperienceTableProps {
	active: boolean;
	setActive: Dispatch<SetStateAction<boolean>>;
}

export function ExperienceTable({ active, setActive }: ExperienceTableProps) {
	const scene = useThree((state) => state.scene);
	const cameraControlsRef = useRef<CameraControls>(null);

	const targetPosition = new Vector3();

	useEffect(() => {
		if (active) {
			scene.getObjectByName('table')?.getWorldPosition(targetPosition);
			cameraControlsRef.current?.setLookAt(0, 0, 5, targetPosition.x, targetPosition.y, targetPosition.z, true);
		} else {
			cameraControlsRef.current?.setLookAt(0, 0, 10, 0, 0, 0, true);
		}
	}, [active]);

	return (
		<>
			<Portal name={'table'} active={active} setActive={setActive} texture={'textures/interior.jpg'} rotation={[0, 0, 0]} position={[0, 0, -0.5]}>
				<Table path="models/table/Table.gltf" scale={0.7} preset="forest" />
			</Portal>
			<CameraControls ref={cameraControlsRef} makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} maxDistance={7} />
		</>
	);
}