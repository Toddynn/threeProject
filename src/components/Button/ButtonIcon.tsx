import { ElementType, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonIconProps extends HTMLAttributes<HTMLOrSVGImageElement> {
	icon: ElementType;
	size?: number;
}

export default function ButtonIcon({ icon: Icon, className, size, children, ...rest }: ButtonIconProps) {
	return (
		<Icon className={twMerge('', className)} size={size} {...rest}>
			{children}
		</Icon>
	);
}
