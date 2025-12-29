'use client';

export default function Footer() {
    return (
        <footer className="bg-background border-t border-border py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">

                <div className="text-center md:text-left">
                    <span className="text-lg font-bold text-foreground block">ATOMIK</span>
                    <span className="text-sm text-muted-foreground">Specs In → Code Out.</span>
                </div>

                <div className="flex gap-8 text-sm text-muted-foreground">
                    <a href="#" className="hover:text-foreground">Deck</a>
                    <a href="#" className="hover:text-foreground">Twitter</a>
                    <a href="#" className="hover:text-foreground">LinkedIn</a>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-muted-foreground">
                    <a href="mailto:hello@atomik.dev" className="hover:text-primary">hello@atomik.dev</a>

                    <div className="flex gap-4">
                        <a href="#" className="hover:text-foreground">Privacy</a>
                        <a href="#" className="hover:text-foreground">Terms</a>
                    </div>
                </div>

            </div>
            <div className="mt-8 text-center text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} Atomik Inc. All rights reserved.
            </div>
        </footer>
    );
}
