"use client"

import Link from "next/link"
import { ArrowLeft, Check, Copy, CheckCircle2 } from "lucide-react"
import { HeroGeometricBackground } from "@/components/ui/shape-landing-hero"
import { useState } from "react"
import { Metadata } from "next"

// Note: Metadata export is not supported in "use client" components in the same file for Next.js app dir normally,
// but for a simple page usually we separate them. However, since I need "use client" for the copy button, 
// I will treat this as a client component page. 
// Actually, to add metadata in App Router for a client component page, strictly speaking we should have a layout or separate default export.
// But for simplicity in this prompt, I'll stick to just the component. The user asked for metadata.
// I'll add a layout.tsx in the success folder for metadata to avoid "use client" conflict if I were to export metadata here.

export default function SuccessPage() {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText("https://atomik.dev")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
            <HeroGeometricBackground />

            <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* Icon */}
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                    <div className="relative bg-primary/10 p-4 rounded-full border border-primary/20 text-primary">
                        <Check className="size-8 sm:size-10" />
                    </div>
                </div>

                {/* Text */}
                <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-foreground">
                        You&apos;re on the waitlist.
                    </h1>
                    <p className="text-muted-foreground text-lg sm:text-xl">
                        We&apos;ll email you when Atomik is ready.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                    <Link
                        href="/"
                        className="group relative flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-background/50 hover:bg-muted/50 transition-all duration-300"
                    >
                        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Home</span>
                    </Link>

                    <button
                        onClick={handleCopy}
                        className="group relative flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 font-medium cursor-pointer"
                    >
                        {copied ? (
                            <>
                                <CheckCircle2 className="size-4 text-green-500" />
                                <span>Link Copied</span>
                            </>
                        ) : (
                            <>
                                <Copy className="size-4" />
                                <span>Share Atomik</span>
                            </>
                        )}
                    </button>
                </div>

            </div>
        </main>
    )
}
