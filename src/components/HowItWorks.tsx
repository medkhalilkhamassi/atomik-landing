'use client';

import { Bot, Zap, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        {
            id: '01',
            title: 'Virtual Co‑Founder (Spec)',
            description: 'AI agents turn your raw intent into testable micro-specs. They break down vague ideas into concrete requirements that developers can actually build.',
            icon: Bot,
            details: null
        },
        {
            id: '02',
            title: 'Firehose Marketplace (Build)',
            description: 'Prepaid micro-tasks hit the marketplace. Developers claim them instantly. No bidding, no proposals, just code.',
            icon: Zap,
            details: [
                'Scope: 2–4 hours',
                'Price: $20–$80',
                'Deadline: 12 hours'
            ]
        },
        {
            id: '03',
            title: 'Trustless Delivery (Verify + Pay)',
            description: 'Automated tests decide if the work is done. You approve, and escrow releases payment instantly. Zero friction.',
            icon: CheckCircle,
            details: null
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

                <div className="grid md:grid-cols-3 gap-16 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-0.5 bg-border/20 -z-10" />

                    {steps.map((step) => (
                        <div key={step.id} className="relative flex flex-col items-center text-center group">
                            <div className="w-16 h-16 rounded-2xl bg-background border-2 border-border flex items-center justify-center mb-6 shadow-sm group-hover:border-primary/50 group-hover:shadow-md transition-all duration-300">
                                <step.icon className="w-8 h-8 text-primary" />
                            </div>

                            <div className="absolute top-0 right-0 left-0 flex justify-center -translate-y-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs font-bold text-muted-foreground tracking-widest">{step.id}</span>
                            </div>

                            <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                                {step.description}
                            </p>

                            {step.details && (
                                <div className="mt-6 flex flex-wrap justify-center gap-2">
                                    {step.details.map((detail, idx) => (
                                        <span key={idx} className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground border border-border">
                                            {detail}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
