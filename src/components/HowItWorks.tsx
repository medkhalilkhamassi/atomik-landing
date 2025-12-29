'use client';

import { LinkCard } from '@/components/ui/link-card';

export default function HowItWorks() {
    const steps = [
        {
            id: '01',
            title: 'Virtual Co‑Founder',
            description: 'AI agents turn your raw intent into testable micro-specs. They break down vague ideas into concrete requirements that developers can actually build.',
            imageUrl: 'https://placehold.co/600x400/101010/FFFFFF/png?text=Planning',
            href: '#agents'
        },
        {
            id: '02',
            title: 'Firehose Market',
            description: 'Prepaid micro-tasks hit the marketplace. Developers claim them instantly. No bidding, no proposals, just code.',
            imageUrl: 'https://placehold.co/600x400/101010/FFFFFF/png?text=Market',
            href: '#mechanics'
        },
        {
            id: '03',
            title: 'Trustless Delivery',
            description: 'Automated tests decide if the work is done. You approve, and escrow releases payment instantly. Zero friction.',
            imageUrl: 'https://placehold.co/600x400/101010/FFFFFF/png?text=Delivery',
            href: '#benefits'
        }
    ];

    return (
        <section id="how-it-works" className="min-h-screen flex items-center justify-center bg-background py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center mb-24">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        The Engine
                    </h2>
                    <p className="mt-6 text-lg text-muted-foreground">
                        How Atomik turns specs into code.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 justify-items-center">
                    {steps.map((step) => (
                        <LinkCard
                            key={step.id}
                            title={step.title}
                            description={step.description}
                            imageUrl={step.imageUrl}
                            href={step.href}
                            target="_self" // Override standard blank target for internal nav
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
