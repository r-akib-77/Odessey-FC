"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function Footer() {
  return (
    <motion.footer
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="relative z-10 w-full border-t border-[#E9C349]/20 bg-black/80 backdrop-blur-xl pt-12 pb-8   text-white"
    >
      {/* Container switches from stacked column on mobile to a multi-column row on tablet/desktop */}
      <div className="w-full md:w-[80%] mx-auto px-6 flex flex-col md:grid md:grid-cols-3 justify-between items-center md:items-start gap-10 md:gap-8 text-center md:text-left">
        {/* Footer Column 1: Brand & Identity */}
        <div className="flex flex-col items-center md:items-start gap-4 max-w-sm">
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#E9C349]/30 shadow-[0_0_20px_rgba(233,195,73,0.1)]">
            <Image
              src="/logoBG.jpeg"
              alt="Odyssey FC Logo"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-extrabold italic text-2xl uppercase tracking-tighter text-white">
            Odyssey <span className="text-[#E9C349]">FC</span>
          </h3>
          <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xs">
            Forging legends on and off the pitch. Driven by passion, united by
            ambition.
          </p>
        </div>

        {/* Footer Column 2: Quick Links Navigation */}
        <div className="flex flex-col items-center md:items-start gap-3 w-full">
          <h4 className="font-bold uppercase tracking-widest text-white mb-1 text-base md:text-sm">
            Quick Links
          </h4>
          <div className="flex flex-col gap-2.5 items-center md:items-start">
            <Link
              href="/squad-hub"
              className="text-gray-400 hover:text-[#E9C349] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Squad Hub
            </Link>
            <Link
              href="/news"
              className="text-gray-400 hover:text-[#E9C349] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              News & Updates
            </Link>
            <Link
              href="/give-trials"
              className="text-gray-400 hover:text-[#E9C349] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Join Trials
            </Link>
            <Link
              href="/management"
              className="text-gray-400 hover:text-[#E9C349] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Management
            </Link>
          </div>
        </div>

        {/* Footer Column 3: Contact & Secured Social Channels */}
        <div className="flex flex-col items-center md:items-start gap-5 w-full">
          <h4 className="font-bold uppercase tracking-widest text-white mb-1 text-base md:text-sm">
            Connect With Us
          </h4>

          <div className="flex flex-col gap-3 items-center md:items-start w-full">
            <a
              href="mailto:odysseyfc2026@gmail.com"
              className="flex items-center gap-3 text-gray-400 hover:text-[#E9C349] transition-colors text-sm font-medium group text-center md:text-left break-all"
            >
              <Mail className="w-4 h-4 text-[#E9C349] shrink-0 group-hover:scale-110 transition-transform" />
              odysseyfc2026@gmail.com
            </a>
            <div className="flex items-center gap-3 text-gray-400 text-sm font-medium">
              <MapPin className="w-4 h-4 text-[#E9C349] shrink-0" />
              Dhaka, Bangladesh
            </div>
          </div>

          {/* Social Links Setup with Safe Blank Targets */}
          <div className="flex gap-4 mt-1">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/17XSDWp6ZW/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="bg-white/5 p-2.5 rounded-full hover:bg-[#E9C349]/20 hover:text-[#E9C349] transition-all duration-300 text-gray-300 block"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/_odyssey_fc?igsh=MW5pNTRoaWV2NXJycw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="bg-white/5 p-2.5 rounded-full hover:bg-[#E9C349]/20 hover:text-[#E9C349] transition-all duration-300 text-gray-300 block"
            >
              <svg
                className="w-5 h-5 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/8801676500977?text=Hello%20Odyssey%20FC!"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="bg-white/5 p-2.5 rounded-full hover:bg-[#E9C349]/20 hover:text-[#E9C349] transition-all duration-300 text-gray-300 block"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.046c1.66.986 3.297 1.523 5.352 1.524 5.518 0 10.011-4.49 10.014-10.01.002-2.674-1.037-5.188-2.925-7.077-1.887-1.889-4.397-2.93-7.074-2.93-5.52 0-10.014 4.491-10.017 10.013-.001 2.096.549 4.14 1.595 5.893l-.999 3.65 3.75-.983zM18.23 14.88c-.34-.17-2.01-1-2.321-1.113-.311-.114-.538-.17-.765.17-.227.34-.879 1.114-1.077 1.34-.199.228-.399.256-.739.085-.34-.17-1.437-.53-2.738-1.69-1.012-.903-1.694-2.018-1.893-2.358-.198-.34-.021-.524.149-.694.154-.153.34-.397.51-.595.17-.198.227-.34.34-.567.113-.227.056-.425-.029-.595-.085-.17-.765-1.844-1.049-2.527-.276-.665-.558-.574-.765-.585-.198-.01-.425-.012-.653-.012-.226 0-.594.085-.906.425-.312.34-1.19 1.163-1.19 2.834 0 1.671 1.218 3.286 1.388 3.513.17.227 2.399 3.662 5.811 5.132.812.35 1.446.558 1.94.715.816.26 1.56.223 2.148.135.656-.099 2.01-.822 2.294-1.586.284-.765.284-1.417.199-1.558-.085-.14-.311-.226-.652-.396z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Document Rules Partition */}
      <div className="w-full md:w-[80%] mx-auto px-6 border-t border-[#E9C349]/10 mt-10 pt-6 text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
          &copy; 2026 Odyssey FC. Developed by{" "}
          <span className="text-[#E9C349] font-semibold">
            Vertexora Solutions
          </span>
          .
        </p>
        <div className="flex gap-5 text-gray-500 text-xs font-medium uppercase tracking-wider">
          <Link
            href="/privacy"
            className="hover:text-[#E9C349] transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="hover:text-[#E9C349] transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
