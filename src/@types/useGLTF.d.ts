// custom-drei.d.ts
import { Mesh, MeshStandardMaterial } from 'three';
import { GLTF, GLTFLoader } from 'three-stdlib';

declare module '@react-three/drei' {
	export function useGLTF<T extends string | string[]>(
		path: T,
		useDraco?: boolean | string,
		useMeshOpt?: boolean,
		extendLoader?: (loader: GLTFLoader) => void,
	): T extends any[]
		? GLTF[]
		: GLTF & {
				// Aqui você pode estender o tipo de retorno da função
				nodes: {
					[key: string]: Mesh;
				};
				materials: {
					[key: string]: MeshStandardMaterial;
				};
		  };

	export namespace useGLTF {
		var preload: (
			path: string | string[],
			useDraco?: string | boolean,
			useMeshOpt?: boolean,
			extendLoader?: ((loader: GLTFLoader) => void) | undefined,
		) => undefined;

		var clear: (input: string | string[]) => void;
		var setDecoderPath: (path: string) => void;
	}
}
