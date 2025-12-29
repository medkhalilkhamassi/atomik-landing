"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { User, Mail, Building2, Briefcase, ArrowRight } from "lucide-react";
import { AnimatedFolder } from "@/components/3d-folder";

interface RideBookingFormProps extends React.HTMLAttributes<HTMLDivElement> {
    imageUrl?: string; // Optional now
    city?: string;
    onSearch: (details: {
        firstName: string;
        lastName: string;
        email: string;
        company: string;
        position: string;
    }) => void;
}

export const RideBookingForm = React.forwardRef<HTMLDivElement, RideBookingFormProps>(
    ({ className, imageUrl, city, onSearch, ...props }, ref) => {
        const [firstName, setFirstName] = React.useState("");
        const [lastName, setLastName] = React.useState("");
        const [email, setEmail] = React.useState("");
        const [company, setCompany] = React.useState("");
        const [position, setPosition] = React.useState("");

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            onSearch({ firstName, lastName, email, company, position });
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

        const holdings = [
            {
                id: "1",
                title: "",
                image: "/pdf.png",
                transparent: true
            },
            {
                id: "2",
                title: "",
                image: "/doc.png",
                transparent: true
            },
            {
                id: "3",
                title: "",
                image: "/ppt.png",
                transparent: true
            },
        ];

        return (
            <div
                className={cn("w-full max-w-7xl mx-auto p-4 lg:p-12", className)}
                ref={ref}
                {...props}
            >
                <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 items-center">
                    {/* Left Side: Contact Form */}
                    <motion.div
                        className="p-4 lg:p-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1 variants={itemVariants} className="text-4xl lg:text-6xl font-bold text-foreground mb-12 text-left leading-tight">
                            Ready to invest in the future ?
                        </motion.h1>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Contact Inputs */}
                            <motion.div variants={itemVariants} className="space-y-6">
                                {/* Name Fields */}
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="relative flex items-center border-b border-border/50 pb-4">
                                        <User className="h-5 w-5 text-muted-foreground mr-4" />
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none text-xl"
                                            aria-label="First Name"
                                        />
                                    </div>
                                    <div className="relative flex items-center border-b border-border/50 pb-4">
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none text-xl"
                                            aria-label="Last Name"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="relative flex items-center border-b border-border/50 pb-4">
                                    <Mail className="h-5 w-5 text-muted-foreground mr-4" />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none text-xl"
                                        aria-label="Email Address"
                                    />
                                </div>

                                {/* Company */}
                                <div className="relative flex items-center border-b border-border/50 pb-4">
                                    <Building2 className="h-5 w-5 text-muted-foreground mr-4" />
                                    <input
                                        type="text"
                                        placeholder="Company"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none text-xl"
                                        aria-label="Company"
                                    />
                                </div>

                                {/* Position */}
                                <div className="relative flex items-center border-b border-border/50 pb-4">
                                    <Briefcase className="h-5 w-5 text-muted-foreground mr-4" />
                                    <input
                                        type="text"
                                        placeholder="Position"
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}
                                        className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none text-xl"
                                        aria-label="Position"
                                    />
                                </div>
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div variants={itemVariants} className="flex items-center space-x-6 pt-8">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10"
                                >
                                    Submit
                                </button>
                            </motion.div>
                        </form>
                    </motion.div>

                    {/* Right Side: Animated Folder */}
                    <motion.div
                        className="hidden lg:flex w-full items-center justify-center p-8"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <AnimatedFolder
                            title="Leave us your contact for pitch deck"
                            projects={holdings}
                            className="bg-background/5 border-border/20"
                        />
                    </motion.div>
                </div>
            </div>
        );
    }
);

RideBookingForm.displayName = "RideBookingForm";
