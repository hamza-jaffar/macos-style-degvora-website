import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions for Degvora.",
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#121212] text-white p-8 md:p-16">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/" className="text-blue-400 hover:underline mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p className="text-white/80 leading-relaxed">
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Use License</h2>
          <p className="text-white/80 leading-relaxed">
            Permission is granted to temporarily download one copy of the materials (information or software) on Degvora's website for personal, non-commercial transitory viewing only.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Disclaimer</h2>
          <p className="text-white/80 leading-relaxed">
            The materials on Degvora's website are provided on an 'as is' basis. Degvora makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>
      </div>
    </div>
  );
}
