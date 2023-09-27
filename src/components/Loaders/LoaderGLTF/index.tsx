import { CircularProgress } from '@mui/material';
import { Html, useProgress } from '@react-three/drei';

export function LoaderGLTF() {
	const { progress } = useProgress();
	return (
		<Html as="div">
			<CircularProgress value={progress} color="primary" size={26} />
		</Html>
	);
}
