"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, RefreshCw, Scale, Globe } from "lucide-react";

export default function PrivacyPolicy() {
  const currentYear = new Date().getFullYear();

  const policySections = [
    {
      icon: <Eye className="w-5 h-5 text-[#E9C349]" />,
      title: "1. Information We Collect",
      content:
        "We collect information you explicitly provide when interacting with our platform features, such as matching challenges and trial registration profiles. This includes your full name, contact number, age, squad configurations, and football experience metrics.",
    },
    {
      icon: <Shield className="w-5 h-5 text-[#E9C349]" />,
      title: "2. How We Use Your Data",
      content:
        "The parameters collected are processed to coordinate match logistics, verify slot bookings, handle team selection pipelines, and secure home turf scheduling grids. We do not sell, rent, or trade your personal tracking vectors with third-party marketing brokers.",
    },
    {
      icon: <Globe className="w-5 h-5 text-[#E9C349]" />,
      title: "3. Third-Party Redirection Threads",
      content:
        "Our system interfaces directly with external communication hubs like the WhatsApp API thread handler to safely forward booking dispatches. Once redirected off-platform, data transmission parameters fall under the native governance rules of the respective network provider.",
    },
    {
      icon: <Lock className="w-5 h-5 text-[#E9C349]" />,
      title: "4. Data Retention & Protection",
      content:
        "We implement advanced serverless structure security patterns and data encryption loops to safeguard your identity. Administrative logs are retained strictly as long as necessary to maintain active club database records and secure scheduling verification metrics.",
    },
    {
      icon: <Scale className="w-5 h-5 text-[#E9C349]" />,
      title: "5. Your Privacy Rights",
      content:
        "You retain full authority over your data. At any given time, you can request full disclosure of the personal indicators we hold, demand immediate profile erasure, or restrict data mapping loops by getting in touch with our core operational workspace team.",
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-[#E9C349]" />,
      title: "6. Updates To This Policy",
      content:
        "We reserve the right to modify this safety layout loop at any interval to align with new legal matrices or updated web features. The latest revision timestamp will always remain dynamically visible at the top edge of this viewport frame.",
    },
  ];

  return (
    <main className="min-h-screen w-full text-white px-4 py-16 md:py-24 overflow-hidden relative">
      {/* Fixed Background Image for all devices */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.85),rgba(0,0,0,0.99)),url('/backgroundPicHero.png')] bg-cover bg-center bg-no-repeat" />
      {/* Background ambient spotlight glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[95vw] md:w-[80vw] h-[40vh] bg-[#E9C349]/5 blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col gap-10 md:w-[75vw]">
        {/* Section Heading */}
        <div className="text-center md:text-left border-b border-white/5 pb-6">
          <span className="text-[#E9C349] font-black italic text-xs md:text-sm uppercase tracking-widest mb-1 block">
            Compliance & Transparency
          </span>
          <h1 className="font-extrabold italic text-4xl md:text-6xl tracking-tighter uppercase bg-gradient-to-r from-[#E9C349] via-[#FFF9D2] to-[#E9C349] text-transparent bg-clip-text drop-shadow-md inline-block pr-2">
            PRIVACY POLICY
          </h1>
          <p className="text-xs sm:text-sm font-mono text-gray-500 uppercase font-bold tracking-wider mt-2">
            Last Updated: May {currentYear}
          </p>
        </div>

        {/* Introduction Text Block */}
        <div className="bg-[#050505]/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 md:p-6 text-sm text-gray-400 font-medium leading-relaxed">
          At Odyssey FC, we are firmly committed to maintaining your trust and
          safeguarding your digital footprint. This Privacy Policy documents
          exactly how our web nodes ingest, structure, process, and protect the
          data you dispatch across our challenge loops and squad portals.
        </div>

        {/* Privacy Sections Grid */}
        <div className="flex flex-col gap-6 w-full">
          {policySections.map((sec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                delay: idx * 0.05,
                type: "spring",
                stiffness: 150,
                damping: 20,
              }}
              className="bg-[#050505]/40 backdrop-blur-2xl p-5 md:p-8 rounded-2xl border border-white/5 hover:border-[#E9C349]/20 transition-colors duration-300 flex gap-4 items-start"
            >
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 shrink-0">
                {sec.icon}
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-black text-base sm:text-lg uppercase italic tracking-tight text-white group-hover:text-[#E9C349] transition-colors">
                  {sec.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-medium">
                  {sec.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Policy Footer / Contact Notice */}
        <div className="text-center border-t border-white/5 pt-8 mt-4 text-xs sm:text-sm text-gray-500 font-medium">
          <p>
            Have questions regarding our data containment rules or secure server
            loops?
          </p>
          <p className="mt-1">
            Reach out directly to our administration core via the{" "}
            <span className="text-[#E9C349] font-bold underline cursor-pointer hover:text-white transition-colors">
              WhatsApp Support Channel
            </span>
            .
          </p>
          <p className="text-[10px] uppercase font-mono tracking-widest mt-8 opacity-40">
            © {currentYear} Odyssey FC. All Rights Reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
