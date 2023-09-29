// Modify the ControlAnimations component to include animationPaused state
import { RiDoorClosedLine, RiDoorOpenLine } from 'react-icons/ri';
import { useAnimation } from '../../../hooks/useAnimation';
import { Button } from '../../Button';

export function ControlAnimations() {
	const { animations, setAnimationIndex, animationIndex } = useAnimation();

	return (
		<>
			{animations && (
				<div className="absolute bottom-0 left-[50%] z-50 mx-auto flex h-auto w-auto -translate-x-[50%] gap-3  overflow-y-auto rounded-md p-7 ">
					{animations.map((_, index: number) => {
						return (
							<Button.Root
								key={index}
								onClick={() => {
									setAnimationIndex(index);
								}}
								data-active={animationIndex === index}
								className="rounded-full bg-muted p-2 hover:bg-muted-foreground hover:text-accent data-[active=true]:bg-muted-foreground data-[active=true]:text-accent"
							>
								<Button.Icon icon={RiDoorOpenLine} size={22} />
							</Button.Root>
						);
					})}
					<Button.Root
						onClick={() => {
							setAnimationIndex(undefined);
						}}
						data-active={animationIndex === undefined}
						className="rounded-full bg-muted p-2 hover:bg-muted-foreground hover:text-accent data-[active=true]:bg-muted-foreground data-[active=true]:text-accent"
					>
						<Button.Icon icon={RiDoorClosedLine} size={22} />
					</Button.Root>
				</div>
			)}
		</>
	);
}
