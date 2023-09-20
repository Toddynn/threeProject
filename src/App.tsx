import { CameraControls, PerformanceMonitor, PerspectiveCamera, SoftShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
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
		<div className="flex h-screen items-center justify-center">
			<div className="flex h-[650px] w-[70%] items-center overflow-hidden rounded-2xl bg-[#796d59]/20  outline outline-1 outline-white/40 backdrop-blur-md">
				<div className="flex h-full flex-1 bg-[#cdcac5]">
					<motion.div className="h-full w-full bg-transparent">
						<Canvas shadows camera={{ position: [5, 2, 10], fov: 100, castShadow: true }}>
							<PerspectiveCamera name="camera" fov={40} near={10} far={1000} position={[10, 0, 50]} />
							{debug && <Perf position="top-left" />}
							<PerformanceMonitor onDecline={() => set(true)} />
							{enabled && <SoftShadows {...config} samples={bad ? Math.min(6, samples) : samples} />}
							<CameraControls makeDefault {...config} />
							<directionalLight castShadow position={[2.5, 8, 5]} shadow-mapSize={[1024, 1024]}>
								<orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
							</directionalLight>
							<Suspense fallback={null}>
								<Scene id="tv" path="models/tv/scene.gltf" presets="city" scale={0.1} position={[0, 0, 0]} />
							</Suspense>
						</Canvas>
					</motion.div>
				</div>
				<div className="flex h-full flex-1">dados</div>
			</div>
			<AnimatePresence initial={false} onExitComplete={() => null} mode="wait"></AnimatePresence>
		</div>
	);
}
