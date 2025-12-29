import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
                    {
                        'bg-primary text-primary-foreground hover:bg-primary/90 shadow': variant === 'primary',
                        'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm': variant === 'secondary',
                        'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground': variant === 'outline',
                        'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
                        'h-9 px-4 text-sm': size === 'sm',
                        'h-11 px-6 text-base': size === 'md',
                        'h-14 px-8 text-lg': size === 'lg',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export { Button, cn };
