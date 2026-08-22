import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Degvora.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#121212] text-white p-8 md:p-16">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/" className="text-blue-400 hover:underline mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p className="text-white/80 leading-relaxed">
            Welcome to Degvora. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Data We Collect</h2>
          <p className="text-white/80 leading-relaxed">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 text-white/80 space-y-2">
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Advertising</h2>
          <p className="text-white/80 leading-relaxed">
            We use third-party advertising companies to serve ads when you visit our Web site. These companies may use aggregated information (not including your name, address, email address or telephone number) about your visits to this and other Web sites in order to provide advertisements about goods and services of interest to you.
          </p>
          <p className="text-white/80 leading-relaxed">
            Google, as a third party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our sites and other sites on the Internet.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Contact Us</h2>
          <p className="text-white/80 leading-relaxed">
            If you have any questions about this privacy policy or our privacy practices, please contact us via our <Link href="/contact" className="text-blue-400 hover:underline">Contact page</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
