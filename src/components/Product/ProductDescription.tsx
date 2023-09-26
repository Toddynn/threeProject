import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ProductDescriptionProps extends HTMLAttributes<HTMLHeadingElement> {}

export default function ProductDescription({ children, className, ...rest }: ProductDescriptionProps) {
	return (
		<h3 className={twMerge('', className)} {...rest}>
			{children}
		</h3>
	);
}
