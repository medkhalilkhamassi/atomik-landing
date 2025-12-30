
import { useRouter } from "next/navigation";
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getAttributionFromLocation, type AttributionData } from "@/lib/attribution";
import { User, Mail, Building2, Briefcase, Code2, Users, ShieldCheck, Activity, BarChart3, ArrowRight, ArrowLeft } from "lucide-react";

interface InvestorContactFormProps extends React.HTMLAttributes<HTMLDivElement> {
    onBack?: () => void;
    ctaSource?: string;
}

export const InvestorContactForm = React.forwardRef<HTMLDivElement, InvestorContactFormProps>(
    ({ className, onBack, ctaSource = "unknown", ...props }, ref) => {
        const router = useRouter();
        const firstNameRef = React.useRef<HTMLInputElement>(null);

        // State
        const [firstName, setFirstName] = React.useState("");
        const [lastName, setLastName] = React.useState("");
        const [email, setEmail] = React.useState("");
        const [company, setCompany] = React.useState("");
        const [position, setPosition] = React.useState("");
        const [attribution, setAttribution] = React.useState<AttributionData>({});

        const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
        const [error, setError] = React.useState("");

        // Tracking helper
        const trackEvent = (name: string, data?: any) => {
            console.log(`[Tracking] ${name} `, data);
            // Dispatch standard event for any listeners
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent(name, { detail: data }));
            }
        };

        React.useEffect(() => {
            trackEvent('investor_snapshot_view', { source: 'overlay' });
            setAttribution(getAttributionFromLocation());
        }, []);

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setError("");
            setStatus('submitting');
            trackEvent('investor_form_submit_start');

            // Basic Validation
            if (!firstName || !lastName || !email || !company) {
                setError("Please fill in all required fields.");
                setStatus('error');
                return;
            }

            try {
                const formData = new FormData();
                formData.append("form-name", "investor-contact");
                formData.append("firstName", firstName);
                formData.append("lastName", lastName);
                formData.append("email", email);
                formData.append("company", company);
                formData.append("position", position);

                // Analytics Fields
                formData.append("cta_source", ctaSource);
                formData.append("submitted_at", new Date().toISOString());
                if (attribution.utm_source) formData.append("utm_source", attribution.utm_source);
                if (attribution.utm_medium) formData.append("utm_medium", attribution.utm_medium);
                if (attribution.utm_campaign) formData.append("utm_campaign", attribution.utm_campaign);
                if (attribution.utm_term) formData.append("utm_term", attribution.utm_term);
                if (attribution.utm_content) formData.append("utm_content", attribution.utm_content);
                if (attribution.referrer) formData.append("referrer", attribution.referrer);
                if (attribution.landing_path) formData.append("landing_path", attribution.landing_path);

                // Submit to Netlify Function → Google Sheets
                const response = await fetch("/api/submit-to-sheet", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    trackEvent('investor_form_submit_success');
                    router.push("/success?type=investor");
                } else {
                    setStatus('error');
                    setError("Something went wrong. Please try again.");
                    trackEvent('investor_form_submit_error', { error: 'response_not_ok' });
                }
            } catch (err) {
                setStatus('error');
                setError("Network error. Please try again.");
                trackEvent('investor_form_submit_error', { error: 'network' });
            }
        };



        const focusForm = () => {
            if (firstNameRef.current) {
                firstNameRef.current.focus();
                firstNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };

        const containerVariants = {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
        };

        const itemVariants = {
            hidden: { y: 20, opacity: 0 },
            visible: {
                y: 0,
                opacity: 1,
                transition: { type: "spring" as const, stiffness: 100 },
            },
        };

        return (
            <div
                className={cn("w-full max-w-7xl mx-auto p-4 lg:p-12", className)}
                ref={ref}
                {...props}
            >
                {/* 
                  Hidden form for Netlify detection - Handled in layout.tsx
                */}

                <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16">
                    {/* Left Side: Contact Form - Order 2 on mobile to show snapshot first */}
                    <motion.div
                        className="order-2 lg:order-1 flex flex-col h-full"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {onBack && (
                            <button
                                onClick={onBack}
                                className="mb-6 p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Go back"
                            >
                                <ArrowLeft className="size-6" />
                            </button>
                        )}
                        <motion.h1 variants={itemVariants} className="text-3xl lg:text-5xl font-light tracking-tight text-foreground mb-8 text-left leading-tight">
                            Ready to invest in the future?
                        </motion.h1>

                        <motion.form
                            name="investor-contact"
                            method="POST"
                            data-netlify="true"
                            data-netlify-honeypot="bot-field"
                            action="/success?type=investor"
                            onSubmit={handleSubmit}
                            className="space-y-8 flex-1 flex flex-col"
                            variants={itemVariants}
                        >
                            <input type="hidden" name="form-name" value="investor-contact" />
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

                            {/* Contact Inputs */}
                            <motion.div variants={itemVariants} className="space-y-6">
                                {/* Name Fields */}
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="relative flex items-center border-b border-border/50 pb-4">
                                        <User className="h-5 w-5 text-muted-foreground mr-4" />
                                        <label htmlFor="investor-firstName" className="sr-only">First Name</label>
                                        <input
                                            ref={firstNameRef}
                                            id="investor-firstName"
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name *"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm text-lg"
                                            required
                                            autoComplete="given-name"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="relative flex items-center border-b border-border/50 pb-4">
                                        <label htmlFor="investor-lastName" className="sr-only">Last Name</label>
                                        <input
                                            id="investor-lastName"
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name *"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm text-lg"
                                            required
                                            autoComplete="family-name"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="relative flex items-center border-b border-border/50 pb-4">
                                    <Mail className="h-5 w-5 text-muted-foreground mr-4" />
                                    <label htmlFor="investor-email" className="sr-only">Email Address</label>
                                    <input
                                        id="investor-email"
                                        type="email"
                                        name="email"
                                        placeholder="Email Address *"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm text-lg"
                                        required
                                        autoComplete="email"
                                    />
                                </div>

                                {/* Company */}
                                <div className="relative flex items-center border-b border-border/50 pb-4">
                                    <Building2 className="h-5 w-5 text-muted-foreground mr-4" />
                                    <label htmlFor="investor-company" className="sr-only">Company</label>
                                    <input
                                        id="investor-company"
                                        type="text"
                                        name="company"
                                        placeholder="Company *"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm text-lg"
                                        required
                                        autoComplete="organization"
                                    />
                                </div>

                                {/* Position */}
                                <div className="relative flex items-center border-b border-border/50 pb-4">
                                    <Briefcase className="h-5 w-5 text-muted-foreground mr-4" />
                                    <label htmlFor="investor-position" className="sr-only">Position</label>
                                    <input
                                        id="investor-position"
                                        type="text"
                                        name="position"
                                        placeholder="Position"
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}
                                        className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm text-lg"
                                        autoComplete="organization-title"
                                    />
                                </div>

                                {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}

                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div variants={itemVariants} className="flex items-center space-x-6 pt-8 mt-auto">
                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10"
                                >
                                    {status === 'submitting' ? 'Sending...' : 'Request Deck'}
                                </button>
                            </motion.div>
                        </motion.form>

                    </motion.div>

                    <motion.div
                        className="order-1 lg:order-2 w-full pt-4 lg:pt-36 flex flex-col h-full"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="p-4 lg:p-0 flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                                    <BarChart3 className="size-5" />
                                </div>
                                <h3 className="text-lg font-medium text-foreground tracking-tight">Investor Snapshot</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        <Code2 className="size-3.5" />
                                        <span>Product</span>
                                    </div>
                                    <p className="text-sm lg:text-base text-foreground/90 pl-5.5">
                                        Specs in → code out for product teams
                                    </p>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        <Users className="size-3.5" />
                                        <span>ICP</span>
                                    </div>
                                    <p className="text-sm lg:text-base text-foreground/90 pl-5.5">
                                        Founders, product teams shipping MVPs
                                    </p>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        <ShieldCheck className="size-3.5" />
                                        <span>Differentiator</span>
                                    </div>
                                    <p className="text-sm lg:text-base text-foreground/90 pl-5.5">
                                        Scoped, test-verified tasks; agents that execute
                                    </p>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        <Activity className="size-3.5" />
                                        <span>Status</span>
                                    </div>
                                    <div className="flex items-center gap-2 pl-5.5">
                                        <span className="relative flex size-2">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                                            <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                                        </span>
                                        <p className="text-sm lg:text-base text-foreground/90">
                                            Private beta / waitlist
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-8 flex justify-start">
                                <a
                                    href="https://calendly.com/khamassimohamedkhalil/new-meeting"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackEvent('investor_book_intro_click')}
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-14 px-10 gap-2"
                                >
                                    <span>Book Intro</span>
                                    <ArrowRight className="size-4" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }
);

InvestorContactForm.displayName = "InvestorContactForm";
