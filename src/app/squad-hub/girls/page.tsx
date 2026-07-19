"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { Shirt, Star, Sparkles } from "lucide-react";

type Player = {
  id: number;
  name: string;
  image: string;
  number: number;
  position: string;
  foot: "Left" | "Right" | "Both";
  role: string;
};

// ==========================================
// ANIMATION VARIANTS
// ==========================================

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
    scale: 0.97,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.15,
    },
  },
};

export default function GirlsSquadHub() {
  const [filter, setFilter] = useState("All");
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const res = await fetch("/api/players?team=Girls");

        if (!res.ok) return;

        const data = await res.json();

        setPlayers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayers();
  }, []);

  const categories = ["All", "Forward", "Midfielder", "Defender", "Goalkeeper"];

  const filteredPlayers =
    filter === "All"
      ? players
      : players.filter((player) => player.position === filter);

  const isStillVisible =
    activeCardId !== null &&
    filteredPlayers.some((player) => player.id === activeCardId);

  const handleCardTouch = (id: number) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-3 py-14 text-white sm:px-5 md:py-24">
      {/* ================= Background ================= */}

      <div className="fixed inset-0 -z-20 bg-[#140814]" />

      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(18,6,20,.86), rgba(8,2,10,.98)), url('/girls-background.jpg')",
        }}
      />

      {/* Pink Glow */}

      <div className="absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-pink-500/15 blur-[140px]" />

      <div className="absolute right-0 top-1/3 h-[300px] w-[300px] rounded-full bg-fuchsia-500/10 blur-[120px]" />

      <div className="absolute bottom-20 left-0 h-[250px] w-[250px] rounded-full bg-rose-400/10 blur-[100px]" />

      {/* Decorative Sparkles */}

      <Sparkles className="absolute right-12 top-28 h-8 w-8 text-pink-300/30" />
      <Sparkles className="absolute bottom-20 left-10 h-6 w-6 text-fuchsia-300/20" />

      {/* ================= Content ================= */}

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 md:w-[80vw]">
        {/* ================= Heading ================= */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left"
        >
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.35em] text-pink-300 md:text-sm">
            Girl&rsquo;s First Team
          </span>

          <h1 className="inline-block bg-gradient-to-r from-pink-400 via-fuchsia-200 to-pink-500 bg-clip-text pr-2 text-4xl font-extrabold italic uppercase tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Odyssey FC Girls
          </h1>

          <p className="mt-3 max-w-2xl text-sm text-gray-300 md:text-base">
            Meet the talented athletes representing Odyssey FC Women. Strength,
            teamwork and determination define every match.
          </p>

          <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-400 to-transparent" />
        </motion.div>
        {/* ================= Position Filters ================= */}

    <div className="w-full overflow-x-auto no-scrollbar border-b border-pink-400/10 pb-2 px-1.5">
  <div className="flex gap-2 sm:gap-4 min-w-max">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => {
          setActiveCardId(null);
          setFilter(cat);
        }}
        className={`px-4 sm:px-5 py-2 rounded-full font-extrabold italic text-[11px] sm:text-xs uppercase tracking-widest transition-all duration-300 focus:outline-none border ${
          filter === cat
            ? "bg-pink-500 text-white border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.35)]"
            : "bg-white/5 text-gray-300 border-white/10 hover:text-white hover:bg-white/10 hover:border-pink-400/40"
        }`}
      >
        {cat === "All" ? "All Players" : `${cat}s`}
      </button>
    ))}
  </div>
