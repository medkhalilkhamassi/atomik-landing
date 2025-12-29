'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
    const faqs = [
        {
            question: "What exactly do I get?",
            answer: "You get production-ready code that passes your specifications and automated tests. It's not a prototype; it's a merged pull request."
        },
        {
            question: "How do you prevent bad work?",
            answer: "We don't rely on reviews. We rely on tests. If the code doesn't pass the provided test suite, the developer doesn't get paid. The system is binary."
        },
        {
            question: "What stacks do you support?",
            answer: "Currently we are optimized for modern web stacks: React, Next.js, Node.js, Python, and TypeScript. More specific constraints can be defined in your specs."
        },
        {
            question: "How fast is it?",
            answer: "Most micro-tasks are claimed within minutes and completed within 12 hours. You can parallelize dozens of tasks to build features overnight."
        },
        {
            question: "Who owns the code?",
            answer: "You do. 100%. Code is work-for-hire and ownership transfers upon payment release from escrow."
        },
        {
            question: "How do developer payouts work?",
            answer: "Payouts are instant upon verified test completion. We handle the escrow and transfer, developers get paid in USD or USDC."
        }
    ];

    return (
        <section className="min-h-screen flex items-center justify-center bg-background py-24">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 w-full">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-16 text-center">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-border bg-card overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
                <span className="font-semibold text-foreground">{question}</span>
                {isOpen ? (
                    <Minus className="h-5 w-5 text-muted-foreground" />
                ) : (
                    <Plus className="h-5 w-5 text-muted-foreground" />
                )}
            </button>
            {isOpen && (
                <div className="px-6 pb-6 pt-0 text-muted-foreground">
                    {answer}
                </div>
            )}
        </div>
    );
}
