import { useContext } from 'react';
import { AnimationsContext } from '../contexts/animations';

export const useAnimation = () => {
	return useContext(AnimationsContext);
};
