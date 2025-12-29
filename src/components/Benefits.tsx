'use client';

import { Check } from 'lucide-react';

export default function Benefits() {
    const founderBenefits = [
        'Speed: Parallel execution of micro-tasks.',
        'Clarity: AI forces strict specs before code.',
        'Risk-free: Pay only when tests pass.',
        'Zero management: No meetings, no hiring.'
    ];

    const devBenefits = [
        'No proposals: Claim tasks instantly.',
        'No chasing money: Escrow is funded upfront.',
        'Objective acceptance: Tests pass = you get paid.',
        'Flexible: Work 2 hours or 20. Your call.'
    ];

    return (
        <section className="min-h-screen flex items-center justify-center bg-background py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid md:grid-cols-2 gap-20 lg:gap-32">

                    {/* For Founders */}
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-12">
                            For Founders
                        </h2>
                        <ul className="space-y-6">
                            {founderBenefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                                        <Check className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-lg text-muted-foreground">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* For Developers */}
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
                            For Developers
                        </h2>
                        <ul className="space-y-4">
                            {devBenefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                                        <Check className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-lg text-muted-foreground">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
