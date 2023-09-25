import { Environment, MeshPortalMaterial, PortalMaterialType, RoundedBox, useTexture } from '@react-three/drei';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { ReactNode, useRef } from 'react';
import { BackSide, DoubleSide } from 'three';

interface PortalProps {
	texture: string;
	active: boolean;
	name: string;
	children: ReactNode;
	position?: [number, number, number];
	rotation?: [number, number, number];
	portalArgs: [number, number, number];
	preset: PresetsType;
}
export function Portal({ texture, children, active, name, position, rotation, portalArgs, preset }: PortalProps) {
	const map = useTexture(texture);
	const portalRef = useRef<PortalMaterialType>(null);

	useFrame((_state, delta) => {
		if (!portalRef.current) return;

		easing.damp(portalRef.current, 'blend', active ? 1 : 0, 0.2, delta);
	});

	return (
		<group>
			<RoundedBox name={name} position={position} rotation={rotation} args={portalArgs}>
				<MeshPortalMaterial ref={portalRef} side={DoubleSide}>
					{children}
					<mesh>
						<sphereGeometry args={[5, 254, 254]} />
						<meshStandardMaterial map={map} side={BackSide} />
					</mesh>
					<ambientLight intensity={0.2} />
					<Environment preset={preset} />
				</MeshPortalMaterial>
			</RoundedBox>
		</group>
	);
}
