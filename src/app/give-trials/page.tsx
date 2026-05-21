"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Calendar,
  MapPin,
  ShieldAlert,
  Trophy,
  Shirt,
  CheckCircle,
  ChevronDown,
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
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
};

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

export default function GiveTrials() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    age: "",
    position: "Forward / Winger",
    preferredFoot: "Right",
    prevExperience: "",
  });

  const [posOpen, setPosOpen] = useState(false);
  const [footOpen, setFootOpen] = useState(false);

  const positions = [
    "Forward / Winger",
    "Midfielder",
    "Defender",
    "Goalkeeper",
  ];
  const feet = ["Right", "Left", "Ambidextrous"];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "8801676500977";

    const messageText =
      `🏆 *NEW TRIAL APPLICATION - ODYSSEY FC* 🏆\n\n` +
      `👤 *Full Name:* ${formData.fullName}\n` +
      `📞 *Contact:* ${formData.phone}\n` +
      `🎂 *Age:* ${formData.age} years old\n` +
      `🏃‍♂️ *Position:* ${formData.position}\n` +
      `🦶 *Preferred Foot:* ${formData.preferredFoot}\n\n` +
      `📝 *Experience & Background:* \n${formData.prevExperience || "None provided."}`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setSubmitted(true);
  };

  return (
    <main className="bg-[linear-gradient(to_bottom,rgba(0,0,0,0.85),rgba(0,0,0,0.99)),url('/backgroundPicHero.png')] bg-cover bg-center bg-no-repeat bg-fixed min-h-screen w-full text-white px-4 py-24 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[60vh] bg-[#E9C349]/5 blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col gap-12 md:w-[80vw]">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <span className="text-[#E9C349] font-black italic text-xs md:text-sm uppercase tracking-widest mb-2 block">
            Recruitment Open
          </span>
          <h2 className="font-extrabold italic text-4xl md:text-6xl tracking-tighter uppercase bg-gradient-to-r from-[#E9C349] via-[#FFF9D2] to-[#E9C349] text-transparent bg-clip-text drop-shadow-md inline-block pr-2">
            JOIN THE ODYSSEY TRIALS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#E9C349] to-transparent mt-2 mx-auto md:mx-0 rounded-full" />
        </motion.div>

        {/* Outer Split Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT SIDE: Requirements & Schedules */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <motion.div
              variants={cardFadeVariants}
              className="bg-[#050505]/40 backdrop-blur-2xl p-6 rounded-2xl border border-[#E9C349]/15 shadow-md"
            >
              <h3 className="text-[#E9C349] font-black italic text-lg uppercase tracking-wide mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#E9C349]" /> Trial Briefing
              </h3>
              <p className="text-gray-400 text-sm font-medium leading-relaxed mb-4">
                Odyssey FC is looking for driven, disciplined players ready to
                represent our badge at competitive levels. Fill out the
                application, and chosen scouts will extend match invites.
              </p>
              <div className="flex items-start gap-3 text-sm font-semibold text-gray-300">
                <MapPin className="w-4 h-4 text-[#E9C349] shrink-0 mt-0.5" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </motion.div>

            <motion.div
              variants={cardFadeVariants}
              className="bg-[#050505]/40 backdrop-blur-2xl p-6 rounded-2xl border border-[#E9C349]/15 shadow-md"
            >
              <h3 className="text-white font-black italic text-lg uppercase tracking-wide mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#E9C349]" /> Core Requirements
              </h3>
              <ul className="flex flex-col gap-3 text-sm font-medium text-gray-400">
                <li className="flex gap-3 items-start">
                  <ShieldAlert className="w-4 h-4 text-[#E9C349] shrink-0 mt-0.5" />
                  <span>
                    Must maintain active physical conditioning levels.
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <Shirt className="w-4 h-4 text-[#E9C349] shrink-0 mt-0.5" />
                  <span>
                    Bring custom black football kit, shin guards, and boots.
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="w-4 h-4 text-[#E9C349] shrink-0 mt-0.5" />
                  <span>
                    Strict focus on locker room accountability and discipline.
                  </span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: Interactive Themed Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-[#050505]/40 backdrop-blur-2xl p-6 md:p-10 rounded-3xl border border-[#E9C349]/15 shadow-xl relative"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase font-black tracking-widest text-gray-400 italic">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="e.g. Jamal Hossain"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-medium text-white placeholder-gray-600 focus:outline-none focus:border-[#E9C349]/50 focus:bg-white/10 transition-all duration-300"
                  />
                </div>

                {/* Phone & Age */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase font-black tracking-widest text-gray-400 italic">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="e.g. +8801XXXXXXXXX"
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-medium text-white placeholder-gray-600 focus:outline-none focus:border-[#E9C349]/50 focus:bg-white/10 transition-all duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase font-black tracking-widest text-gray-400 italic">
                      Age
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      placeholder="e.g. 19"
                      // Fixed classes added here to completely hide native browser up/down number spin buttons
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-medium text-white placeholder-gray-600 focus:outline-none focus:border-[#E9C349]/50 focus:bg-white/10 transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>

                {/* Position & Foot Custom Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Custom Position Dropdown */}
                  <div className="flex flex-col gap-2 relative">
                    <label className="text-xs uppercase font-black tracking-widest text-gray-400 italic">
                      Primary Position
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setPosOpen(!posOpen);
                        setFootOpen(false);
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-medium text-white flex justify-between items-center hover:bg-white/10 transition-all duration-300 focus:outline-none focus:border-[#E9C349]/50"
                    >
                      <span>{formData.position}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#E9C349] transition-transform duration-300 ${posOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {posOpen && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          className="absolute left-0 right-0 top-[calc(100%+4px)] bg-[#0f0f0f]/95 border border-[#E9C349]/20 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden z-50 flex flex-col"
                        >
                          {positions.map((pos) => (
                            <button
                              key={pos}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, position: pos });
                                setPosOpen(false);
                              }}
                              className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-[#E9C349] hover:text-black transition-colors font-medium"
                            >
                              {pos}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Custom Preferred Foot Dropdown */}
                  <div className="flex flex-col gap-2 relative">
                    <label className="text-xs uppercase font-black tracking-widest text-gray-400 italic">
                      Preferred Foot
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setFootOpen(!footOpen);
                        setPosOpen(false);
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-medium text-white flex justify-between items-center hover:bg-white/10 transition-all duration-300 focus:outline-none focus:border-[#E9C349]/50"
                    >
                      <span>{formData.preferredFoot}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#E9C349] transition-transform duration-300 ${footOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {footOpen && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          className="absolute left-0 right-0 top-[calc(100%+4px)] bg-[#0f0f0f]/95 border border-[#E9C349]/20 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden z-50 flex flex-col"
                        >
                          {feet.map((foot) => (
                            <button
                              key={foot}
                              type="button"
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  preferredFoot: foot,
                                });
                                setFootOpen(false);
                              }}
                              className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-[#E9C349] hover:text-black transition-colors font-medium"
                            >
                              {foot}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Background Experience */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase font-black tracking-widest text-gray-400 italic">
                    Football Experience & Background
                  </label>
                  <textarea
                    rows={4}
                    value={formData.prevExperience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        prevExperience: e.target.value,
                      })
                    }
                    placeholder="List your previous clubs, tournaments played, or high school team involvement..."
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-medium text-white placeholder-gray-600 focus:outline-none focus:border-[#E9C349]/50 focus:bg-white/10 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#E9C349] text-black font-black italic text-sm uppercase tracking-widest py-4 rounded-lg shadow-[0_0_20px_rgba(233,195,73,0.15)] hover:shadow-[0_0_30px_rgba(233,195,73,0.4)] transition-all duration-300 mt-2"
                >
                  Submit Application via WhatsApp
                </motion.button>
              </form>
            ) : (
              /* Success View State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-12 min-h-[400px]"
              >
                <div className="w-16 h-16 bg-[#E9C349]/10 rounded-full flex items-center justify-center mb-6 border border-[#E9C349]/30 shadow-[0_0_20px_rgba(233,195,73,0.1)]">
                  <CheckCircle className="w-8 h-8 text-[#E9C349]" />
                </div>
                <h3 className="font-black text-2xl sm:text-3xl uppercase italic text-white tracking-tight mb-3">
                  Application Scouted
                </h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-sm mb-8">
                  Redirecting to WhatsApp! Press continue if your browser
                  blocked the window popup.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="border border-[#E9C349] text-[#E9C349] hover:bg-[#E9C349] hover:text-black font-extrabold italic text-xs uppercase tracking-widest px-6 py-3 rounded-md transition-all duration-300"
                >
                  Edit Information
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
