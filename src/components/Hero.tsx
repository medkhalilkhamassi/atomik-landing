'use client';

import { Button } from '@/components/ui/button';
import { Mail, SendHorizonal } from 'lucide-react';
import { TextEffect } from '@/components/ui/text-effect';
import { AnimatedGroup } from '@/components/ui/animated-group';

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-background min-h-screen flex items-center justify-center pt-20 pb-20 lg:pt-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="relative z-10 mx-auto max-w-4xl text-center">
                    <AnimatedGroup
                        variants={{
                            container: {
                                visible: {
                                    transition: {
                                        staggerChildren: 0.05,
                                    },
                                },
                            },
                        }}
                    >
                        <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-primary bg-primary/10 border border-primary/20 mb-12 mx-auto">
                            Private beta launching soon.
                        </div>

                        <TextEffect
                            preset="fade-in-blur"
                            speedSegment={0.3}
                            as="h1"
                            className="text-balance text-5xl font-bold tracking-tight text-foreground md:text-7xl mb-10"
                        >
                            Specs In → Code Out.
                        </TextEffect>

                        <TextEffect
                            per="line"
                            preset="fade-in-blur"
                            speedSegment={0.3}
                            delay={0.5}
                            as="p"
                            className="mx-auto mt-10 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed"
                        >
                            Atomik turns vague ideas into testable micro-tasks, gets them built by developers, and releases payment only when automated tests pass.
                        </TextEffect>

                        <div className="mt-16 mx-auto max-w-sm">
                            <form action="" className="relative">
                                <div className="bg-background has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] items-center rounded-lg border pr-2 shadow-sm has-[input:focus]:ring-2">
                                    <Mail className="pointer-events-none absolute inset-y-0 left-4 my-auto size-4 text-muted-foreground" />

                                    <input
                                        placeholder="Your mail address"
                                        className="h-12 w-full bg-transparent pl-12 text-foreground placeholder:text-muted-foreground focus:outline-none"
                                        type="email"
                                    />

                                    <div className="md:pr-1.5 lg:pr-0">
                                        <Button
                                            aria-label="submit"
                                            size="sm"
                                            className="rounded-md"
                                        >
                                            <span className="hidden md:block">Join Waitlist</span>
                                            <SendHorizonal
                                                className="relative mx-auto size-5 md:hidden"
                                                strokeWidth={2}
                                            />
                                        </Button>
                                    </div>
                                </div>
                            </form>
                            <p className="mt-6 text-xs text-muted-foreground font-medium">
                                No interviews. No proposals. No meetings.
                            </p>
                        </div>
                    </AnimatedGroup>
                </div>
            </div>

            {/* Decorative background */}
            <div className="absolute top-0 -z-10 h-full w-full bg-background">
                <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-primary/5 blur-[80px]"></div>
            </div>
        </section>
    );
}
