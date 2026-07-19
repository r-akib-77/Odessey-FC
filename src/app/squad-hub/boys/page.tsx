"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { Shirt, Star } from "lucide-react";

const demoPlayers: Player[] = [
  {
    id: 1,
    name: "Ava Johnson",
    image: "/girls/player1.jpg",
    number: 9,
    position: "Forward",
    foot: "Right",
    role: "Captain",
  },
  {
    id: 2,
    name: "Sophia Williams",
    image: "/girls/player2.jpg",
    number: 11,
    position: "Forward",
    foot: "Left",
    role: "Striker",
  },
  {
    id: 3,
    name: "Emma Brown",
    image: "/girls/player3.jpg",
    number: 10,
    position: "Midfielder",
    foot: "Both",
    role: "Playmaker",
  },
  {
    id: 4,
    name: "Olivia Davis",
    image: "/girls/player4.jpg",
    number: 8,
    position: "Midfielder",
    foot: "Right",
    role: "Vice Captain",
  },
  {
    id: 5,
    name: "Charlotte Wilson",
    image: "/girls/player5.jpg",
    number: 6,
    position: "Defender",
    foot: "Left",
    role: "Center Back",
  },
  {
    id: 6,
    name: "Amelia Moore",
    image: "/girls/player6.jpg",
    number: 4,
    position: "Defender",
    foot: "Right",
    role: "Full Back",
  },
  {
    id: 7,
    name: "Mia Taylor",
    image: "/girls/player7.jpg",
    number: 5,
    position: "Defender",
    foot: "Both",
    role: "Sweeper",
  },
  {
    id: 8,
    name: "Harper Anderson",
    image: "/girls/player8.jpg",
    number: 1,
    position: "Goalkeeper",
    foot: "Right",
    role: "Goalkeeper",
  },
];

// ==========================================
// 2. ANIMATION VARIANTS
// ==========================================
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.02 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
};

