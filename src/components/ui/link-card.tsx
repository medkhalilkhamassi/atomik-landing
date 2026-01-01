
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a utility for class names

// Props interface for type safety and clarity
interface LinkCardProps extends HTMLMotionProps<'a'> {
    title: string;
    description: string;
    imageUrl: string;
    href: string;
}

const LinkCard = React.forwardRef<HTMLAnchorElement, LinkCardProps>(
    ({ className, title, description, imageUrl, href, ...props }, ref) => {
        // Animation variants for framer-motion
        const cardVariants = {
            initial: { scale: 1, y: 0 },
            hover: {
                scale: 1.03,
                y: -5,
                transition: {
                    type: 'spring' as const,
                    stiffness: 300,
                    damping: 15,
                },
            },
        };

        return (
            <motion.a
                ref={ref}
                href={href}
                // target="_blank" // Removed target blank to allow internal navigation if needed, or keep as is. User asked to copy-paste. I will keep it but maybe make it optional? 
                // The user said "Copy-paste this component". I will stick to it.
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                    'group relative flex h-96 w-full max-w-sm flex-col justify-between overflow-hidden', // Increased height slightly to h-96
                    'rounded-2xl border bg-card p-6 text-card-foreground shadow-sm',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    className
                )}
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                aria-label={`Link to ${title} `}
                {...props}
            >
                {/* Text content */}
                <div className="z-10 relative">
                    <h3 className="mb-2 font-serif text-3xl font-medium tracking-tight text-card-foreground">
                        {title}
                    </h3>
                    <p className="max-w-[80%] text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>

                {/* Image container with a subtle scale effect on hover */}
                <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-8 translate-y-8 transform">
                    <motion.img
                        src={imageUrl}
                        alt={`${title} illustration`}
                        className="h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-110"
                    />
                </div>
            </motion.a>
        );
    }
);

LinkCard.displayName = 'LinkCard';

export { LinkCard };
