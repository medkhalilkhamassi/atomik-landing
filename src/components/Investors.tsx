'use client';

import { Button } from './Button';
import { Download, Mail } from 'lucide-react';

export default function Investors() {
    return (
        <section id="investors" className="min-h-screen flex items-center justify-center bg-background py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center mb-24">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Investor Snapshot
                    </h2>
                    <p className="mt-6 text-lg text-muted-foreground">
                        For accelerators and angels who dig clarity.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 mb-20">
                    {/* Card 1: What it is */}
                    <div className="bg-muted rounded-2xl p-8 border border-border">
                        <h3 className="text-lg font-bold text-foreground mb-4">What it is</h3>
                        <p className="text-muted-foreground">
                            A managed marketplace where AI agents decompose tasks and extensive automated tests replace PMs and interviews.
                        </p>
                    </div>

                    {/* Card 2: Why now */}
                    <div className="bg-muted rounded-2xl p-8 border border-border">
                        <h3 className="text-lg font-bold text-foreground mb-4">Why now</h3>
                        <p className="text-muted-foreground">
                            LLMs can finally write accurate tests and specs, but they still struggle with complex implementation. We bridge that gap by using humans for the 'last mile' of coding.
                        </p>
                    </div>

                    {/* Card 3: What we’re building */}
                    <div className="bg-muted rounded-2xl p-8 border border-border">
                        <h3 className="text-lg font-bold text-foreground mb-4">What we’re building</h3>
                        <p className="text-muted-foreground">
                            The first "Spec-to-Code" pipeline that guarantees functional delivery without hiring overhead.
                        </p>
                    </div>
                </div>

                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm font-medium bg-muted text-muted-foreground inline-block px-4 py-2 rounded-full mb-8">
                        Business model: Take rate on tasks + Optional founder subscription.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button variant="outline" onClick={() => alert('Deck placeholder')}>
                            <Download className="mr-2 h-4 w-4" />
                            Request the deck
                        </Button>
                        <Button variant="secondary" onClick={() => window.location.href = 'mailto:hello@atomik.dev'}>
                            <Mail className="mr-2 h-4 w-4" />
                            Email us
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
