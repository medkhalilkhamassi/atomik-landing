"use client";

import { useLocale, type Locale } from '@/lib/i18n/LocaleContext';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const languages: { code: Locale; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

export function LanguageSwitcher() {
    const { locale, setLocale } = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLang = languages.find((l) => l.code === locale) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent/50"
                aria-label="Change language"
            >
                <Globe className="size-4" />
                <span className="hidden sm:inline">{currentLang.flag}</span>
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 py-2 bg-background border border-border rounded-lg shadow-lg min-w-[140px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                setLocale(lang.code);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-accent/50 ${locale === lang.code ? 'text-foreground font-medium' : 'text-muted-foreground'
                                }`}
                        >
                            <span>{lang.flag}</span>
                            <span>{lang.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
