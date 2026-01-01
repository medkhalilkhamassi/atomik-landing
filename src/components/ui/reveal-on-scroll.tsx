'use client';

import { motion, useInView, UseInViewOptions } from 'framer-motion';
import { useRef } from 'react';

interface RevealOnScrollProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    yOffset?: number;
    threshold?: number;
}

export function RevealOnScroll({
    children,
    className = "",
    delay = 0,
    duration = 0.8,
    yOffset = 40,
    threshold = 0.1
}: RevealOnScrollProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        margin: `0px 0px -${threshold * 100}% 0px` as any
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: yOffset }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98] // Smooth custom easing
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
