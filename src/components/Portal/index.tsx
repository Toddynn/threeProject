import { useTexture, PortalMaterialType, RoundedBox, MeshPortalMaterial, Environment } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { ReactNode, useRef } from 'react';
import { Scene, DoubleSide, BackSide } from 'three';

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
						<sphereGeometry args={[5, 48, 48]} />
						<meshStandardMaterial map={map} side={BackSide} />
					</mesh>
				</MeshPortalMaterial>
			</RoundedBox>
		</group>
	);
}
