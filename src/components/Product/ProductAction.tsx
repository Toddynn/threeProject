import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ProductActionProps extends HTMLAttributes<HTMLDivElement> {}

export default function ProductAction({ children, className, ...rest }: ProductActionProps) {
	return (
		<div className={twMerge('flex cursor-pointer items-center justify-center', className)} {...rest}>
			{children}
		</div>
	);
}
