'use client';

import { Telescope, Map, Palette, Layers, ShieldCheck, Gavel } from 'lucide-react';

export default function Agents() {
    const agents = [
        {
            name: 'Mary',
            role: 'Analyst',
            title: 'The Treasure Hunter',
            description: 'Digs for market insights and requirements so you don’t build the wrong thing.',
            icon: Telescope
        },
        {
            name: 'John',
            role: 'PM',
            title: 'The Strategist',
            description: 'Breaks down visions into executable roadmaps and concrete tasks.',
            icon: Map
        },
        {
            name: 'Sally',
            role: 'Designer',
            title: 'The Artist',
            description: 'Ensures the user experience is intuitive, accessible, and delightful.',
            icon: Palette
        },
        {
            name: 'Winston',
            role: 'Architect',
            title: 'The Scaler',
            description: 'Designs robust systems that can handle growth without collapsing.',
            icon: Layers
        },
        {
            name: 'Murat',
            role: 'QA Lead',
            title: 'The Skeptic',
            description: 'Hunts for bugs and edge cases. Nothing gets past strict validation.',
            icon: ShieldCheck
        },
        {
            name: 'Amelia',
            role: 'Gatekeeper',
            title: 'The Judge',
            description: 'The final arbiter of quality. Enforces standards before deployment.',
            icon: Gavel
        }
    ];

    return (
        <section id="agents" className="min-h-screen flex items-center justify-center bg-background py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Meet the Agents
                    </h2>
                    <p className="mt-6 text-lg text-muted-foreground">
                        Your specialized AI workforce, running 24/7.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {agents.map((agent) => (
                        <div key={agent.name} className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border transition-all hover:shadow-lg hover:ring-primary/20">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                                    <agent.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold leading-7 tracking-tight text-foreground">
                                        {agent.name}
                                    </h3>
                                    <p className="text-sm font-semibold leading-6 text-primary">
                                        {agent.role}
                                    </p>
                                </div>
                            </div>

                            <div className="relative">
                                <p className="text-sm font-medium text-foreground italic mb-2">
                                    "{agent.title}"
                                </p>
                                <p className="text-sm leading-6 text-muted-foreground">
                                    {agent.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