export default function SquadHub() {
  const [filter, setFilter] = useState<string>("All");
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const res = await fetch("/api/players");
        if (res.ok) {
          const data = await res.json();
          setPlayers(data);
        }
      } catch (error) {
        console.error("Error fetching players:", error);
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

  // Check if the currently active card is still present in the filtered array list
  const isStillVisible =
    activeCardId !== null && filteredPlayers.some((p) => p.id === activeCardId);

  // If a filter switch hid the card, reset state directly during render to prevent effect loops
  if (activeCardId !== null && !isStillVisible) {
    setActiveCardId(null);
  }

  const handleCardTouch = (id: number) => {
    if (activeCardId === id) {
      setActiveCardId(null);
    } else {
      setActiveCardId(id);
    }
  };

  return (
    <main className="min-h-screen w-full text-white px-2.5 sm:px-4 py-12 md:py-24 overflow-hidden relative">
      {/* Performance-optimized fixed background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none relative"
        style={{ willChange: "transform" }}
      />
      {/* Fixed Background Image for all devices */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.85),rgba(0,0,0,0.99)),url('/backgroundPicHero.png')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[95vw] md:w-[80vw] h-[40vh] bg-[#E9C349]/5 blur-[80px] md:blur-[100px] hidden md:block rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col gap-6 md:gap-10 md:w-[80vw]">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-left px-1.5"
        >
          <span className="text-[#E9C349] font-black tracking-widest text-xs md:text-sm uppercase block mb-1">
            First Team Roster
          </span>
          <h2 className="font-extrabold italic text-3xl sm:text-4xl md:text-6xl tracking-tighter uppercase bg-gradient-to-r from-[#E9C349] via-[#FFF9D2] to-[#E9C349] text-transparent bg-clip-text drop-shadow-md inline-block pr-2">
            ODYSSEY FC SQUAD
          </h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-[#E9C349] to-transparent mt-2 mx-auto md:mx-0 rounded-full" />
        </motion.div>

        {/* Filter Navigation Menu */}
        <div className="w-full overflow-x-auto no-scrollbar border-b border-white/5 pb-2 px-1.5">
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
                    ? "bg-[#E9C349] text-black border-[#E9C349] shadow-[0_0_15px_rgba(233,195,73,0.3)]"
                    : "bg-white/5 text-gray-300 border-white/10 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat === "All" ? "All Players" : `${cat}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Fluid Responsive Player Grid Arrays */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 w-full px-1.5 min-h-[400px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredPlayers.map((player) => {
              const isActivated = activeCardId === player.id;

              return (
                <motion.div
                  key={player.id}
                  variants={cardVariants}
                  layout="position"
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  onClick={() => handleCardTouch(player.id)}
                  whileHover={{ y: -6 }}
                  className="group/card rounded-xl sm:rounded-2xl border border-white/15 hover:border-[#E9C349]/50 shadow-2xl relative aspect-[3/4] overflow-hidden bg-[#121212] transition-all duration-300 cursor-pointer select-none"
                >
                  {/* Clean Image Frame */}
                  <div className="absolute inset-0 w-full h-full relative">
                    <Image
                      src={player.image}
                      alt={player.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      priority={player.id <= 4}
                      className={`object-cover object-top transition-all duration-500 ease-out group-hover/card:scale-105 ${
                        isActivated ? "scale-105" : ""
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                  </div>

                  {/* Role Badge Overlay */}
                  {player.role.toLowerCase().includes("captain") && (
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#E9C349] text-black text-[8px] sm:text-[9px] uppercase font-black px-1.5 py-0.5 sm:px-2 rounded shadow-lg tracking-wider flex items-center gap-1 z-20">
                      <Star className="w-2 sm:w-2.5 h-2 sm:h-2.5 fill-current" />
                      {player.role}
                    </div>
                  )}

                  {/* Big Transparent Jersey Number Background */}
                  <span
                    className={`absolute right-2 sm:right-4 top-1 sm:top-2 text-[4.5rem] sm:text-[6rem] font-black italic font-mono leading-none select-none transition-all duration-500 z-10 ${
                      isActivated
                        ? "text-[#E9C349]/10"
                        : "text-white/5 group-hover/card:text-[#E9C349]/10"
                    }`}
                  >
                    {player.number}
                  </span>

                  {/* Text Info Overlay Layout */}
                  <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-5 z-20 overflow-hidden">
                    {/* Responsive Layout Shift */}
                    <div
                      className={`transition-transform duration-300 ease-out flex flex-col gap-0.5 sm:gap-1 w-full ${
                        isActivated
                          ? "translate-y-[-78px] sm:translate-y-[-48px]"
                          : "translate-y-0 group-hover/card:translate-y-[-78px] sm:group-hover/card:translate-y-[-48px]"
                      }`}
                    >
                      <span className="text-[#E9C349] font-black tracking-widest text-[8px] sm:text-[10px] uppercase block select-none">
                        {player.position}
                      </span>

                      <div className="flex items-end justify-between gap-2 w-full">
                        <h3 className="font-black text-sm sm:text-lg md:text-2xl uppercase italic tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] leading-tight whitespace-normal break-words flex-1 min-w-0 pr-1">
                          {player.name}
                        </h3>
                        <div
                          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/80 flex items-center justify-center font-mono font-black text-[10px] sm:text-xs shadow-md shrink-0 transition-all duration-300 mb-0.5 border ${
                            isActivated
                              ? "border-[#E9C349] text-[#E9C349]"
                              : "border-[#E9C349]/30 text-[#E9C349] group-hover/card:border-[#E9C349]"
                          }`}
                        >
                          #{player.number}
                        </div>
                      </div>
                    </div>

                    {/* Stats Tray */}
                    <div
                      className={`absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-5 sm:right-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5 sm:gap-0 transition-transform duration-300 ease-out border-t border-white/10 pt-2 sm:pt-3 bg-black/75 backdrop-blur-md mobile-low-blur rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-2 ${
                        isActivated
                          ? "translate-y-0"
                          : "translate-y-28 group-hover/card:translate-y-0"
                      }`}
                    >
                      <div className="flex sm:flex-col justify-between sm:justify-start items-center sm:items-start border-b border-white/5 sm:border-none pb-1 sm:pb-0 min-w-0">
                        <span className="text-[8px] sm:text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                          FOOT
                        </span>
                        <span className="text-[10px] sm:text-xs font-black uppercase text-[#E9C349] italic whitespace-nowrap pr-1">
                          {player.foot === "Left"
                            ? "Left 🦶"
                            : player.foot === "Right"
                              ? "Right 🦶"
                              : "Dual ⚡"}
                        </span>
                      </div>

                      <div className="flex sm:flex-col justify-between sm:justify-start items-center sm:items-end min-w-0">
                        <span className="text-[8px] sm:text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                          ROLE
                        </span>
                        <span className="text-[10px] sm:text-xs font-black text-white uppercase italic whitespace-nowrap pr-1 max-w-[100px] sm:max-w-[110px] truncate">
                          {player.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] bg-[#E9C349] transition-opacity duration-300 z-30 ${
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

        {/* Fallback View State */}
        {filteredPlayers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full text-center py-20 bg-white/[0.01] border border-dashed border-white/10 rounded-2xl mx-1.5"
          >
            <Shirt className="w-10 h-10 text-gray-600 mx-auto mb-3 animate-bounce" />
            <p className="text-gray-500 font-bold uppercase tracking-wider text-xs">
              No active squad members assigned here yet.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
