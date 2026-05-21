"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X } from "lucide-react";

// Shadcn UI Imports (Adjust the import path based on your setup)
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { id: 1, title: "Squad Hub", url: "/squad-hub" },
  { id: 2, title: "News", url: "/news" },
  { id: 3, title: "Trials", url: "/give-trials" },
  { id: 4, title: "Management", url: "/management" },
  { id: 5, title: "Play Vs", url: "/play-vs" },
];

// --- FRAMER MOTION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 100, scale: 0.5, rotate: 15 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", bounce: 0.6, duration: 0.8 },
  },
  hover: {
    scale: 1.15,
    rotate: -3,
    textShadow: "0px 0px 12px rgba(233, 195, 73, 0.8)",
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
  tap: { scale: 0.9, rotate: 5 },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Changed classes here: Made it sticky on mobile with a blurred background, reverting to relative/transparent on md screens
    <header className="w-full px-5 py-4 mx-auto z-50 sticky top-0 bg-black/80 backdrop-blur-md border-b border-[#E9C349]/10 md:relative md:bg-transparent md:backdrop-blur-none md:border-none md:w-[80%] md:px-0 md:mt-4">
      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <div>
          <motion.h1
            className="font-extrabold italic text-2xl md:text-4xl tracking-tighter label bg-gradient-to-r from-[#E9C349] via-[#FFF9D2] to-[#E9C349] text-transparent bg-clip-text drop-shadow-sm bg-[length:200%_auto] pr-2 cursor-pointer"
            animate={{ backgroundPosition: ["200% center", "-200% center"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/">Odyssey FC</Link>
          </motion.h1>
        </div>

        {/* Desktop Links Section */}
        <nav className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <motion.div
              key={link.id}
              whileHover={{
                scale: 1.1,
                y: -4,
                filter: "drop-shadow(0px 4px 8px rgba(233, 195, 73, 0.5))",
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Link
                href={link.url}
                className="text-white hover:text-[#E9C349] font-semibold transition-colors duration-200 uppercase tracking-wide label"
              >
                {link.title}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Section */}
        <div className="flex items-center md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="text-[#E9C349] p-2 focus:outline-none flex items-center justify-center rounded-md hover:bg-white/10 transition-colors z-50">
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.2 : 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {isOpen ? (
                  <X className="h-8 w-8" />
                ) : (
                  <Menu className="h-8 w-8" />
                )}
              </motion.div>
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-black/40 backdrop-blur-2xl border-l border-[#E9C349]/30 flex flex-col pt-24 shadow-[0_0_40px_rgba(233,195,73,0.1)]"
            >
              <motion.nav
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-10 items-center"
              >
                {links.map((link) => (
                  <motion.div
                    key={link.id}
                    variants={itemVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      href={link.url}
                      onClick={() => setIsOpen(false)}
                      className="text-white text-3xl font-extrabold uppercase tracking-widest label"
                    >
                      {link.title}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
