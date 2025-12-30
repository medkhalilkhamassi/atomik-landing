"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { ArrowUpRight, Mail, ArrowLeft } from "lucide-react"
import SlideTextButton from "@/components/ui/buttons/SlideTextButton"
import { HeroGeometricBackground } from "@/components/sections/Hero/HeroGeometricBackground"
import { InvestorContactForm } from "@/components/forms/InvestorContactForm"
import { getAttributionFromLocation, type AttributionData } from "@/lib/attribution"
import { useLocale } from "@/lib/i18n/LocaleContext"

export function HeroSection() {
    const router = useRouter()
    const { t } = useLocale()
    const [isHovered, setIsHovered] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [isButtonHovered, setIsButtonHovered] = useState(false)
    const [mode, setMode] = useState<'waitlist' | 'investors'>('waitlist')

    // Analytics State
    const [ctaSource, setCtaSource] = useState("hero_primary")
    const [attribution, setAttribution] = useState<AttributionData>({})

    // Waitlist Form State
    const [email, setEmail] = useState("")
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState("")
    const emailInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleOpenWaitlist = () => {
            setCtaSource("header")
            handleClick('waitlist')
        }
        window.addEventListener('open-waitlist', handleOpenWaitlist)
        return () => window.removeEventListener('open-waitlist', handleOpenWaitlist)
    }, [])

    useEffect(() => {
        setAttribution(getAttributionFromLocation())
    }, [])

    useEffect(() => {
        if (showSuccess && mode === 'waitlist' && emailInputRef.current) {
            // Small delay to ensure transition fits
            setTimeout(() => {
                emailInputRef.current?.focus()
            }, 100)
        }
    }, [showSuccess, mode])

    const handleClick = (selectedMode: 'waitlist' | 'investors') => {
        setMode(selectedMode)
        setIsClicked(true)
        setTimeout(() => {
            setShowSuccess(true)
        }, 500)
    }

    const handleBack = () => {
        setShowSuccess(false)
        setTimeout(() => {
            setIsClicked(false)
            // Reset form state on back? Maybe not, to keep data.
            // setFormStatus('idle') 
        }, 500)
    }

    const handleFinalAction = () => {
        // Placeholder
        console.log(`Action: ${mode}`)
    }

    const handleInvestorSearch = (details: any) => {
        console.log("Investor search:", details)
    }

    const handleWaitlistSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormStatus('submitting')
        setErrorMessage("")

        try {
            const formData = new URLSearchParams()
            formData.append("form-name", "waitlist")
            formData.append("email", email)

            // Analytics Fields
            formData.append("cta_source", ctaSource)
            formData.append("submitted_at", new Date().toISOString())
            if (attribution.utm_source) formData.append("utm_source", attribution.utm_source)
            if (attribution.utm_medium) formData.append("utm_medium", attribution.utm_medium)
            if (attribution.utm_campaign) formData.append("utm_campaign", attribution.utm_campaign)
            if (attribution.utm_term) formData.append("utm_term", attribution.utm_term)
            if (attribution.utm_content) formData.append("utm_content", attribution.utm_content)
            if (attribution.referrer) formData.append("referrer", attribution.referrer)
            if (attribution.landing_path) formData.append("landing_path", attribution.landing_path)

            console.log("Submitting Waitlist:", Object.fromEntries(formData));

            const response = await fetch("/api/submit-to-sheet", {
                method: "POST",
                body: formData,
            })

            // In development, the POST might fail (405) because there's no handler.
            // On Netlify, it works.

            if (response.ok) {
                router.push("/success")
            } else {
                // Determine if we should treat specific errors as success for dev? 
                // No, sticking to strict check.
                setFormStatus('error')
                setErrorMessage("Something went wrong. Please try again.")
            }
        } catch (error) {
            setFormStatus('error')
            setErrorMessage("Network error. Please try again.")
        }
    }

    return (
        <section id="home" className="flex min-h-screen items-center justify-center px-6 overflow-hidden relative">
            <HeroGeometricBackground />
            <div className="relative flex flex-col items-center gap-12 w-full max-w-6xl z-10">
                {/* Success View (Overlay) */}
                <div
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                        opacity: showSuccess ? 1 : 0,
                        transform: showSuccess ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                        pointerEvents: showSuccess ? "auto" : "none",
                    }}
                >
                    {/* Back Arrow - Aligned to match RideBookingForm (p-12 - ml-2 = left-10) */}
                    {mode !== 'investors' && (
                        <button
                            onClick={handleBack}
                            className="absolute top-4 left-2 lg:top-12 lg:left-10 z-20 p-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="size-6" />
                        </button>
                    )}

                    {mode === 'investors' ? (
                        <div className="w-full h-full flex items-center justify-center scale-90 md:scale-100">
                            <InvestorContactForm
                                onBack={handleBack}
                                className="mt-4"
                                ctaSource={ctaSource}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-8">
                            <div className="flex flex-col items-center gap-2">
                                <span
                                    className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground transition-all duration-500"
                                    style={{
                                        transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                                        opacity: showSuccess ? 1 : 0,
                                        transitionDelay: "100ms",
                                    }}
                                >
                                    {t('hero.join')}
                                </span>
                                <h3
                                    className="text-3xl font-light tracking-tight text-foreground transition-all duration-500 sm:text-4xl"
                                    style={{
                                        transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                                        opacity: showSuccess ? 1 : 0,
                                        transitionDelay: "200ms",
                                    }}
                                >
                                    {t('hero.theFuture')}
                                </h3>
                            </div>

                            {/* Waitlist Form */}
                            {formStatus === 'success' ? (
                                <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <h3 className="text-2xl font-light text-foreground mb-4">{t('hero.youreOnList')}</h3>
                                    <p className="text-muted-foreground mb-6">{t('hero.checkInbox')}</p>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText("https://atomik.dev");
                                            // Optional: show copied toast
                                        }}
                                        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
                                    >
                                        {t('hero.shareAtomik')}
                                    </button>
                                </div>
                            ) : (
                                <form
                                    name="waitlist"
                                    method="POST"
                                    action="/success"
                                    data-netlify="true"
                                    data-netlify-honeypot="bot-field"
                                    onSubmit={handleWaitlistSubmit}
                                    className="relative flex flex-col items-center gap-6 w-full max-w-sm"
                                    style={{
                                        transform: showSuccess ? "translateY(0)" : "translateY(15px)",
                                        opacity: showSuccess ? 1 : 0,
                                        transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1) 150ms",
                                    }}
                                >
                                    <input type="hidden" name="form-name" value="waitlist" />
                                    {/* Analytics Inputs */}
                                    <input type="hidden" name="cta_source" value={ctaSource} />
                                    <input type="hidden" name="utm_source" value={attribution.utm_source || ""} />
                                    <input type="hidden" name="utm_medium" value={attribution.utm_medium || ""} />
                                    <input type="hidden" name="utm_campaign" value={attribution.utm_campaign || ""} />
                                    <input type="hidden" name="utm_term" value={attribution.utm_term || ""} />
                                    <input type="hidden" name="utm_content" value={attribution.utm_content || ""} />
                                    <input type="hidden" name="referrer" value={attribution.referrer || ""} />
                                    <input type="hidden" name="landing_path" value={attribution.landing_path || ""} />

                                    <p className="hidden">
                                        <label>
                                            Don’t fill this out: <input name="bot-field" />
                                        </label>
                                    </p>

                                    <div className="relative w-full">
                                        <input
                                            ref={emailInputRef}
                                            type="email"
                                            name="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@work.com"
                                            className="w-full h-12 bg-transparent border-b border-border text-center text-lg placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
                                            disabled={formStatus === 'submitting'}
                                        />
                                    </div>

                                    {errorMessage && (
                                        <p className="text-destructive text-sm" role="alert">{errorMessage}</p>
                                    )}

                                    <button
                                        type="submit"
                                        onMouseEnter={() => setIsButtonHovered(true)}
                                        onMouseLeave={() => setIsButtonHovered(false)}
                                        disabled={formStatus === 'submitting'}
                                        className="group relative flex items-center gap-4 transition-all duration-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <div
                                            className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
                                            style={{
                                                transform: isButtonHovered ? "scaleX(0)" : "scaleX(1)",
                                                opacity: isButtonHovered ? 0 : 0.5,
                                            }}
                                        />
                                        <div
                                            className="relative flex items-center gap-3 overflow-hidden rounded-full border px-6 py-3 transition-all duration-500 sm:px-8 sm:py-4"
                                            style={{
                                                borderColor: isButtonHovered ? "var(--foreground)" : "var(--border)",
                                                backgroundColor: isButtonHovered ? "var(--foreground)" : "transparent",
                                                boxShadow: isButtonHovered ? "0 0 30px rgba(0,0,0,0.1), 0 10px 40px rgba(0,0,0,0.08)" : "none",
                                            }}
                                        >
                                            <Mail
                                                className="size-4 transition-all duration-500 sm:size-5"
                                                strokeWidth={1.5}
                                                style={{
                                                    color: isButtonHovered ? "var(--background)" : "var(--foreground)",
                                                }}
                                            />
                                            <span
                                                className="text-sm font-medium tracking-wide transition-all duration-500 sm:text-base"
                                                style={{
                                                    color: isButtonHovered ? "var(--background)" : "var(--foreground)",
                                                }}
                                            >
                                                {formStatus === 'submitting' ? t('hero.joining') : t('hero.enterWaitlist')}
                                            </span>
                                            {formStatus !== 'submitting' && (
                                                <ArrowUpRight
                                                    className="size-4 transition-all duration-500 sm:size-5"
                                                    strokeWidth={1.5}
                                                    style={{
                                                        color: isButtonHovered ? "var(--background)" : "var(--foreground)",
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <div
                                            className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
                                            style={{
                                                transform: isButtonHovered ? "scaleX(0)" : "scaleX(1)",
                                                opacity: isButtonHovered ? 0 : 0.5,
                                            }}
                                        />
                                    </button>

                                    <span
                                        className="text-xs tracking-widest uppercase text-muted-foreground/50"
                                    >
                                        {t('hero.limitedSpots')}
                                    </span>
                                </form>
                            )}
                        </div>
                    )}
                </div>

                {/* Initial View - Restoring Template Feel */}
                {/* 1. Badge */}
                <div
                    className="flex items-center gap-3 transition-all duration-500"
                    style={{
                        opacity: isClicked ? 0 : 1,
                        transform: isClicked ? "translateY(-20px)" : "translateY(0)",
                        pointerEvents: isClicked ? "none" : "auto",
                    }}
                >
                    <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                        <span className="relative inline-flex size-2 rounded-full bg-red-500" />
                    </span>
                    <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                        {t('hero.badge')}
                    </span>
                </div>

                {/* 2. Main Interaction Area (Text + Buttons) */}
                <div
                    className="relative flex flex-col items-center gap-8"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        pointerEvents: isClicked ? "none" : "auto",
                    }}
                >
                    {/* Text and Lines Wrapper */}
                    <div className="relative">
                        <h2 className="text-center text-5xl font-light tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl transition-all duration-700 leading-[1.1]"
                            style={{
                                opacity: isClicked ? 0 : 1,
                                transform: isClicked ? "translateY(-40px) scale(0.95)" : "translateY(0) scale(1)",
                            }}
                        >
                            <span className="block overflow-hidden pb-4">
                                <span
                                    className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                                    style={{ transform: isHovered && !isClicked ? "translateY(-10px)" : "translateY(0)" }}
                                >
                                    {t('hero.title1')}
                                </span>
                            </span>
                            <span className="block overflow-hidden pb-4 -mt-2">
                                <span
                                    className="block text-muted-foreground/60 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75 will-change-transform"
                                    style={{ transform: isHovered && !isClicked ? "translateY(-10px)" : "translateY(0)" }}
                                >
                                    {t('hero.title2')}
                                </span>
                            </span>
                        </h2>

                        {/* Decorative lines centered relative to text */}
                        <div className="absolute -left-8 top-1/2 -translate-y-1/2 sm:-left-16 pointer-events-none">
                            <div
                                className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
                                style={{
                                    transform: isClicked ? "scaleX(0) translateX(-20px)" : isHovered ? "scaleX(1.5)" : "scaleX(1)",
                                    opacity: isClicked ? 0 : isHovered ? 1 : 0.5,
                                }}
                            />
                        </div>
                        <div className="absolute -right-8 top-1/2 -translate-y-1/2 sm:-right-16 pointer-events-none">
                            <div
                                className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
                                style={{
                                    transform: isClicked ? "scaleX(0) translateX(20px)" : isHovered ? "scaleX(1.5)" : "scaleX(1)",
                                    opacity: isClicked ? 0 : isHovered ? 1 : 0.5,
                                }}
                            />
                        </div>
                    </div>

                    {/* Scale effect container for buttons (replaces the circular button) */}
                    <div
                        className="relative transition-all duration-700 ease-out"
                        style={{
                            transform: isClicked ? "scale(0.8) translateY(20px)" : isHovered ? "scale(1.05)" : "scale(1)",
                            opacity: isClicked ? 0 : 1,
                            filter: isClicked ? "blur(10px)" : "none",
                        }}
                    >
                        <div className="flex flex-col sm:flex-row items-center gap-4 cursor-default">
                            <SlideTextButton
                                text={t('hero.joinWaitlist')}
                                hoverText={t('hero.getEarlyAccess')}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setCtaSource("hero_primary")
                                    handleClick('waitlist')
                                }}
                                variant="default"
                                className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[240px] cursor-pointer"
                            />
                            <SlideTextButton
                                text={t('hero.investors')}
                                hoverText={t('hero.letsConnect')}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setCtaSource("hero_secondary")
                                    handleClick('investors')
                                }}
                                variant="ghost"
                                className="min-w-[240px] cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer / Subtext */}
                <div
                    className="mt-8 flex flex-col items-center gap-4 text-center transition-all duration-500 delay-100"
                    style={{
                        opacity: isClicked ? 0 : 1,
                        transform: isClicked ? "translateY(20px)" : "translateY(0)",
                        pointerEvents: isClicked ? "none" : "auto",
                    }}
                >
                    <p className="max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed">
                        {t('hero.description')}
                    </p>
                    {/* <span className="text-xs tracking-widest uppercase text-muted-foreground/60">hello@atomik.dev</span> */}
                </div>

            </div >
        </section >
    )
}

