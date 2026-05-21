"use client";

import { useState, FormEvent } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Swords,
  ShieldAlert,
  DollarSign,
  HelpCircle,
  CheckCircle,
  Lock,
} from "lucide-react";

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardFadeVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
};

const pulseVsVariants: Variants = {
  animate: {
    scale: [1, 1.08, 1],
    boxShadow: [
      "0 0 12px rgba(233, 195, 73, 0.2)",
      "0 0 25px rgba(233, 195, 73, 0.5)",
      "0 0 12px rgba(233, 195, 73, 0.2)",
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function MatchHub() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    challengerTeam: "",
    captainName: "",
    phone: "",
    squadSize: "6v6",
    preferredTime: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "8801676500977";

    const messageText =
      `⚔️ *NEW MATCH CHALLENGE DISPATCHED* ⚔️\n\n` +
      `🔥 *Challenger Team:* ${formData.challengerTeam}\n` +
      `👤 *Captain:* ${formData.captainName}\n` +
      `📞 *Contact:* ${formData.phone}\n` +
      `👥 *Match Format:* ${formData.squadSize}\n` +
      `⏰ *Preferred Slot:* ${formData.preferredTime}\n\n` +
      `🏟️ *Pitch Location:* Kick Zone, Mirpur 12\n` +
      `💵 *Slot Booking Fee:* 500 BDT (Ready to pay)\n\n` +
      `⚡ _We want the slot. Accept our challenge and send us payment info!_`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setSubmitted(true);
  };

  return (
    <main className="bg-[linear-gradient(to_bottom,rgba(0,0,0,0.85),rgba(0,0,0,0.99)),url('/backgroundPicHero.png')] bg-cover bg-center bg-no-repeat bg-fixed min-h-screen w-full text-white px-4 py-16 md:py-24 overflow-hidden relative">
      {/* Dynamic Background Light Rings */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[95vw] md:w-[80vw] h-[40vh] md:h-[50vh] bg-[#E9C349]/5 blur-[80px] md:blur-[130px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col gap-8 md:gap-10 md:w-[80vw]">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-left"
        >
          <span className="text-[#E9C349] font-black italic text-xs md:text-sm uppercase tracking-widest mb-1 md:mb-2 block">
            Arena Defiance Loop
          </span>
          <h2 className="font-extrabold italic text-3xl sm:text-4xl md:text-6xl tracking-tighter uppercase bg-gradient-to-r from-[#E9C349] via-[#FFF9D2] to-[#E9C349] text-transparent bg-clip-text drop-shadow-md inline-block pr-2">
            CHALLENGE ODYSSEY FC
          </h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-[#E9C349] to-transparent mt-2 mx-auto md:mx-0 rounded-full" />
        </motion.div>

        {/* Outer Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start">
          {/* LEFT SIDE: Dynamic Versus Status Card & Pitch Regulations */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-6 w-full"
          >
            {/* Mobile Responsive Versus Card (Stacks on mobile, row on tablet/desktop) */}
            <motion.div
              variants={cardFadeVariants}
              className="bg-[#050505]/50 backdrop-blur-2xl p-6 md:p-8 rounded-2xl border border-[#E9C349]/15 shadow-xl flex flex-col items-center justify-center relative py-8 sm:py-10"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-6 sm:gap-2 relative">
                {/* Home Team: Odyssey */}
                <div className="flex flex-col items-center gap-2 sm:gap-3 flex-1">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#E9C349] shadow-[0_0_20px_rgba(233,195,73,0.2)] bg-black">
                    <Image
                      src="/logoBG.jpeg"
                      alt="Odyssey FC"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-black italic text-xs sm:text-sm uppercase tracking-wider text-center">
                    ODYSSEY FC
                  </span>
                </div>

                {/* Animated Pulsing VS Node */}
                <motion.div
                  variants={pulseVsVariants}
                  animate="animate"
                  className="w-10 h-10 rounded-full bg-[#E9C349] text-black font-black italic text-xs sm:text-sm flex items-center justify-center shadow-lg border border-black/50 shrink-0 z-10"
                >
                  VS
                </motion.div>

                {/* Challenger Team: "?" Placeholder */}
                <div className="flex flex-col items-center gap-2 sm:gap-3 flex-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-white/20 bg-white/5 flex items-center justify-center shadow-inner transition-colors duration-300">
                    <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white/20 animate-pulse" />
                  </div>
                  <span className="font-black italic text-xs sm:text-sm uppercase tracking-wider text-gray-500 tracking-widest text-center animate-pulse max-w-[140px] truncate">
                    {formData.challengerTeam ? formData.challengerTeam : "?"}{" "}
                    TEAM
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Stadium Field Logistics & Booking Protocols */}
            <motion.div
              variants={cardFadeVariants}
              className="bg-[#050505]/40 backdrop-blur-2xl p-5 md:p-6 rounded-2xl border border-[#E9C349]/15 shadow-md"
            >
              <h3 className="text-[#E9C349] font-black italic text-sm sm:text-base uppercase tracking-wide mb-4 flex items-center gap-2">
                <Swords className="w-4 h-4 text-[#E9C349]" /> Pitch Battle Terms
              </h3>

              <div className="flex flex-col gap-4 text-xs sm:text-sm font-medium text-gray-300">
                <div className="flex gap-3 items-start">
                  <MapPin className="w-4 h-4 text-[#E9C349] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-wider">
                      Home Turf Field
                    </h4>
                    <p className="text-gray-400 text-xs mt-0.5">
                      Kick Zone — Mirpur 12, Eastern Housing, Dhaka.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <DollarSign className="w-4 h-4 text-[#E9C349] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-wider">
                      Slot Reservation Fee
                    </h4>
                    <p className="text-[#E9C349] font-black font-mono text-sm mt-0.5">
                      500 BDT Advance Payment
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start border-t border-white/5 pt-3">
                  <ShieldAlert className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                  <p className="text-gray-400 text-[11px] sm:text-xs leading-relaxed">
                    Once challenge form configuration dispatches, coordinates
                    will map to verify cash booking receipts before slot
                    assignment locks.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: Interactive Challenge Application Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-[#050505]/40 backdrop-blur-2xl p-5 md:p-10 rounded-3xl border border-[#E9C349]/15 shadow-xl relative w-full"
          >
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 md:gap-6"
              >
                {/* Challenger Squad Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-gray-400 italic">
                    Your Team Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.challengerTeam}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        challengerTeam: e.target.value,
                      })
                    }
                    placeholder="e.g. Spartan United"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white placeholder-gray-600 focus:outline-none focus:border-[#E9C349]/50 focus:bg-white/10 transition-all duration-300"
                  />
                </div>

                {/* Captain Identity Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-gray-400 italic">
                    Captain Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.captainName}
                    onChange={(e) =>
                      setFormData({ ...formData, captainName: e.target.value })
                    }
                    placeholder="e.g. Rakib Ahmed"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white placeholder-gray-600 focus:outline-none focus:border-[#E9C349]/50 focus:bg-white/10 transition-all duration-300"
                  />
                </div>

                {/* Contact phone number */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-gray-400 italic">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="e.g. +8801XXXXXXXXX"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white placeholder-gray-600 focus:outline-none focus:border-[#E9C349]/50 focus:bg-white/10 transition-all duration-300"
                  />
                </div>

                {/* Locked Format Box & Desired Time Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Hard-locked Match Format */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-gray-400 italic">
                      Match Format
                    </label>
                    <div className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#E9C349] flex items-center justify-between select-none">
                      <span>6 v 6 Match Array</span>
                      <Lock className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-gray-400 italic">
                      Desired Time / Day
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.preferredTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferredTime: e.target.value,
                        })
                      }
                      placeholder="e.g. Friday 7 PM"
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white placeholder-gray-600 focus:outline-none focus:border-[#E9C349]/50 focus:bg-white/10 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Action Trigger button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full bg-[#E9C349] text-black font-black italic text-xs sm:text-sm uppercase tracking-widest py-3.5 sm:py-4 rounded-lg shadow-[0_0_20px_rgba(233,195,73,0.15)] hover:shadow-[0_0_30px_rgba(233,195,73,0.4)] transition-all duration-300 mt-2"
                >
                  Send Challenge via WhatsApp
                </motion.button>
              </form>
            ) : (
              /* Success Confirmation View Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-8 sm:py-12 min-h-[380px] sm:min-h-[440px]"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#E9C349]/10 rounded-full flex items-center justify-center mb-5 sm:mb-6 border border-[#E9C349]/30 shadow-[0_0_20px_rgba(233,195,73,0.1)]">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#E9C349]" />
                </div>
                <h3 className="font-black text-xl sm:text-2xl md:text-3xl uppercase italic text-white tracking-tight mb-3">
                  Challenge Dispatched
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm mb-6 sm:mb-8 px-2">
                  Your battle parameters have been channeled to our management
                  thread on WhatsApp. Deposit your{" "}
                  <span className="text-[#E9C349] font-bold">
                    500 BDT slot fee
                  </span>{" "}
                  there to lock the match window!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="border border-[#E9C349] text-[#E9C349] hover:bg-[#E9C349] hover:text-black font-extrabold italic text-[10px] sm:text-xs uppercase tracking-widest px-5 py-2.5 sm:px-6 sm:py-3 rounded-md transition-all duration-300"
                >
                  Edit Challenge Details
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
