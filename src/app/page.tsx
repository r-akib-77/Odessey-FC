/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useState } from "react";
import { Button } from "@base-ui/react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

// Shadcn Accordion Imports
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

// ULTIMATE TYPESCRIPT BYPASS: Forces TS to accept the Accordion without throwing prop errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SafeAccordion = Accordion as any;

// ==========================================
// 1. CONTENT DATA
// ==========================================
const HERO_CONTENT = {
  headline: ["THE ODYSSEY", "BEGINS"],
  description:
    "Founded on passion and unity, Odyssey FC is a rising club dedicated to competitive football, elite player development, and a strong team culture. More than just a team, we are a community of athletes pushing limits to create a lasting impact on and off the pitch.",
};

const ABOUT_CONTENT = {
  headline: "ABOUT US",
  description:
    "Founded with passion, ambition, and unity, Odyssey FC is a rising football club dedicated to developing talent, building strong team culture, and competing with professionalism on and off the pitch. The club brings together driven players who share the same goal — to grow, perform, and represent the badge with pride. Odyssey FC focuses on competitive football, player development, and creating opportunities for young talents to showcase their abilities. From local tournaments to organized matchdays, the club continues to build its identity through discipline, teamwork, and commitment. More than just a football team, Odyssey FC represents a community of passionate athletes and supporters working together to push beyond limits and create a lasting impact in the football scene.",
};

const FAQS = [
  {
    question: "What is Odyssey FC and what is its mission?",
    answer:
      "Founded on April 18th, 2026, Odyssey FC is a competitive football team built on passion, teamwork, and discipline. Our mission is to grow a strong football community, develop grassroots talent, and compete at the highest levels while representing our badge with pride.",
  },
  {
    question: "Do you participate in competitive tournaments?",
    answer:
      "Yes! We regularly participate in local tournaments, friendly matches, and highly competitive fixtures to test and develop our squad.",
  },
  {
    question: "How can I join Odyssey FC or attend a trial?",
    answer:
      "Interested players can contact our management team directly through our official social media pages or via email to get information on upcoming trial dates and recruitment updates.",
  },
  {
    question: "Where can I follow team updates or get official gear?",
    answer:
      "You can follow all match updates, announcements, and team activities on our official Instagram, Facebook, and Discord. We also proudly sport our own official team jerseys and branding identity.",
  },
  {
    question: "Are you open to sponsorships and partnerships?",
    answer:
      "Absolutely. We welcome sponsorships and collaborations with brands and organizations. Interested parties can reach out directly via our official inbox or email to discuss partnership opportunities.",
  },
];

// ==========================================
// 2. ANIMATION VARIANTS
// ==========================================
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const headlineVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20, mass: 1 },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 18 },
  },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 24, delay: 0.2 },
  },
};

