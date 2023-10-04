import { useContext } from 'react';
import { AudiosContext } from '../contexts/audios';

export const useAmbientAudio = () => {
	return useContext(AudiosContext);
};
