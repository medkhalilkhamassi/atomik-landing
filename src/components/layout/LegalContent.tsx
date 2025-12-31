'use client';

import { useLocale } from '@/lib/i18n/LocaleContext';

export function PrivacyContent() {
    const { t } = useLocale();

    return (
        <div className="prose prose-invert prose-sm max-w-none">
            <h1 className="text-2xl font-bold text-foreground mb-6">{t('legal.privacy.title')}</h1>
            <p className="text-muted-foreground text-sm mb-4">{t('legal.privacy.lastUpdated')}</p>

            <section className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">{t('legal.privacy.section1Title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('legal.privacy.section1Content')}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">{t('legal.privacy.section2Title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('legal.privacy.section2Content')}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">{t('legal.privacy.section3Title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('legal.privacy.section3Content')}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">{t('legal.privacy.section4Title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('legal.privacy.section4Content')}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">{t('legal.privacy.section5Title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('legal.privacy.section5Content')}</p>
            </section>

            <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">{t('legal.privacy.contactTitle')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('legal.privacy.contactContent')}</p>
            </section>
        </div>
    );
}

export function TermsContent() {
    const { t } = useLocale();

    return (
        <div className="prose prose-invert prose-sm max-w-none">
            <h1 className="text-2xl font-bold text-foreground mb-6">{t('legal.terms.title')}</h1>
            <p className="text-muted-foreground text-sm mb-4">{t('legal.terms.lastUpdated')}</p>

            <section className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">{t('legal.terms.section1Title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('legal.terms.section1Content')}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">{t('legal.terms.section2Title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('legal.terms.section2Content')}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">{t('legal.terms.section3Title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('legal.terms.section3Content')}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">{t('legal.terms.section4Title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('legal.terms.section4Content')}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">{t('legal.terms.section5Title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('legal.terms.section5Content')}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">{t('legal.terms.section6Title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('legal.terms.section6Content')}</p>
            </section>

            <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">{t('legal.terms.contactTitle')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('legal.terms.contactContent')}</p>
            </section>
        </div>
    );
}
