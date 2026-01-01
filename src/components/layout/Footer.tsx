'use client';

import { useLocale } from '@/lib/i18n/LocaleContext';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { LinkCard } from "@/components/ui/link-card";
import { PrivacyContent, TermsContent } from './LegalContent';

export default function Footer() {
    const { t } = useLocale();

    return (
        <footer className="bg-background py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">

                <div className="text-center md:text-left">
                    <span className="text-lg font-bold text-foreground block">ATOMIK</span>
                    <span className="text-sm text-muted-foreground">{t('footer.tagline')}</span>
                </div>

                {/* Social links removed */}

                <div className="flex gap-4 text-sm text-muted-foreground">
                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="hover:text-foreground transition-colors cursor-pointer">
                                {t('footer.privacy')}
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle className="sr-only">{t('footer.privacy')}</DialogTitle>
                            <DialogDescription className="sr-only">
                                Privacy policy for Atomik
                            </DialogDescription>
                            <PrivacyContent />
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="hover:text-foreground transition-colors cursor-pointer">
                                {t('footer.terms')}
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle className="sr-only">{t('footer.terms')}</DialogTitle>
                            <DialogDescription className="sr-only">
                                Terms of service for Atomik
                            </DialogDescription>
                            <TermsContent />
                        </DialogContent>
                    </Dialog>
                </div>

            </div>
            <div className="mt-8 text-center text-xs text-muted-foreground">
                {t('footer.copyright')}
            </div>
        </footer>
    );
}

