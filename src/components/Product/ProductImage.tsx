import { ImgHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ProductImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

export default function ProductImage({ className, ...rest }: ProductImageProps) {
	return <img {...rest} className={twMerge('', className)} />;
}
