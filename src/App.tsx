import { CameraControls, PerformanceMonitor, PerspectiveCamera, SoftShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { Suspense, useState } from 'react';
import Scene from './Scene';

export default function App() {
	const [bad, set] = useState(false);
	const { debug, enabled, samples, ...config } = useControls({
		debug: true,
		enabled: true,
		size: { value: 35, min: 0, max: 100, step: 0.1 },
		focus: { value: 0.5, min: 0, max: 2, step: 0.1 },
		samples: { value: 16, min: 1, max: 40, step: 1 },
	});
	return (
		<div className="h-screen">
			<Canvas shadows camera={{ position: [5, 2, 10], fov: 50 }}>
				<PerspectiveCamera name="camera" fov={40} near={10} far={1000} position={[10, 0, 50]} />
				{debug && <Perf position="top-left" />}
				<PerformanceMonitor onDecline={() => set(true)} />
				{enabled && <SoftShadows {...config} samples={bad ? Math.min(6, samples) : samples} />}
				<CameraControls makeDefault />
				<color attach="background" args={['#509']} />
				<ambientLight intensity={0.4} />
				<Suspense fallback={null}>
					<Scene id="tv" path="models/tv/scene.gltf" presets="city" scale={0.1} position={[0, 0, 0]} />
				</Suspense>
			</Canvas>
		</div>
	);
}
