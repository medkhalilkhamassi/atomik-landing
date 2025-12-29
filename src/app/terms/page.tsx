import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground antialiased selection:bg-accent/20 flex flex-col">
            <SiteHeader />

            <div className="flex-1 container mx-auto px-4 py-24 max-w-3xl">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl font-light tracking-tight mb-4">Terms of Service</h1>
                    <p className="text-muted-foreground">Last updated: December 29, 2025</p>
                </div>

                <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p className="mb-4">
                        Welcome to Atomik. By accessing or using our website, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Use of Service</h2>
                    <p className="mb-4">
                        Atomik is a platform connecting project specifications with developers for code generation and verification. You agree to use the service only for lawful purposes and in accordance with these Terms.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Intellectual Property</h2>
                    <p className="mb-4">
                        <strong>Client Ownership:</strong> You retain full ownership of the code and intellectual property for the projects you commission and pay for on Atomik, upon release of payment.
                    </p>
                    <p className="mb-4">
                        <strong>Platform Content:</strong> The Atomik website, branding, and underlying platform technology are owned by Atomik and protected by copyright and intellectual property laws.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Waitlist & User Accounts</h2>
                    <p className="mb-4">
                        Participation in our waitlist does not guarantee access to the platform. We reserve the right to accept or reject users at our discretion. You are responsible for maintaining the confidentiality of your information.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Limitation of Liability</h2>
                    <p className="mb-4">
                        Atomik is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Changes to Terms</h2>
                    <p className="mb-4">
                        We reserve the right to modify these terms at any time. Your continued use of the service following any changes content constitutes acceptance of those changes.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Contact</h2>
                    <p className="mb-4">
                        Questions about the Terms of Service should be sent to us at <a href="mailto:hello@atomik.dev" className="text-primary hover:underline">hello@atomik.dev</a>.
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
