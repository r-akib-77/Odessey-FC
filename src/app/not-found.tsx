"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const characterVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.8, rotateX: -60 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { type: "spring", stiffness: 180, damping: 14, mass: 1.1 },
  },
};

const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 22 },
  },
};

const floatingBallVariants: Variants = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 180, 360],
    scale: [1, 1.03, 1],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function NotFoundPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center text-white px-4 overflow-hidden relative">
      {/* Fixed Background Image for all devices */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.85),rgba(0,0,0,0.99)),url('/backgroundPicHero.png')] bg-cover bg-center bg-no-repeat" />
      {/* Cinematic Pitch Backdrop Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[80vw] h-[40vh] md:h-[50vh] bg-[#E9C349]/10 blur-[100px] md:blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Background Floating Decorative Football Asset */}
      <motion.div
        variants={floatingBallVariants}
        animate="animate"
        className="absolute right-[10%] top-[15%] w-24 h-24 border border-[#E9C349]/10 rounded-full flex items-center justify-center opacity-20 pointer-events-none hidden md:flex"
      >
        <div className="w-16 h-16 border-2 border-dashed border-[#E9C349]/20 rounded-full" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ perspective: "1000px" }}
        className="relative z-10 max-w-3xl w-full text-center flex flex-col items-center"
      >
        {/* Fixed 404 Layout: Uses flex-row with overflow-visible to prevent any italic clipping on mobile or desktop */}
        <div className="flex flex-row justify-center items-center gap-1 md:gap-4 select-none mb-6 w-full overflow-visible">
          {["4", "0", "4"].map((char, index) => (
            <motion.span
              key={index}
              variants={characterVariants}
              className="font-black italic text-[22vw] md:text-[14rem] lg:text-[16rem] leading-none bg-gradient-to-b from-[#FFF9D2] via-[#E9C349] to-[#b38f19] text-transparent bg-clip-text drop-shadow-[0_10px_30px_rgba(233,195,73,0.3)] px-3 sm:px-5 md:px-6 inline-block overflow-visible"
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Status Sub-Headline */}
        <motion.h2
          variants={textRevealVariants}
          className="font-extrabold italic text-xl sm:text-2xl md:text-4xl tracking-tight uppercase mb-4 bg-gradient-to-r from-[#E9C349] to-[#FFF9D2] text-transparent bg-clip-text px-2"
        >
          SHOT OUT OF BOUNDS
        </motion.h2>

        {/* Informational Message */}
        <motion.p
          variants={textRevealVariants}
          className="text-gray-400 font-medium text-xs sm:text-sm md:text-base leading-relaxed max-w-md mb-8 px-4"
        >
          Looks like you kneed this one way over the crossbar. The page you are
          scouting doesn&apos;t exist or has been subbed off the pitch.
        </motion.p>

        {/* Fancy Call To Action Interactive Button */}
        <motion.div
          variants={textRevealVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto px-4"
        >
          <Link
            href="/"
            className="block sm:inline-block text-center bg-[#E9C349] text-black font-black italic text-sm sm:text-base uppercase tracking-widest px-8 py-3.5 sm:px-10 sm:py-4 rounded-md shadow-[0_0_30px_rgba(233,195,73,0.2)] hover:shadow-[0_0_40px_rgba(233,195,73,0.5)] transition-all duration-300 transform"
          >
            Return to Pitch
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative Grid Mesh Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px] pointer-events-none" />
    </main>
  );
}