const bounceAnimation: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    y: [0, -15, 0],
    transition: {
      opacity: { duration: 0.5 },
      scale: { type: "spring", stiffness: 300, damping: 20 },
      y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function HomePage() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <main className="bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8),rgba(0,0,0,0.98)),url('/backgroundPicHero.png')] bg-cover bg-center bg-no-repeat bg-fixed w-full min-h-screen text-white overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative flex flex-col justify-center px-5 sm:px-6 pt-28 pb-12 md:pt-40 md:pb-16 min-h-[85vh] md:min-h-[75vh]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[50%] bg-[#E9C349]/15 blur-[80px] rounded-full pointer-events-none md:hidden z-0" />

        <motion.div
          className="relative z-10 w-full md:w-[80%] mx-auto flex flex-col items-center md:items-start text-center md:text-left"
          style={{ perspective: "1000px" }}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h1
            variants={headlineVariants}
            className="font-extrabold italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase mb-4 leading-[0.9] sm:leading-none bg-gradient-to-r from-[#E9C349] via-[#FFF9D2] to-[#E9C349] text-transparent bg-clip-text drop-shadow-2xl bg-[length:200%_auto] pr-4 pb-2"
            animate={{ backgroundPosition: ["200% center", "-200% center"] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          >
            {HERO_CONTENT.headline[0]} <br className="hidden sm:block" />
            {HERO_CONTENT.headline[1]}
          </motion.h1>

          <motion.div
            variants={textVariants}
            className="max-w-3xl mb-10 w-full"
          >
            <p className="text-gray-200 text-sm md:text-base leading-relaxed font-medium drop-shadow-md">
              {HERO_CONTENT.description}
            </p>
          </motion.div>

          <motion.div
            variants={textVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <motion.div variants={buttonVariants} className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-[#E9C349] text-black font-extrabold italic text-sm sm:text-base uppercase tracking-widest px-6 py-3.5 sm:py-4 rounded-md hover:scale-105 hover:shadow-[0_0_20px_rgba(233,195,73,0.5)] transition-all duration-300">
                <Link href="/play-vs">Challenge Odyssey</Link>
              </Button>
            </motion.div>

            <motion.div variants={buttonVariants} className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-transparent border-2 border-[#E9C349] text-white font-extrabold italic text-sm sm:text-base uppercase tracking-widest px-6 py-3.5 sm:py-4 rounded-md hover:bg-[#E9C349] hover:text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(233,195,73,0.5)] transition-all duration-300 bg-black/20 backdrop-blur-sm">
                <Link href="/squad-hub">Squad Hub</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* --- ABOUT US SECTION --- */}
      <section className="w-full md:w-[80%] mx-auto px-6 py-12 md:py-16 mb-8 md:mb-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          <motion.div
            className="w-full lg:w-1/3 flex justify-center lg:justify-start"
            variants={bounceAnimation}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-2 border-[#E9C349]/30 shadow-[0_0_40px_rgba(233,195,73,0.15)] group">
              <Image
                src={"/logoBG.jpeg"}
                alt="Odyssey FC Logo"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:w-2/3 flex flex-col text-center lg:text-left"
            variants={slideInRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-extrabold italic text-3xl md:text-5xl tracking-tighter uppercase mb-6 bg-gradient-to-r from-[#E9C349] via-[#FFF9D2] to-[#E9C349] text-transparent bg-clip-text pr-2">
              {ABOUT_CONTENT.headline}
            </h2>

            <div className="w-full">
              <p
                className={`text-gray-300/90 text-base md:text-lg leading-relaxed font-medium transition-all duration-300 ${
                  isExpanded
                    ? "line-clamp-none"
                    : "line-clamp-4 md:line-clamp-none"
                }`}
              >
                {ABOUT_CONTENT.description}
              </p>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="md:hidden mt-3 text-[#E9C349] font-extrabold italic uppercase tracking-wider text-sm hover:text-white transition-colors focus:outline-none"
              >
                {isExpanded ? "Show Less" : "See More"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="w-full md:w-[70%] mx-auto px-6 py-10 md:py-24 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#E9C349]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="font-extrabold italic text-4xl md:text-6xl tracking-tighter uppercase mb-4 bg-gradient-to-r from-[#E9C349] via-[#FFF9D2] to-[#E9C349] text-transparent bg-clip-text drop-shadow-md pr-2">
            FAQ
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#E9C349] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 font-medium text-sm md:text-base max-w-xl mx-auto">
            Everything you need to know about Odyssey FC. From trials to
            tournaments, find your answers here.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full bg-[#050505]/60 backdrop-blur-xl rounded-3xl border border-[#E9C349]/15 shadow-[0_0_40px_rgba(233,195,73,0.05)] overflow-hidden"
        >
          {/* STRING FIX APPLIED HERE: collapsible="true" */}
          <SafeAccordion
            type="single"
            collapsible="true"
            className="w-full px-4 md:px-8 py-4"
          >
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-[#E9C349]/10 last:border-0 group"
              >
                <AccordionTrigger className="text-left font-bold italic text-base md:text-lg uppercase tracking-wide text-white hover:text-[#E9C349] hover:no-underline transition-all duration-300 py-6 md:py-8 group-data-[state=open]:text-[#E9C349]">
                  <div className="flex items-start md:items-center gap-4 md:gap-6">
                    <span className="text-[#E9C349]/40 font-black text-lg md:text-2xl transition-colors duration-300 group-hover:text-[#E9C349]/80 group-data-[state=open]:text-[#E9C349] mt-0.5 md:mt-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300/90 text-sm md:text-base leading-relaxed font-medium pb-8 pt-2">
                  <div className="border-l-2 border-[#E9C349]/40 pl-4 md:pl-6 ml-6 md:ml-10">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </SafeAccordion>
        </motion.div>
      </section>
    </main>
  );
}
