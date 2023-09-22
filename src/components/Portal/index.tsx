import { MeshPortalMaterial, PortalMaterialType, RoundedBox, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { ReactNode, useRef } from 'react';
import { BackSide, DoubleSide } from 'three';

interface PortalProps {
	texture: string;
	active: boolean;
	setActive: React.Dispatch<React.SetStateAction<boolean>>;
	name: string;
	children: ReactNode;
	position?: [number, number, number];
	rotation?: [number, number, number];
}
export function Portal({ texture, children, active, setActive, name, position, rotation }: PortalProps) {
	const map = useTexture(texture);
	const portalRef = useRef<PortalMaterialType>(null);

	useFrame((_state, delta) => {
		if (!portalRef.current) return;

		easing.damp(portalRef.current, 'blend', active ? 1 : 0, 0.2, delta);
	});

	return (
		<group castShadow receiveShadow onDoubleClick={() => setActive(!active)}>
			<RoundedBox name={name} position={position} rotation={rotation} args={[5, 4, 0.1]}>
				<MeshPortalMaterial ref={portalRef} side={DoubleSide}>
					{children}
					<mesh>
						<sphereGeometry args={[5, 254, 254]} />
						<meshStandardMaterial map={map} side={BackSide} />
					</mesh>
				</MeshPortalMaterial>
			</RoundedBox>
		</group>
	);
}
