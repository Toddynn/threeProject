import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ProductActionsProps extends HTMLAttributes<HTMLDivElement> {}

export default function ProductActions({ children, className, ...rest }: ProductActionsProps) {
	return (
		<div className={twMerge('flex w-full items-center gap-2', className)} {...rest}>
			{children}
		</div>
	);
}
