"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Locale = 'en' | 'fr' | 'ar';

interface LocaleContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
    dir: 'ltr' | 'rtl';
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Import all messages statically
import en from '../../../messages/en.json';
import fr from '../../../messages/fr.json';
import ar from '../../../messages/ar.json';

const messages: Record<Locale, typeof en> = { en, fr, ar };

export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Load saved locale from localStorage
        const saved = localStorage.getItem('locale') as Locale | null;
        if (saved && ['en', 'fr', 'ar'].includes(saved)) {
            setLocaleState(saved);
            document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = saved;
        }
        setMounted(true);
    }, []);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('locale', newLocale);
        // Update document direction for RTL
        document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLocale;
    };

    // Helper to get nested translation by dot notation
    const t = (key: string): string => {
        const keys = key.split('.');
        // Use 'en' as fallback during SSR/before mount
        const currentLocale = mounted ? locale : 'en';
        let value: any = messages[currentLocale];
        for (const k of keys) {
            value = value?.[k];
        }
        return typeof value === 'string' ? value : key;
    };

    const dir = locale === 'ar' ? 'rtl' : 'ltr';

    // Always wrap in provider to ensure context is available
    return (
        <LocaleContext.Provider value={{ locale, setLocale, t, dir }}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within a LocaleProvider');
    }
    return context;
}
