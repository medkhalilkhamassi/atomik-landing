'use client';

import { useState } from 'react';
import { Button } from './Button';
import { Check, Loader2 } from 'lucide-react';

export default function Waitlist() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        // Simulate network request
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    if (status === 'success') {
        return (
            <section id="waitlist" className="min-h-screen flex items-center justify-center bg-background border-y border-border text-center py-32">
                <div className="mx-auto max-w-md px-4 w-full">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">You're on the list.</h2>
                    <p className="text-muted-foreground">
                        We'll reach out when your wave opens.
                    </p>
                    <Button
                        variant="ghost"
                        className="mt-8 text-muted-foreground hover:text-primary-foreground"
                        onClick={() => setStatus('idle')}
                    >
                        Add another email
                    </Button>
                </div>
            </section>
        );
    }

    return (
        <section id="waitlist" className="min-h-screen flex items-center justify-center bg-background border-y border-border py-24">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center w-full">
                <h2 className="text-3xl font-bold tracking-tight mb-6">
                    Get early access to Atomik.
                </h2>
                <p className="text-muted-foreground text-lg mb-16">
                    Join the waitlist. Tell us your role. We'll invite in waves.
                </p>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 text-left">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                            Email <span className="text-primary">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="you@company.com"
                            className="w-full rounded-lg border-0 bg-input border-border focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-foreground mb-1">
                            Role <span className="text-primary">*</span>
                        </label>
                        <select
                            id="role"
                            required
                            className="w-full rounded-lg border-0 bg-gray-800 px-4 py-3 text-primary-foreground focus:ring-2 focus:ring-primary"
                            defaultValue=""
                        >
                            <option value="" disabled>Select your role</option>
                            <option value="founder">Founder</option>
                            <option value="developer">Developer</option>
                            <option value="investor">Investor / Accelerator</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                                Name <span className="text-xs text-muted-foreground">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="John Doe"
                                className="w-full rounded-lg border-0 bg-gray-800 px-4 py-3 text-primary-foreground placeholder-gray-500 focus:ring-2 focus:ring-accent"
                            />
                        </div>
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-foreground mb-1">
                                Company <span className="text-xs text-muted-foreground">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                id="company"
                                placeholder="Acme Inc."
                                className="w-full rounded-lg border-0 bg-gray-800 px-4 py-3 text-primary-foreground placeholder-gray-500 focus:ring-2 focus:ring-accent"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full mt-6"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Joining...
                            </>
                        ) : (
                            'Join the waitlist'
                        )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground mt-4">
                        No spam. Unsubscribe anytime.
                    </p>
                </form>
            </div>
        </section>
    );
}
