// Modify your useAnimation hook to include a ref for animation control
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { BackgroundAudio } from '../../components/Controls/ControlDoor';

interface AudiosContextData {
	ambientAudios: BackgroundAudio[];
	ambientAudioIndex: number | undefined;
	setAmbientAudioIndex: Dispatch<SetStateAction<number | undefined>>;
}

export const AudiosContext = createContext<AudiosContextData>({} as AudiosContextData);

export interface AnimationsProviderProps {
	children: ReactNode;
}

export const AmbientAudioProvider = ({ children }: AnimationsProviderProps) => {
	const [ambientAudioIndex, setAmbientAudioIndex] = useState<AudiosContextData['ambientAudioIndex']>(undefined);
	const [ambientAudios, setAmbientAudios] = useState<AudiosContextData['ambientAudios']>([
		{
			id: 1,
			path: 'audios/cityNoise.mp3',
			name: 'Cidade',
		},
		{
			id: 2,
			path: 'audios/rain.mp3',
			name: 'Chuva',
		},
		{
			id: 3,
			path: 'audios/passaros.mp3',
			name: 'Pássaros',
		},
	]);

	return <AudiosContext.Provider value={{ ambientAudios, ambientAudioIndex, setAmbientAudioIndex }}>{children}</AudiosContext.Provider>;
};
