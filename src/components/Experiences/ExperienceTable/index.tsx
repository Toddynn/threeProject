import { CameraControls } from '@react-three/drei';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three/src/math/Vector3.js';
import Table from '../../Objects/Table';
import { Portal } from '../../Portal';

interface ExperienceTableProps {
	active: boolean;
	portalArgs: [number, number, number];
	name: string;
	preset: PresetsType;
	setActive: any;
}

export function ExperienceTable({ active, portalArgs, name, preset }: ExperienceTableProps) {
	const scene = useThree((state) => state.scene);
	const cameraControlsRef = useRef<CameraControls>(null);

	const targetPosition = new Vector3();

	useEffect(() => {
		if (active) {
			scene.getObjectByName(name)?.getWorldPosition(targetPosition);
			cameraControlsRef.current?.setLookAt(1, 2, 3, targetPosition.x, targetPosition.y, targetPosition.z, true);
		} else {
			cameraControlsRef.current?.setLookAt(1, 2, 7, 0, 0, 0, true);
		}
	}, [active]);

	return (
		<>
			<Portal
				portalArgs={portalArgs}
				name={name}
				active={active}
				texture={'textures/interior2.jpg'}
				rotation={[0, 0, 0]}
				position={[0, 0, -0.5]}
				preset={preset}
			>
				<Table path="models/table/Table.gltf" scale={0.5} preset={preset} />
			</Portal>
			<CameraControls enabled={active} ref={cameraControlsRef} makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} maxDistance={5} />
		</>
	);
}
