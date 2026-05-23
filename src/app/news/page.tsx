"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowUpRight, Trophy, Award, Newspaper, Loader2 } from "lucide-react";

// Convert standard Next.js Link into a motion-enabled component
const MotionLink = motion(Link);

interface NewsPost {
  id: number;
  slug: string;
  title: string;
  desc: string;
  date: string;
  category: string;
  image: string;
  featured: boolean | number;
}

// ==========================================
// 2. ANIMATION VARIANTS
// ==========================================
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export default function NewsHub() {
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredPostId, setHoveredPostId] = useState<number | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/news");
        if (res.ok) {
          const data = await res.json();
          setNewsPosts(data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const featuredPost = newsPosts.find((post) => post.featured);
  const regularPosts = newsPosts.filter((post) => !post.featured);

  if (isLoading) {
    return (
      <main className="min-h-screen w-full text-white flex flex-col items-center justify-center gap-4 relative">
      {/* Fixed Background Image for all devices */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.88),rgba(0,0,0,0.98)),url('/backgroundPicHero.png')] bg-cover bg-center bg-no-repeat" />
        <Loader2 className="w-10 h-10 animate-spin text-[#E9C349]" />
        <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">
          Loading Media Hub...
        </span>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full text-white px-3 sm:px-6 py-8 md:py-24 overflow-hidden relative">
      {/* Fixed Background Image for all devices */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.88),rgba(0,0,0,0.98)),url('/backgroundPicHero.png')] bg-cover bg-center bg-no-repeat" />
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[95vw] md:w-[70vw] h-[40vh] bg-[#E9C349]/5 blur-[80px] md:blur-[120px] hidden md:block rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col gap-6 md:gap-14">
        {/* ==========================================
            SECTION HEADER
            ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-left px-1"
        >
          <span className="text-[#E9C349] font-black tracking-widest text-[10px] sm:text-sm uppercase block mb-1">
            Media Hub & Updates
          </span>
          <h2 className="font-extrabold italic text-2xl sm:text-4xl md:text-6xl tracking-tighter uppercase bg-gradient-to-r from-[#E9C349] via-[#FFF9D2] to-[#E9C349] text-transparent bg-clip-text drop-shadow-md inline-block pr-2 leading-none">
            CHAMPIONSHIP & SPONSOR NEWS
          </h2>
          <div className="w-12 md:w-24 h-1 bg-gradient-to-r from-[#E9C349] to-transparent mt-2.5 mx-auto md:mx-0 rounded-full" />
        </motion.div>

        {/* ==========================================
            FEATURED HERO POST
            ========================================== */}
        {featuredPost && (
          <MotionLink
            href={`/news/${featuredPost.slug}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group relative block w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden bg-[#121212] cursor-pointer shadow-2xl mx-1 max-w-[calc(100vw-24px)] sm:max-w-none"
            onMouseEnter={() => setHoveredPostId(featuredPost.id)}
            onMouseLeave={() => setHoveredPostId(null)}
          >
            <div className="absolute inset-0 z-0">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                priority
                quality={85}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent sm:via-black/40 z-10" />
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex gap-2">
              <span className="bg-[#E9C349] text-black text-[8px] sm:text-[10px] font-black uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded shadow-md tracking-wider flex items-center gap-1">
                <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                Featured Victory
              </span>
            </div>

            {/* Content Bottom Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8 z-20 flex flex-col gap-1.5 sm:gap-3 justify-end">
              <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-xs font-bold text-gray-300">
                <span className="text-[#E9C349] tracking-wider uppercase">
                  {featuredPost.category}
                </span>
                <span className="w-1 h-1 bg-gray-500 rounded-full" />
                <span className="flex items-center gap-1">
                  <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />{" "}
                  {featuredPost.date}
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
                <div className="max-w-4xl flex flex-col gap-1 sm:gap-2">
                  <h3 className="font-black text-base sm:text-2xl md:text-4xl uppercase italic tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight line-clamp-2 sm:line-clamp-none">
                    {featuredPost.title}
                  </h3>
                  {featuredPost.desc && (
                    <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 sm:line-clamp-none drop-shadow-sm font-medium leading-relaxed max-w-2xl opacity-90">
                      {featuredPost.desc}
                    </p>
                  )}
                </div>

                {/* See More Option Button */}
                <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 self-start md:self-auto text-[#E9C349] font-black italic text-[9px] sm:text-xs tracking-widest uppercase bg-black/75 sm:bg-black/60 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border border-[#E9C349]/30 group-hover:border-[#E9C349] transition-all duration-300 shadow-md">
                  Read Article
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          </MotionLink>
        )}

        {/* ==========================================
            FLUID RESPONSIVE GRID ARTICLES
            ========================================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full px-1"
        >
          {regularPosts.map((post) => {
            const isHovered = hoveredPostId === post.id;

            return (
              <MotionLink
                href={`/news/${post.slug}`}
                key={post.id}
                variants={itemVariants}
                className="group/card flex flex-col rounded-xl sm:rounded-2xl border border-white/10 hover:border-[#E9C349]/40 bg-[#121212]/60 backdrop-blur-sm overflow-hidden transition-all duration-300 shadow-xl cursor-pointer h-full relative"
                onMouseEnter={() => setHoveredPostId(post.id)}
                onMouseLeave={() => setHoveredPostId(null)}
              >
                {/* Fixed Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/5">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10" />

                  {/* Category Pill Tag */}
                  <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-black/75 backdrop-blur-md text-white border border-white/10 text-[8px] sm:text-[9px] font-black uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded tracking-wider z-20 flex items-center gap-1">
                    <Award className="w-2.5 h-2.5 text-[#E9C349]" />
                    {post.category}
                  </span>
                </div>

                {/* Text Title & Info Layout Frame */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 sm:gap-4 relative z-20">
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#E9C349]" />
                      {post.date}
                    </div>
                    <h3 className="font-bold text-sm sm:text-base md:text-lg uppercase italic tracking-tight text-gray-100 group-hover/card:text-white line-clamp-2 transition-colors duration-300 leading-snug">
                      {post.title}
                    </h3>

                    {post.desc && (
                      <p className="text-xs text-gray-400 line-clamp-2 font-normal leading-relaxed mt-0.5">
                        {post.desc}
                      </p>
                    )}
                  </div>

                  {/* See More Link */}
                  <div className="flex items-center gap-1 text-[#E9C349] group-hover/card:text-[#FFF9D2] font-black italic text-[10px] sm:text-[11px] tracking-widest uppercase transition-colors duration-300 mt-auto pt-1">
                    <span>See Full Story</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                  </div>
                </div>

                {/* Accent Top Decorative Border Highlight */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-[#E9C349] transition-opacity duration-300 z-30 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />
              </MotionLink>
            );
          })}
        </motion.div>

        {/* FALLBACK LOGIC */}
        {newsPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full text-center py-16 sm:py-20 bg-white/[0.01] border border-dashed border-white/10 rounded-xl sm:rounded-2xl mx-1"
          >
            <Newspaper className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600 mx-auto mb-3 animate-pulse" />
            <p className="text-gray-500 font-bold uppercase tracking-wider text-[10px] sm:text-xs">
              No press releases found. Check back soon.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
