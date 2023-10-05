import { AccumulativeShadows, Environment, OrbitControls, PerspectiveCamera, Sphere, useHelper } from '@react-three/drei';

import { useLoader } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useRef } from 'react';
import { BackSide, SpotLight, SpotLightHelper } from 'three';
import { GLTFLoader } from 'three-stdlib';

export const Portals = ({ mainColor, path, ...props }: any) => {
	const { scene } = useLoader(GLTFLoader, path);

	useEffect(() => {
		scene.traverse((child: any) => {
			if (child.isMesh) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
	}, [scene]);

	const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920));
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
			<color attach="background" args={['#222']} />
			<group castShadow receiveShadow dispose={null} {...props}>
				<PerspectiveCamera makeDefault position={[3, 3, 8]} near={1} />
				<OrbitControls
					autoRotate
					enablePan={false}
					minPolarAngle={0}
					maxPolarAngle={Math.PI / 2}
					minDistance={1}
					maxDistance={10}
					autoRotateSpeed={0.5}
				/>
				<primitive castShadow receiveShadow object={scene} scale={ratioScale} />
				<AccumulativeShadows frames={100} alphaTest={0.9} scale={30} position={[0, -1, 0]} color="pink" opacity={0.8}>
					<spotLight ref={spotLightRef} position={[x, y, z]} distance={distance} intensity={intensity} angle={angle} />
					<spotLight ref={secondSpotLightRef} position={[-x, y, -z]} distance={distance} intensity={intensity} angle={angle} />
				</AccumulativeShadows>
				<Environment blur={0.8} background>
					<Sphere scale={15}>
						<meshBasicMaterial color={mainColor} side={BackSide} />
					</Sphere>
					{/*
					<Lightformer
						position={[5, 0, -5]}
						form="rect" // circle | ring | rect (optional, default = rect)
						intensity={1} // power level (optional = 1)
						color="red" // (optional = white)
						scale={[3, 5, 1]} // Scale it any way you prefer (optional = [1, 1])
						target={[0, 0, 0]}
                              />

                               <Lightformer
						position={[-5, 0, 1]}
						form="circle" // circle | ring | rect (optional, default = rect)
						intensity={1} // power level (optional = 1)
						color="green" // (optional = white)
						scale={[2, 5, 1]} // Scale it any way you prefer (optional = [1, 1])
						target={[0, 0, 0]}
					/>

					<Lightformer
						position={[0, 5, -2]}
						form="ring" // circle | ring | rect (optional, default = rect)
						intensity={0.5} // power level (optional = 1)
						color="orange" // (optional = white)
						scale={[10, 5, 1]} // Scale it any way you prefer (optional = [1, 1])
						target={[0, 0, 0]}
					/>
					<Lightformer
						position={[0, 0, 5]}
						form="rect" // circle | ring | rect (optional, default = rect)
						intensity={1} // power level (optional = 1)
						color="purple" // (optional = white)
						scale={[10, 5, 1]} // Scale it any way you prefer (optional = [1, 1])
						target={[0, 0, 0]}
					/> */}
				</Environment>
			</group>
		</>
	);
};
