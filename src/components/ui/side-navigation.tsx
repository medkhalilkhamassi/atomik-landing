'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'manifesto', label: 'The Problem' },
    { id: 'agents', label: 'Agents' },
    { id: 'faq', label: 'FAQ' },
];

export function SideNavigation() {
    const [activeId, setActiveId] = useState('home');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-40% 0px -40% 0px', // Trigger when section is in the middle of viewport
                threshold: 0,
            }
        );

        navItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
            {navItems.map((item) => (
                <div key={item.id} className="group relative flex items-center justify-end">
                    {/* Label (Tooltip on hover) */}
                    <span
                        className="absolute right-8 mr-2 rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap border border-white/10 shadow-xl pointer-events-none"
                    >
                        {item.label}
                    </span>

                    {/* Dot */}
                    <button
                        onClick={() => scrollToSection(item.id)}
                        className="relative flex h-3 w-3 items-center justify-center outline-none"
                        aria-label={`Scroll to ${item.label}`}
                    >
                        {activeId === item.id ? (
                            <motion.div
                                layoutId="active-dot"
                                className="absolute inset-0 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.3)]"
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                        ) : (
                            <div className="h-1.5 w-1.5 rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white/50 group-hover:scale-125" />
                        )}
                    </button>
                </div>
            ))}
        </div>
    );
}
