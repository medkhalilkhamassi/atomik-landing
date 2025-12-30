'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useLocale } from '@/lib/i18n/LocaleContext';

export default function FAQ() {
    const { t } = useLocale();

    const faqs = [
        {
            question: t('faq.q1'),
            answer: t('faq.a1')
        },
        {
            question: t('faq.q2'),
            answer: t('faq.a2')
        },
        {
            question: t('faq.q3'),
            answer: t('faq.a3')
        },
        {
            question: t('faq.q4'),
            answer: t('faq.a4')
        },
        {
            question: t('faq.q5'),
            answer: t('faq.a5')
        },
        {
            question: t('faq.q6'),
            answer: t('faq.a6')
        }
    ];

    return (
        <section id="faq" className="min-h-screen flex items-center justify-center bg-background py-24">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 w-full">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-16 text-center">
                    {t('faq.title')}
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

