import { useAnimation } from '../../hooks/useAnimation';

export function ControlAnimations() {
	const { animations, ...rest } = useAnimation();
	return (
		<>
			{animations && (
				<div className="fixed bottom-5 right-5 z-50 flex h-auto w-auto flex-col gap-3 overflow-y-auto rounded-md bg-white">
					{animations.map((animation, index) => {
						return (
							<button key={index} onClick={() => rest.setAnimationIndex(index)}>
								{animation}
							</button>
						);
					})}
				</div>
			)}
		</>
	);
}
