import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for Degvora.",
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-[#121212] text-white p-8 md:p-16">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/" className="text-blue-400 hover:underline mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. What Are Cookies</h2>
          <p className="text-white/80 leading-relaxed">
            As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. How We Use Cookies</h2>
          <p className="text-white/80 leading-relaxed">
            We use cookies for a variety of reasons detailed below. Unfortunately, in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Third Party Cookies</h2>
          <p className="text-white/80 leading-relaxed">
            In some special cases we also use cookies provided by trusted third parties. This site uses Google AdSense which uses a DoubleClick cookie to serve more relevant ads across the web and limit the number of times that a given ad is shown to you.
          </p>
        </section>
      </div>
    </div>
  );
}
