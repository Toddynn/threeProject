import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ProductContentProps extends HTMLAttributes<HTMLDivElement> {}

export default function ProductContent({ className, children, ...rest }: ProductContentProps) {
	return (
		<div className={twMerge('', className)} {...rest}>
			{children}
		</div>
	);
}
