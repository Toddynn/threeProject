import { CameraControls } from '@react-three/drei';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three/src/math/Vector3.js';
import Door from '../../Objects/Door';
import { Portal } from '../../Portal';

interface ExperienceDoorProps {
	active: boolean;
	portalArgs: [number, number, number];
	name: string;
	preset: PresetsType;
}

export function ExperienceDoor({ active, portalArgs, name, preset }: ExperienceDoorProps) {
	const scene = useThree((state) => state.scene);
	const cameraControlsRef = useRef<CameraControls>(null);

	const targetPosition = new Vector3();

	useEffect(() => {
		if (active) {
			scene.getObjectByName(name)?.getWorldPosition(targetPosition);
			cameraControlsRef.current?.setLookAt(6, 2, 6, targetPosition.x, targetPosition.y, targetPosition.z, true);
		} else {
			cameraControlsRef.current?.setLookAt(6, 2, 6, 0, 0, 0, true);
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
				position={[0, 0, 0]}
				preset={preset}
			>
				<Door scale={1} preset={preset} position={[0, -1, 0]} />
			</Portal>
			<CameraControls enabled={active} ref={cameraControlsRef} makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} maxDistance={16} />
		</>
	);
}
