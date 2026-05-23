"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ==========================================
// 1. MANAGEMENT DATA
// ==========================================
const MANAGEMENT_MEMBERS = [
  {
    id: 1,
    name: "Manjarul Khalid",
    role: "Captain & Head of Scouting",
    image: "/manager4.jpeg",
    bio: "Commanding the team directly from the pitch while masterminding our scouting network. He uncovers top talent across the region to ensure Odyssey FC builds a relentless, championship-ready squad.",
  },
  {
    id: 2,
    name: "Mohatasim Tazwar",
    role: "Club Manager",
    image: "/manager1.jpeg",
    bio: "The operational engine of the club. He synchronizes matchday logistics, handles team communications, and oversees off-pitch operations to keep the club running seamlessly at professional standards.",
  },
  {
    id: 3,
    name: "Rakibul Hasan",
    role: "Squad Management",
    image: "/manager6.jpeg",
    bio: "Dedicated to player development and locker room chemistry. He tracks squad fitness metrics, manages player availability, and fosters the disciplined mindset needed to secure tournament victories.",
  },
  {
    id: 4,
    name: "Tahmid Sakib",
    role: "Videographer & Media Lead",
    image: "/manager2.jpeg",
    bio: "The creative eye behind the lens. He captures raw matchday intensity, edits cinematic match highlights, and shapes the visual story of Odyssey FC to put the club on the global digital map.",
  },
  {
    id: 5,
    name: "Siyam Rakib",
    role: "Club Advisor",
    image: "/manager3.jpeg",
    bio: "Providing crucial strategic guidance and high-level footballing insights. He advises the management team on long-term club vision, tournament partnerships, and brand expansion plans.",
  },
  {
    id: 6,
    name: "Sheikh Sakib",
    role: "Lead UI/UX Designer",
    image: "/manager5.png",
    bio: "Crafting the club's premium visual identity. From sleek digital interfaces to digital presentation graphics, he engineers the precise design logic that keeps Odyssey FC's brand looking elite and visually dominant.",
  },
];
// ==========================================
// 2. ANIMATION VARIANTS
// ==========================================
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 22 },
  },
};

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 140 : -140,
    opacity: 0,
    // filter: "blur(6px)", // Removed for mobile performance
  }),
  center: {
    x: 0,
    opacity: 1,
    // filter: "blur(0px)", // Removed for mobile performance
    transition: { type: "spring", stiffness: 240, damping: 22 },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 140 : -140,
    opacity: 0,
    // filter: "blur(6px)", // Removed for mobile performance
    transition: { ease: "easeInOut", duration: 0.2 },
  }),
};

const textFadeVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.35, delay },
  }),
};

