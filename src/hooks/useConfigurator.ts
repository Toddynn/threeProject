import { useContext } from 'react';
import { ConfiguratorContext } from '../contexts/configurator';

export const useConfigurator = () => {
	return useContext(ConfiguratorContext);
};
