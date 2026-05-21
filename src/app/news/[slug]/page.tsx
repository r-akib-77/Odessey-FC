import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  ArrowLeft,
  Trophy,
  Award,
  Landmark,
  ShieldCheck,
} from "lucide-react";

export const runtime = "edge";

// ==========================================
// TYPE DEFINITION FOR INCOMING NEXT.JS ROUTE PROPS
// ==========================================
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogArticlePage({ params }: PageProps) {
  // Resolve the asynchronous route parameter object provided by Next.js App Router
  const resolvedParams = await params;
  const currentSlug = resolvedParams.slug;

  // Fetch article from Cloudflare D1
  const db = (process.env as any).DB;
  let article: any = null;

  if (db) {
    try {
      article = await db.prepare("SELECT * FROM news WHERE slug = ?").bind(currentSlug).first();
    } catch (error) {
      console.error("Error fetching article from D1:", error);
    }
  }

  // If a matching entry is missing, trigger a standard 404 page framework
  if (!article) {
    notFound();
  }

  return (
    <main className="bg-[linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.99)),url('/backgroundPicHero.png')] bg-cover bg-center bg-no-repeat bg-fixed min-h-screen w-full text-white px-3 sm:px-6 py-6 sm:py-12 md:py-20 relative">
      {/* Ambient Visual Background Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[95vw] md:w-[85vw] h-[35vh] bg-[#E9C349]/5 blur-[60px] md:blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col gap-5 sm:gap-8">
        {/* Navigation Return Elements */}
        <div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-sm font-black italic tracking-widest uppercase text-[#E9C349] hover:text-[#FFF9D2] bg-white/5 hover:bg-white/10 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-white/10 transition-all duration-300 shadow-md select-none"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Back to News Hub
          </Link>
        </div>

        {/* Article Framework Metadata Context Header */}
        <div className="flex flex-col gap-2.5 sm:gap-3 px-0.5">
          <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-bold text-gray-400 tracking-wider">
            <span className="text-[#E9C349] uppercase tracking-widest bg-[#E9C349]/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded border border-[#E9C349]/20 inline-flex items-center gap-1 text-[9px] sm:text-[10px]">
              <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {article.category}
            </span>
            <span className="w-1 h-1 bg-gray-600 rounded-full hidden sm:inline-block" />
            <span className="flex items-center gap-1 sm:gap-1.5 font-mono text-gray-400">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
              {article.date}
            </span>
          </div>

          <h1 className="font-black uppercase italic text-xl sm:text-3xl md:text-5xl tracking-tight leading-tight text-white drop-shadow-md">
            {article.title}
          </h1>

          {article.desc && (
            <p className="text-xs sm:text-base text-gray-300 font-medium max-w-3xl leading-relaxed opacity-90">
              {article.desc}
            </p>
          )}

          <div className="w-14 sm:w-20 h-1 bg-[#E9C349] rounded-full mt-1" />
        </div>

        {/* Hero Image Block Element */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden border border-white/10 bg-[#121212] shadow-2xl">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* Article Core Body Layout Block */}
        <article className="prose prose-invert max-w-none text-gray-300 font-medium text-xs sm:text-base leading-relaxed flex flex-col gap-4 sm:gap-6 px-0.5">
          <p className="first-letter:text-3xl sm:first-letter:text-4xl first-letter:font-black first-letter:text-[#E9C349] first-letter:mr-1.5 sm:first-letter:mr-2 first-letter:float-left first-letter:leading-none text-white sm:text-lg font-medium">
            {article.desc}
          </p>

          {/* Guarantee Informational Badge Tray */}
          <div className="my-2 sm:my-4 p-3 sm:p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm flex gap-3 sm:gap-4 items-start">
            <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-[#E9C349] shrink-0 p-1 bg-[#E9C349]/10 rounded-lg border border-[#E9C349]/20" />
            <div className="min-w-0">
              <h4 className="font-black uppercase italic text-[10px] sm:text-xs tracking-wider text-[#E9C349] mb-0.5">
                Odyssey FC Victory Guarantee
              </h4>
              <p className="text-[10px] sm:text-xs text-gray-400 font-normal m-0 leading-normal">
                This partnership directly supports team competitive progression
                paths, infrastructure engineering benchmarks, and local support
                programs.
              </p>
            </div>
          </div>
        </article>

        {/* Decorative Editorial Footer Block */}
        <div className="border-t border-white/10 pt-4 sm:pt-6 mt-2 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4 text-[9px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest px-0.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Landmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
            <span>Official Odyssey FC Press Release</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 text-emerald-500">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Verified Source</span>
          </div>
        </div>
      </div>
    </main>
  );
}