export default function Management() {
  const [[page, direction], setPage] = useState([0, 0]);

  const activeIndex =
    ((page % MANAGEMENT_MEMBERS.length) + MANAGEMENT_MEMBERS.length) %
    MANAGEMENT_MEMBERS.length;

  const navigate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleDotClick = (index: number) => {
    const diff = index - activeIndex;
    if (diff !== 0) {
      setPage([page + diff, diff > 0 ? 1 : -1]);
    }
  };

  // Mobile Swipe/Drag gesture handler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      navigate(1);
    } else if (info.offset.x > swipeThreshold) {
      navigate(-1);
    }
  };

  const currentMember = MANAGEMENT_MEMBERS[activeIndex];

  return (
    <main className="min-h-screen w-full text-white flex items-center justify-center px-4 py-24 overflow-hidden relative">
      {/* Fixed Background Image for all devices */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.85),rgba(0,0,0,0.99)),url('/backgroundPicHero.png')] bg-cover bg-center bg-no-repeat" />
      {/* Background ambient spotlight glow matching the main theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[60vh] bg-[#E9C349]/5 blur-[140px] hidden md:block rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl w-full flex flex-col gap-6 md:w-[80vw]">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
          className="text-center md:text-left mb-2"
        >
          <h2 className="font-extrabold italic text-4xl md:text-6xl tracking-tighter uppercase bg-gradient-to-r from-[#E9C349] via-[#FFF9D2] to-[#E9C349] text-transparent bg-clip-text drop-shadow-md inline-block pr-2 bg-[length:200%_auto]">
            CLUB MANAGEMENT
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#E9C349] to-transparent mt-2 mx-auto md:mx-0 rounded-full" />
        </motion.div>

        {/* Stable Core Showcase Display Panel (Removed 3D Move Events) */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="w-full bg-[#050505]/40 backdrop-blur-2xl mobile-low-blur rounded-3xl border border-[#E9C349]/15 shadow-[0_0_50px_rgba(233,195,73,0.02)] p-6 md:p-14 relative overflow-hidden group"
        >
          {/* Subtle Ambient internal card flare mapping */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#E9C349]/5 blur-[60px] hidden md:block rounded-full pointer-events-none" />

          {/* Dynamic Responsive Row Wrapper with Drag Gesture tracking */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="flex flex-col md:flex-row items-center gap-10 md:gap-16 min-h-[440px] md:min-h-[360px] cursor-grab active:cursor-grabbing select-none"
          >
            {/* LEFT SIDE: Animated Image Frame Container */}
            <div className="w-full md:w-2/5 flex justify-center relative pointer-events-none">
              {/* Spinning Decorative Outer Cyber Halo Background Rings */}
              <div className="absolute w-72 h-72 sm:w-80 sm:h-80 md:w-88 md:h-88 border border-[#E9C349]/10 rounded-full animate-[spin_40s_linear_infinite] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden sm:block" />
              <div className="absolute w-66 h-66 sm:w-74 sm:h-74 md:w-82 md:h-82 border border-dashed border-[#E9C349]/5 rounded-full animate-[spin_20s_linear_infinite_reverse] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden sm:block" />

              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-[#E9C349]/20 shadow-[0_0_40px_rgba(233,195,73,0.08)] bg-black/50 group/img transition-all duration-500 hover:border-[#E9C349]/40 hover:shadow-[0_0_50px_rgba(233,195,73,0.15)]">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={page}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={currentMember.image}
                      alt={currentMember.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={85}
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT SIDE: Animated Bio Content Display with Sequential Staggered Text Triggers */}
            <div className="w-full md:w-3/5 flex flex-col justify-center text-center md:text-left relative min-h-[240px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <div key={page} className="w-full flex flex-col">
                  {/* Role Subtitle Badge */}
                  <motion.div
                    variants={textFadeVariants}
                    initial="hidden"
                    animate="show"
                    custom={0.04}
                  >
                    <span className="inline-block bg-[#E9C349]/10 text-[#E9C349] font-black italic text-xs md:text-sm uppercase tracking-widest mb-3 px-3 py-1 rounded-md border border-[#E9C349]/20 shadow-[0_2px_10px_rgba(233,195,73,0.05)]">
                      {currentMember.role}
                    </span>
                  </motion.div>

                  {/* Character Name Display */}
                  <motion.h3
                    variants={textFadeVariants}
                    initial="hidden"
                    animate="show"
                    custom={0.1}
                    className="font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4 uppercase italic drop-shadow-md"
                  >
                    {currentMember.name}
                  </motion.h3>

                  {/* Character Bio Content Paragraph */}
                  <motion.p
                    variants={textFadeVariants}
                    initial="hidden"
                    animate="show"
                    custom={0.16}
                    className="text-gray-300/90 text-sm sm:text-base leading-relaxed font-medium md:max-w-xl min-h-[72px]"
                  >
                    {currentMember.bio}
                  </motion.p>

                  {/* Fancy Tracking Dot Indicators */}
                  <motion.div
                    variants={textFadeVariants}
                    initial="hidden"
                    animate="show"
                    custom={0.22}
                    className="flex items-center justify-center md:justify-start gap-2 mt-8 wrap flex-wrap"
                  >
                    {MANAGEMENT_MEMBERS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDotClick(idx)}
                        className="h-1.5 transition-all duration-500 rounded-full relative focus:outline-none my-1"
                        style={{
                          width: idx === activeIndex ? "24px" : "6px",
                          backgroundColor:
                            idx === activeIndex
                              ? "#E9C349"
                              : "rgba(255, 255, 255, 0.15)",
                          boxShadow:
                            idx === activeIndex
                              ? "0 0 10px rgba(233, 195,73, 0.6)"
                              : "none",
                        }}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </motion.div>
                </div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex justify-center md:justify-end items-center gap-4 mt-8 md:mt-0 border-t border-[#E9C349]/10 pt-6 md:pt-0 md:border-none relative z-20">
            <button
              onClick={() => navigate(-1)}
              className="bg-white/5 border border-[#E9C349]/15 text-white p-3.5 rounded-full hover:bg-[#E9C349] hover:text-black transition-all duration-300 focus:outline-none hover:scale-105 active:scale-95 group shadow-lg backdrop-blur-sm"
              aria-label="Previous member"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
            </button>

            <div className="text-xs uppercase font-black tracking-widest text-gray-500 italic select-none font-mono">
              <span className="text-[#E9C349] font-black">
                {activeIndex + 1}
              </span>{" "}
              <span className="opacity-40">/</span> {MANAGEMENT_MEMBERS.length}
            </div>

            <button
              onClick={() => navigate(1)}
              className="bg-white/5 border border-[#E9C349]/15 text-white p-3.5 rounded-full hover:bg-[#E9C349] hover:text-black transition-all duration-300 focus:outline-none hover:scale-105 active:scale-95 group shadow-lg backdrop-blur-sm"
              aria-label="Next member"
            >
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
