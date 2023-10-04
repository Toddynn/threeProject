import { RiDoorClosedLine, RiDoorOpenLine, RiFullscreenExitLine, RiFullscreenLine } from 'react-icons/ri';
import { useAmbientAudio } from '../../../hooks/useAmbientAudio';
import { useAnimation } from '../../../hooks/useAnimation';
import { Button } from '../../Button';
import { Popover, PopoverContent, PopoverTrigger } from '../../ShadCN/ui/popover';

import { Tooltip } from '@mui/material';
import { Volume, Volume2 } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
export interface BackgroundAudio {
	id: number;
	path: string;
	name: string;
}

export interface ControlDoorProps {
	isFullScreen: boolean;
	setIsFullScreen: Dispatch<SetStateAction<boolean>>;
}

export function ControlDoor({ isFullScreen, setIsFullScreen }: ControlDoorProps) {
	const { animations, setAnimationIndex, animationIndex } = useAnimation();
	const { ambientAudios, setAmbientAudioIndex, ambientAudioIndex } = useAmbientAudio();

	const toggleFullscreen = () => {
		setIsFullScreen((prev) => !prev);
	};

	return (
		<div className="absolute bottom-0 z-50 flex w-full gap-2 p-7">
			<Button.Root
				data-active={isFullScreen}
				className="rounded-full bg-muted p-2 hover:bg-muted-foreground hover:text-accent data-[active=true]:bg-muted-foreground data-[active=true]:text-accent"
				onClick={toggleFullscreen}
			>
				<Button.Icon icon={isFullScreen ? RiFullscreenExitLine : RiFullscreenLine} size={22} />
			</Button.Root>
			{animations && (
				<div className=" mx-auto flex gap-2 rounded-full border  bg-muted ">
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
			<Popover>
				<Tooltip title={'Sons Ambiente'}>
					<PopoverTrigger>
						<Button.Root
							data-active={ambientAudioIndex !== undefined}
							className="rounded-full bg-muted p-2 hover:bg-muted-foreground hover:text-accent  data-[active=true]:bg-muted-foreground data-[active=true]:text-accent"
						>
							<Button.Icon
								data-active={ambientAudioIndex !== undefined}
								className="transition-all duration-100 data-[active=false]:translate-x-1"
								icon={ambientAudioIndex !== undefined ? Volume2 : Volume}
								size={22}
							/>
						</Button.Root>
					</PopoverTrigger>
				</Tooltip>
				<PopoverContent className="flex -translate-y-2 flex-col gap-2">
					{ambientAudios.map((audio: BackgroundAudio, index: number) => {
						return (
							<Button.Root
								key={index}
								onClick={() => {
									setAmbientAudioIndex((prev) => (prev === index ? undefined : index));
								}}
								value={audio.id}
								data-active={index === ambientAudioIndex}
								className="flex w-full items-center justify-center rounded-sm border border-muted-foreground/30 bg-muted py-1 hover:bg-muted-foreground hover:text-accent data-[active=true]:bg-muted-foreground data-[active=true]:text-accent"
							>
								{audio.name}
								{index === ambientAudioIndex && (
									<div
										data-active={index === ambientAudioIndex}
										className="loaderMusic text-accent data-[active=true]:text-accent"
									/>
								)}
							</Button.Root>
						);
					})}
				</PopoverContent>
			</Popover>
		</div>
	);
}