</div>

        {/* ================= Squad Grid ================= */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid min-h-[420px] grid-cols-2 gap-3 px-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    className="aspect-[3/4] animate-pulse rounded-3xl border border-pink-400/10 bg-[#17101B]"
                  />
                ))
              : filteredPlayers.map((player) => {
                  const isActivated =
                    activeCardId === player.id &&
                    filteredPlayers.some((p) => p.id === player.id);

                  return (
                    <motion.div
                      key={player.id}
                      layout="position"
                      variants={cardVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      whileHover={{
                        y: -8,
                        
                      }}
                      onClick={() => handleCardTouch(player.id)}
                      className="
group/card relative
aspect-[3/4]
cursor-pointer
overflow-hidden
rounded-xl sm:rounded-2xl
border border-pink-400/15
bg-[#17101B]/90
shadow-xl sm:shadow-2xl
backdrop-blur-xl
transition-all duration-300
hover:border-pink-400
hover:shadow-[0_0_35px_rgba(236,72,153,.25)]
"
                    >
                      {/* ================= Player Image ================= */}

                      <div className="absolute inset-0">
                        <Image
                          src={player.image}
                          alt={player.name}
                          fill
                          priority={player.id <= 4}
                          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                          className={`object-cover object-top transition-all duration-500

                        ${isActivated ? "scale-105" : "group-hover/card:scale-105"}
                        `}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#090509] via-black/35 to-transparent" />
                      </div>

                      {/* ================= Captain Badge ================= */}

                      {player.role.toLowerCase().includes("captain") && (
                        <div className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-white shadow-xl">
                          <Star className="h-3 w-3 fill-current" />
                          {player.role}
                        </div>
                      )}

                      {/* ================= Giant Jersey Number ================= */}

                      <span
                        className={`absolute right-3 top-2 z-10 select-none font-mono text-[4.5rem]
sm:text-[6rem]
 font-black italic leading-none transition-all duration-500

                      ${
                        isActivated
                          ? "text-pink-400/10"
                          : "text-white/5 group-hover/card:text-pink-400/10"
                      }
                      `}
                      >
                        {player.number}
                      </span>
                   

               {/* ================= Player Content ================= */}

<div className="absolute inset-0 z-20 flex flex-col justify-end overflow-hidden p-3 sm:p-5 lg:p-6">
  {/* Player Info */}

  <div
    className={`flex flex-col gap-1 transition-transform duration-300 ease-out ${
      isActivated
        ? "translate-y-[-78px] sm:translate-y-[-48px]"
        : "translate-y-0 group-hover/card:translate-y-[-78px] sm:group-hover/card:translate-y-[-48px]"
    }`}
  >
    <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.35em] text-pink-300">
      {player.position}
    </span>

    <div className="flex items-end justify-between gap-2">
      <h3
        className="
          flex-1
          break-words
          pr-1
          text-sm
          sm:text-lg
          md:text-2xl
          font-black
          italic
          uppercase
          leading-tight
          text-white
          drop-shadow-lg
        "
      >
        {player.name}
      </h3>

      <div
        className={`flex h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 shrink-0 items-center justify-center rounded border bg-black/80 font-mono text-[10px] sm:text-xs lg:text-sm font-black shadow-lg transition-all duration-300 ${
          isActivated
            ? "border-pink-400 text-pink-300"
            : "border-pink-400/30 text-pink-300 group-hover:border-pink-400"
        }`}
      >
        #{player.number}
      </div>
    </div>
  </div>

  {/* ================= Stats Tray ================= */}
  <div
  className={`absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-5 sm:right-5 rounded-lg sm:rounded-xl border-t border-pink-400/10 bg-black/75 px-3 py-2 sm:px-4 sm:py-3 transition-transform duration-300 ${
    isActivated
      ? "translate-y-0"
      : "translate-y-32 group-hover/card:translate-y-0"
  }`}
>
  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex flex-col">
      <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-gray-400">
        Foot
      </span>

      <span className="text-xs font-black uppercase italic text-pink-300">
        {player.foot === "Left"
          ? "Left 🦶"
          : player.foot === "Right"
            ? "Right 🦶"
            : "Dual ⚡"}
      </span>
    </div>

    <div className="flex flex-col sm:items-end">
      <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-gray-400">
        Role
      </span>

      <p className="text-xs font-black uppercase italic text-white sm:text-right">
        {player.role}
      </p>
    </div>
  </div>
</div>

</div>
               

                     {/* ================= Hover Accent ================= */}

<div
  className={`absolute left-0 right-0 top-0 z-30 h-[3px] bg-gradient-to-r from-pink-500 via-fuchsia-400 to-pink-500 transition-opacity duration-300 ${
    isActivated
      ? "opacity-100"
      : "opacity-0 group-hover/card:opacity-100"
  }`}
/>
                    </motion.div>
                  );
                })}
          </AnimatePresence>
        </motion.div>
        {/* ================= Empty State ================= */}

        {!loading && filteredPlayers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mx-1 rounded-3xl border border-pink-400/10 bg-[#17101B]/80 px-8 py-20 text-center backdrop-blur-xl"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20">
              <Shirt className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" />
            </div>

            <h3 className="mb-3 text-xl font-black uppercase tracking-wider text-white">
              No Players Found
            </h3>

            <p className="mx-auto max-w-md text-sm leading-7 text-gray-400">
              There are currently no registered players in this category. Please
              select another position or check back later.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
