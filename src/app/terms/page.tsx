"use client";

import { motion } from "framer-motion";
import {
  Scale,
  Swords,
  DollarSign,
  Ban,
  ShieldAlert,
  FileText,
} from "lucide-react";

export default function TermsAndConditions() {
  const currentYear = new Date().getFullYear();

  const termsSections = [
    {
      icon: <Swords className="w-5 h-5 text-[#E9C349]" />,
      title: "1. Match Challenge System",
      content:
        "By dispatching a battle challenge via our platform portal, your squad explicitly agrees to match criteria terms under a locked 6 v 6 format. Odyssey FC management retains absolute authority to accept, decline, or reschedule incoming fixture proposals based on squad availability and pitch distribution.",
    },
    {
      icon: <DollarSign className="w-5 h-5 text-[#E9C349]" />,
      title: "2. Slot Booking & Financial Regulations",
      content:
        "Challenger squads must deposit a strict advance slot booking fee of 500 BDT within the specified window to finalize the reservation. This booking allocation fee is non-refundable if your team fails to appear or cancels less than 24 hours prior to the locked kickoff time.",
    },
    {
      icon: <Scale className="w-5 h-5 text-[#E9C349]" />,
      title: "3. Home Turf Pitch Conduct",
      content:
        "All matches are hosted at Kick Zone (Mirpur 12, Eastern Housing, Dhaka). Challenger teams are fully expected to respect field properties, show sportsmanship, and arrive at least 15 minutes before the scheduled time slot. Rough play, verbal abuse, or property destruction will result in an immediate match forfeit and permanent arena bans.",
    },
    {
      icon: <Ban className="w-5 h-5 text-[#E9C349]" />,
      title: "4. Liability Limitation Disclaimer",
      content:
        "Odyssey FC and our partner home grounds (Kick Zone) hold no liability for personal athletic injuries, equipment loss, or gear damage incurred during active gameplay loops. Participating players assume full physical responsibility by setting foot on the match grid.",
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-[#E9C349]" />,
      title: "5. Platform & Roster Integrity",
      content:
        "Any attempts to inject scraping automations, exploit routing nodes, or misrepresent player indicators/squad identities on this interface will result in a total termination of your team's capability to register fixture challenges across our active servers.",
    },
    {
      icon: <FileText className="w-5 h-5 text-[#E9C349]" />,
      title: "6. Governing Regulations & Modifications",
      content:
        "These terms operate under standard community governance frameworks of Dhaka, Bangladesh. We reserve the right to append or transition these rules at any chosen interval, and continued platform interaction implies complete compliance with the updated matrix.",
    },
  ];

  return (
    <main className="bg-[linear-gradient(to_bottom,rgba(0,0,0,0.85),rgba(0,0,0,0.99)),url('/backgroundPicHero.png')] bg-cover bg-center bg-no-repeat bg-fixed min-h-screen w-full text-white px-4 py-16 md:py-24 overflow-hidden relative">
      {/* Background ambient spotlight glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[95vw] md:w-[80vw] h-[40vh] bg-[#E9C349]/5 blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col gap-10 md:w-[75vw]">
        {/* Section Heading */}
        <div className="text-center md:text-left border-b border-white/5 pb-6">
          <span className="text-[#E9C349] font-black italic text-xs md:text-sm uppercase tracking-widest mb-1 block">
            Rules of Engagement
          </span>
          <h1 className="font-extrabold italic text-4xl md:text-6xl tracking-tighter uppercase bg-gradient-to-r from-[#E9C349] via-[#FFF9D2] to-[#E9C349] text-transparent bg-clip-text drop-shadow-md inline-block pr-2">
            TERMS & CONDITIONS
          </h1>
          <p className="text-xs sm:text-sm font-mono text-gray-500 uppercase font-bold tracking-wider mt-2">
            Effective as of: May {currentYear}
          </p>
        </div>

        {/* Introduction Text Block */}
        <div className="bg-[#050505]/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 md:p-6 text-sm text-gray-400 font-medium leading-relaxed">
          Welcome to the Odyssey FC Arena Hub. By accessing our site
          infrastructure, submitting challenge queries, or scheduling fixtures
          on our home pitch, you form a binding operational contract to stay
          completely within the boundaries detailed in these terms.
        </div>

        {/* Terms Sections Grid */}
        <div className="flex flex-col gap-6 w-full">
          {termsSections.map((sec, idx) => (
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
                <h3 className="font-black text-base sm:text-lg uppercase italic tracking-tight text-white transition-colors">
                  {sec.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-medium">
                  {sec.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact/Agreement Notice */}
        <div className="text-center border-t border-white/5 pt-8 mt-4 text-xs sm:text-sm text-gray-500 font-medium">
          <p>
            Stepping onto our pitch loops signifies that your squad reads and
            accepts all terms outlined above.
          </p>
          <p className="mt-1">
            For operational match adjustments, clarify directly with our
            captains on the{" "}
            <span className="text-[#E9C349] font-bold underline cursor-pointer hover:text-white transition-colors">
              WhatsApp Support Channel
            </span>
            .
          </p>
          <p className="text-[10px] uppercase font-mono tracking-widest mt-8 opacity-40">
            © {currentYear} Odyssey FC. Arena Logistics Code.
          </p>
        </div>
      </div>
    </main>
  );
}
