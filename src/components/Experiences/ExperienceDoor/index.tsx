import { CameraControls, OrbitControls, useHelper } from '@react-three/drei';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useRef } from 'react';
import { SpotLight, SpotLightHelper } from 'three';
import { Vector3 } from 'three/src/math/Vector3.js';
import Door from '../../Objects/Door';

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

	const spotLightRef = useRef<SpotLight>(null!);
	const secondSpotLightRef = useRef<SpotLight>(null!);

	useHelper(spotLightRef, SpotLightHelper, 'red');
	useHelper(secondSpotLightRef, SpotLightHelper, 'red');

	const { distance, intensity, angle, x, y, z } = useControls({
		intensity: { value: 37, min: 0, max: 100 },
		distance: { value: 5, min: 0, max: 100 },
		angle: { value: 0.5, min: 0.1, max: 1 },
		x: { value: -1.9, min: -5, max: 5 },
		y: { value: 1.6, min: -5, max: 5 },
		z: { value: -1.7, min: -5, max: 5 },
	});

	return (
		<>
			<spotLight ref={spotLightRef} position={[x, y, z]} distance={distance} intensity={intensity} angle={angle} />
			<spotLight ref={secondSpotLightRef} position={[-x, y, -z]} distance={distance} intensity={intensity} angle={angle} />

			<Door scale={1} preset={preset} position={[0, 0, 0]} rotation={[0, 110, 0]} />
			<OrbitControls enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2} maxDistance={22} minDistance={3} />
		</>
	);
}
