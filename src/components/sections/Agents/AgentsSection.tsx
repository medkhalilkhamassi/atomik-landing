'use client';

import { TestimonialSlider, type Review } from '@/components/sections/Agents/TestimonialSlider';
import { useLocale } from '@/lib/i18n/LocaleContext';

export default function Agents() {
    const { t } = useLocale();

    const agents: Review[] = [
        {
            id: 1,
            name: "Mary",
            affiliation: t('agents.analystRole'),
            quote: t('agents.analystQuote'),
            imageSrc: "/images/mary-v3.png",
            thumbnailSrc: "/images/mary-v3.png",
        },
        {
            id: 2,
            name: "John",
            affiliation: t('agents.pmRole'),
            quote: t('agents.pmQuote'),
            imageSrc: "/images/john-v3.png",
            thumbnailSrc: "/images/john-v3.png",
        },
        {
            id: 3,
            name: "Sally",
            affiliation: t('agents.designerRole'),
            quote: t('agents.designerQuote'),
            imageSrc: "/images/sally-v3.png",
            thumbnailSrc: "/images/sally-v3.png",
        },
        {
            id: 4,
            name: "Winston",
            affiliation: t('agents.devopsRole'),
            quote: t('agents.devopsQuote'),
            imageSrc: "/images/winston-v3.png",
            thumbnailSrc: "/images/winston-v3.png",
        },
        {
            id: 5,
            name: "Murat",
            affiliation: t('agents.qaRole'),
            quote: t('agents.qaQuote'),
            imageSrc: "/images/murat-v3.png",
            thumbnailSrc: "/images/murat-v3.png",
        },
        {
            id: 6,
            name: "Amelia",
            affiliation: t('agents.securityRole'),
            quote: t('agents.securityQuote'),
            imageSrc: "/images/amelia-v3.png",
            thumbnailSrc: "/images/amelia-v3.png",
        }
    ];

    return (
        <section id="agents" className="min-h-screen flex items-center justify-center bg-background py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {t('agents.title')}
                    </h2>
                    <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('agents.subtitle')}
                    </p>
                </div>

                <TestimonialSlider reviews={agents} autoplay={true} />
            </div>
        </section>
    );
}

