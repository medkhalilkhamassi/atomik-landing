'use client';

export default function Manifesto() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-background border-y border-border py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center mb-24">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        The hiring process is broken.
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
                    {/* Card A: Founders */}
                    <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-semibold mb-4 text-foreground">Founders become PMs.</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Instead of building product, you're stuck doing technical interviews, babysitting deliverables, and managing delays. The result is broken code and burned runway.
                        </p>
                    </div>

                    {/* Card B: Developers */}
                    <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-semibold mb-4 text-foreground">Developers become salespeople.</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            You spend half your time writing unpaid proposals and chasing invoices. You face payment risks and ghosting clients instead of just shipping clean logic.
                        </p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-xl md:text-2xl font-bold text-foreground">
                        Atomik replaces the entire hiring process with a code delivery machine.
                    </p>
                </div>
            </div>
        </section>
    );
}
