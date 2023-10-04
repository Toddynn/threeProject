import { CameraControls, Dodecahedron, Environment, Grid, MeshDistortMaterial, RenderTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useAtom } from 'jotai';
import { useControls } from 'leva';
import { useEffect, useRef } from 'react';
import { Portals } from '../../Objects/Portals';
import { slideAtom } from '../../Overlay';

export const scenes = [
	{
		path: 'models/door/PortaLisaComNLA.glb',
		mainColor: '#f9c0ff',
		name: 'Cybertruck',
		description: 'Better utility than a truck with more performance than a sports car',
		price: 72000,
		range: 660,
	},
	{
		path: 'models/door/PORTAO.glb',
		mainColor: '#c0ffe1',
		name: 'Model 3',
		description: 'The car of the future',
		price: 29740,
		range: 576,
	},
	{
		path: 'models/door/PortaLisaTexturizada.glb',
		mainColor: '#ffdec0',
		name: 'Semi',
		description: 'The Future of Trucking',
		price: 150000,
		range: 800,
	},
];

export default function ExperiencePortals() {
	const viewport = useThree((state) => state.viewport);
	const cameraControls = useRef<CameraControls>(null);
	const [slide] = useAtom(slideAtom);
	const lastSlide = useRef(0);

	const { dollyDistance } = useControls({
		dollyDistance: {
			value: 10,
			min: 0,
			max: 50,
		},
	});

	const moveToSlide = async () => {
		if (!cameraControls.current) return;
		await cameraControls.current.setLookAt(
			lastSlide.current * (viewport.width + slideDistance),
			3,
			dollyDistance,
			lastSlide.current * (viewport.width + slideDistance),
			0,
			0,
			true,
		);
		await cameraControls.current.setLookAt(
			(slide + 1) * (viewport.width + slideDistance),
			1,
			dollyDistance,
			slide * (viewport.width + slideDistance),
			0,
			0,
			true,
		);

		await cameraControls.current.setLookAt(slide * (viewport.width + slideDistance), 0, 5, slide * (viewport.width + slideDistance), 0, 0, true);
	};

	useEffect(() => {
		// Used to reset the camera position when the viewport changes
		const resetTimeout = setTimeout(() => {
			if (!cameraControls.current) return;
			cameraControls.current.setLookAt(slide * (viewport.width + slideDistance), 0, 5, slide * (viewport.width + slideDistance), 0, 0);
		}, 200);
		return () => clearTimeout(resetTimeout);
	}, [viewport]);

	useEffect(() => {
		if (lastSlide.current === slide) {
			return;
		}
		moveToSlide();
		lastSlide.current = slide;
	}, [slide]);

	const { slideDistance } = useControls({
		slideDistance: {
			value: 1,
			min: 0,
			max: 10,
		},
	});
	return (
		<>
			<ambientLight intensity={0.2} />
			<CameraControls
				ref={cameraControls}
				touches={{
					one: 0,
					two: 0,
					three: 0,
				}}
				mouseButtons={{
					left: 0,
					middle: 0,
					right: 0,
					wheel: 0,
				}}
			/>
			<Environment preset={'city'} />
			{/* MAIN WORLD */}

			<group>
				<mesh position={[0, viewport.height / 2 + 1.5, 0]}>
					<sphereGeometry args={[1, 32, 32]} />
					<MeshDistortMaterial color={scenes[0].mainColor} speed={3} />
				</mesh>

				<mesh position={[viewport.width + slideDistance, viewport.height / 2 + 1.5, 0]}>
					<boxGeometry />
					<MeshDistortMaterial color={scenes[1].mainColor} speed={3} />
				</mesh>

				<Dodecahedron position={[2 * (viewport.width + slideDistance), viewport.height / 2 + 1.5, 0]}>
					<MeshDistortMaterial color={scenes[2].mainColor} speed={3} />
				</Dodecahedron>
			</group>

			<Grid
				position={[0, -viewport.height / 2, 0]}
				sectionSize={1}
				sectionColor={'purple'}
				sectionThickness={1}
				cellSize={0.5}
				cellColor={'#6f6f6f'}
				cellThickness={0.6}
				infiniteGrid
				fadeDistance={50}
				fadeStrength={5}
			/>
			{scenes.map((scene, index) => (
				<mesh key={index} position={[index * (viewport.width + slideDistance), 0, 0]}>
					<planeGeometry args={[viewport.width, viewport.height]} />
					<meshBasicMaterial toneMapped={false}>
						<RenderTexture attach="map">
							<Portals {...scene} />
						</RenderTexture>
					</meshBasicMaterial>
				</mesh>
			))}
		</>
	);
}
