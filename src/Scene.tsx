import { Environment, useGLTF } from '@react-three/drei';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';

export interface SceneProps {
	id: string;
	presets?: PresetsType;
	scale?: number;
	position?: [number, number, number];
	path: string;
}

export default function Scene({ presets, scale, position, path }: SceneProps) {
	const { scene } = useGLTF(`${path}`);
	return (
		<mesh scale={scale} position={position}>
			<primitive object={scene} />;
			<Environment preset={presets} />
		</mesh>
	);
}
