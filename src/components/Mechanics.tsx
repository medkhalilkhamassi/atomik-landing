'use client';

import { Box, Lock, Code2, Scale } from 'lucide-react';

export default function Mechanics() {
    const mechanics = [
        {
            title: 'Micro-Tasks',
            description: 'Work is atomized into 2-4 hour chunks. Small scope means small risk.',
            icon: Box
        },
        {
            title: 'Tight Leash',
            description: 'Strict timeouts and deadlines. No open-ended engagements.',
            icon: Lock
        },
        {
            title: 'Objective Truth',
            description: 'Code is judged by passing tests, not opinions or "good vibes".',
            icon: Code2
        },
        {
            title: 'Escrow',
            description: 'Funds are held in neutral smart contracts (or equivalent) until success.',
            icon: Scale
        }
    ];

    return (
        <section id="mechanics" className="min-h-screen flex items-center justify-center bg-background py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center mb-24">
                    <h2 className="text-3xl font-bold tracking-tight mb-6">
                        Mechanics of Trust
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Why you don't need to trust each other.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-12">
                    {mechanics.map((mech) => (
                        <div key={mech.title} className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
                            <mech.icon className="w-10 h-10 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{mech.title}</h3>
                            <p className="text-muted-foreground">
                                {mech.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
