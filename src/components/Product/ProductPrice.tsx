import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ProductPriceProps extends HTMLAttributes<HTMLSpanElement> {}

export default function ProductPrice({ children, className, ...rest }: ProductPriceProps) {
	return (
		<span className={twMerge('', className)} {...rest}>
			{children}
		</span>
	);
}
