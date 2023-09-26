import { MotionProps, motion } from 'framer-motion';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ProductRootProps extends HTMLAttributes<HTMLDivElement> {}

export type CombinedProductRootProps = ProductRootProps & MotionProps;

export default function ProductRoot({ children, className, ...rest }: CombinedProductRootProps) {
	return (
		<motion.div className={twMerge(``, className)} {...rest}>
			{children}
		</motion.div>
	);
}
