'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/i18n/LocaleContext';

export default function Footer() {
    const { t } = useLocale();

    return (
        <footer className="bg-background py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">

                <div className="text-center md:text-left">
                    <span className="text-lg font-bold text-foreground block">ATOMIK</span>
                    <span className="text-sm text-muted-foreground">{t('footer.tagline')}</span>
                </div>

                <div className="flex gap-8 text-sm text-muted-foreground">
                    <a href="mailto:hello@atomik.dev?subject=Atomik%20Deck%20Request" className="hover:text-foreground transition-colors">{t('footer.deck')}</a>
                    <span title="Coming Soon" className="cursor-not-allowed opacity-50">Twitter</span>
                    <span title="Coming Soon" className="cursor-not-allowed opacity-50">LinkedIn</span>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-muted-foreground">
                    <a href="mailto:hello@atomik.dev" className="hover:text-primary transition-colors">hello@atomik.dev</a>

                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">{t('footer.privacy')}</Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">{t('footer.terms')}</Link>
                    </div>
                </div>

            </div>
            <div className="mt-8 text-center text-xs text-muted-foreground">
                {t('footer.copyright')}
            </div>
        </footer>
    );
}

