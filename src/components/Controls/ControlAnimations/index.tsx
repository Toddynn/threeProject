import { useAnimation } from '../../../hooks/useAnimation';
import { Button } from '../../ShadCN/ui/button';

export function ControlAnimations() {
	const { animations, setAnimationIndex } = useAnimation();
	return (
		<>
			{animations && (
				<div className="fixed right-5 top-5 z-50 flex h-auto w-auto flex-col gap-3 overflow-y-auto rounded-md bg-white">
					{animations.map((animation, index) => {
						return (
							<Button key={index} onClick={() => setAnimationIndex(index)}>
								{animation}
							</Button>
						);
					})}
					<Button onClick={() => setAnimationIndex(undefined)} variant={'secondary'}>
						Parar
					</Button>
				</div>
			)}
		</>
	);
}
