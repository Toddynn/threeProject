import { Environment, useGLTF } from '@react-three/drei';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { useRef } from 'react';

export interface DoorProps {
	props?: JSX.IntrinsicElements['mesh'];
	preset?: PresetsType;
}
export default function Door({ preset, props }: DoorProps) {
	const { scene } = useGLTF('/models/porta.gltf');

	const ref = useRef<THREE.Mesh>(null!);

	return (
		<mesh {...props} ref={ref}>
			<primitive object={scene} />

			<Environment preset={preset} />
		</mesh>
	);
}
