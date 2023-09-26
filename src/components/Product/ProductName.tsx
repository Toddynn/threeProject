import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ProductNameProps extends HTMLAttributes<HTMLHeadingElement> {}

export default function ProductName({ children, className, ...rest }: ProductNameProps) {
	return (
		<h1 className={twMerge('', className)} {...rest}>
			{children}
		</h1>
	);
}
