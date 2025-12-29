"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight, Mail, ArrowLeft } from "lucide-react"
import SlideTextButton from "@/components/kokonutui/slide-text-button"
import { HeroGeometricBackground } from "@/components/ui/shape-landing-hero"
import { RideBookingForm } from "@/components/ui/ride-booking-form"

export function LetsWorkTogether() {
    const [isHovered, setIsHovered] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [isButtonHovered, setIsButtonHovered] = useState(false)
    const [mode, setMode] = useState<'waitlist' | 'investors'>('waitlist')

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
        }, 500)
    }

    const handleFinalAction = () => {
        // Placeholder
        console.log(`Action: ${mode}`)
    }

    const handleInvestorSearch = (details: any) => {
        console.log("Investor search:", details)
    }

    return (
        <section id="home" className="flex min-h-screen items-center justify-center px-6 overflow-hidden relative">
            <HeroGeometricBackground />
            <div className="relative flex flex-col items-center gap-12 w-full max-w-6xl z-10">
                {/* Success View (Overlay) */}
                <div
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                        opacity: showSuccess ? 1 : 0,
                        transform: showSuccess ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                        pointerEvents: showSuccess ? "auto" : "none",
                    }}
                >
                    {/* Back Arrow */}
                    <button
                        onClick={handleBack}
                        className="absolute top-0 left-0 lg:-left-12 z-20 p-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="size-6" />
                    </button>

                    {mode === 'investors' ? (
                        <div className="w-full h-full flex items-center justify-center scale-90 md:scale-100">
                            <RideBookingForm
                                imageUrl="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"
                                city="San Francisco, CA"
                                onSearch={handleInvestorSearch}
                                className="mt-4"
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
                                    Automated
                                </span>
                                <h3
                                    className="text-3xl font-light tracking-tight text-foreground transition-all duration-500 sm:text-4xl"
                                    style={{
                                        transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                                        opacity: showSuccess ? 1 : 0,
                                        transitionDelay: "200ms",
                                    }}
                                >
                                    The Future
                                </h3>
                            </div>

                            {/* Success Action Button */}
                            <button
                                onClick={handleFinalAction}
                                onMouseEnter={() => setIsButtonHovered(true)}
                                onMouseLeave={() => setIsButtonHovered(false)}
                                className="group relative flex items-center gap-4 transition-all duration-500 cursor-pointer"
                                style={{
                                    transform: showSuccess
                                        ? isButtonHovered
                                            ? "translateY(0) scale(1.02)"
                                            : "translateY(0) scale(1)"
                                        : "translateY(15px) scale(1)",
                                    opacity: showSuccess ? 1 : 0,
                                    transitionDelay: "150ms",
                                }}
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
                                        Enter Waitlist
                                    </span>
                                    <ArrowUpRight
                                        className="size-4 transition-all duration-500 sm:size-5"
                                        strokeWidth={1.5}
                                        style={{
                                            color: isButtonHovered ? "var(--background)" : "var(--foreground)",
                                        }}
                                    />
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
                                className="text-xs tracking-widest uppercase text-muted-foreground/50 transition-all duration-500"
                                style={{
                                    transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                                    opacity: showSuccess ? 1 : 0,
                                    transitionDelay: "450ms",
                                }}
                            >
                                Limited Spots
                            </span>
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
                        CLOSED ALPHA
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
                                    Ship real software
                                </span>
                            </span>
                            <span className="block overflow-hidden pb-4 -mt-2">
                                <span
                                    className="block text-muted-foreground/60 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75 will-change-transform"
                                    style={{ transform: isHovered && !isClicked ? "translateY(-10px)" : "translateY(0)" }}
                                >
                                    without the friction.
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
                                text="Join Waitlist"
                                hoverText="Get Early Access"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleClick('waitlist')
                                }}
                                variant="default"
                                className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[240px] cursor-pointer"
                            />
                            <SlideTextButton
                                text="Investors"
                                hoverText="Let's Connect"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
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
                        Atomik turns ideas into scoped, test-verified tasks and delivers production-ready code through vetted developers — faster, safer, and fully auditable.
                    </p>
                    {/* <span className="text-xs tracking-widest uppercase text-muted-foreground/60">hello@atomik.dev</span> */}
                </div>

            </div>
        </section>
    )
}
