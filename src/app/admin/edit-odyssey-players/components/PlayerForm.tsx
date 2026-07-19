"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  User,
  Hash,
  Users,
  Goal,
  Footprints,
  Star,
  ImagePlus,
  Save,
  X,
} from "lucide-react";

import { Player } from "@/app/admin/edit-odyssey-players/types/player";

interface PlayerFormProps {
  editing: Player | null;
  refresh: () => void;
  clear: () => void;
}

const defaultPlayer = {
  name: "",
  number: 0,
  team: "Boys",
  position: "Forward",
  role: "",
  foot: "Right",
  image: "",
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

export default function PlayerForm({
  editing,
  refresh,
  clear,
}: PlayerFormProps) {
  const [player, setPlayer] = useState(defaultPlayer);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) {
      setPlayer({
        name: editing.name,
        number: editing.number,
        team: editing.team,
        position: editing.position,
        role: editing.role,
        foot: editing.foot,
        image: editing.image,
      });
    } else {
      setPlayer(defaultPlayer);
    }
  }, [editing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setPlayer((prev) => ({
      ...prev,
      [name]: name === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      let imageUrl = player.image;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (uploadData.url) {
          imageUrl = uploadData.url;
        }
      }

      const payload = {
        ...player,
        image: imageUrl,
      };

      const url = editing ? `/api/players/${editing.id}` : "/api/players";

      const method = editing ? "PATCH" : "POST";

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      refresh();
      clear();

      setPlayer(defaultPlayer);
      setFile(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      variants={fadeUp}
      initial="hidden"
      animate="show"
      onSubmit={handleSubmit}
      className="
      mx-auto
      w-full
      max-w-7xl
      rounded-[36px]
      border
      border-yellow-500/15
      bg-[radial-gradient(circle_at_top,#27272a,transparent_70%),linear-gradient(to_bottom,#18181b,#09090b)]
      p-6
      shadow-[0_30px_80px_rgba(0,0,0,.45)]
      lg:p-10
      "
    >
      {/* Header */}

      <div className="mb-10 border-b border-white/10 pb-8">
        <span className="text-xs font-black uppercase tracking-[0.35em] text-yellow-400">
          Odyssey FC
        </span>

        <h1 className="mt-3 text-4xl font-black text-white">
          {editing ? "Edit Player" : "Add New Player"}
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-400">
          Create and manage your Boys and Girls squads from a single dashboard.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_420px]">
        {/* LEFT SIDE */}

        <div className="space-y-8">
          {/* PLAYER INFORMATION */}

          <motion.div
            variants={fadeUp}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-500/10">
                <User className="h-5 w-5 text-yellow-400" />
              </div>

              <div>
                <h2 className="font-bold text-white">Player Information</h2>

                <p className="text-sm text-zinc-500">Basic player details</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* NAME */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                  <User size={16} />
                  Player Name
                </label>

                <input
                  required
                  name="name"
                  value={player.name}
                  onChange={handleChange}
                  placeholder="Rakib Hasan"
                  className="
                  h-14
                  w-full
                  rounded-2xl
                  border
                  border-zinc-700
                  bg-zinc-900/60
                  px-5
                  text-white
                  outline-none
                  transition
                  focus:border-yellow-500
                  focus:ring-4
                  focus:ring-yellow-500/20
                  "
                />
              </div>

              {/* NUMBER */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                  <Hash size={16} />
                  Jersey Number
                </label>

                <input
                  required
                  type="number"
                  name="number"
                  value={player.number}
                  onChange={handleChange}
                  className="
                  h-14
                  w-full
                  rounded-2xl
                  border
                  border-zinc-700
                  bg-zinc-900/60
                  px-5
                  text-white
                  outline-none
                  transition
                  focus:border-yellow-500
                  focus:ring-4
                  focus:ring-yellow-500/20
                  "
                />
              </div>

              {/* TEAM */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                  <Users size={16} />
                  Team
                </label>

                <select
                  name="team"
                  value={player.team}
                  onChange={handleChange}
                  className="
                  h-14
                  w-full
                  rounded-2xl
                  border
                  border-zinc-700
                  bg-zinc-900/60
                  px-5
                  text-white
                  outline-none
                  transition
                  focus:border-yellow-500
                  focus:ring-4
                  focus:ring-yellow-500/20
                  "
                >
                  <option value="Boys">⚽ Boys Team</option>
                  <option value="Girls">🌸 Girls Team</option>
                </select>
              </div>

              {/* POSITION */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                  <Goal size={16} />
                  Position
                </label>

                <select
                  name="position"
                  value={player.position}
                  onChange={handleChange}
                  className="
                  h-14
                  w-full
                  rounded-2xl
                  border
                  border-zinc-700
                  bg-zinc-900/60
                  px-5
                  text-white
                  outline-none
                  transition
                  focus:border-yellow-500
                  focus:ring-4
                  focus:ring-yellow-500/20
                  "
                >
                  <option>Forward</option>
                  <option>Midfielder</option>
                  <option>Defender</option>
                  <option>Goalkeeper</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* FOOTBALL DETAILS */}

          <motion.div
            variants={fadeUp}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-500/10">
                <Footprints className="h-5 w-5 text-yellow-400" />
              </div>

              <div>
                <h2 className="font-bold text-white">Football Details</h2>

                <p className="text-sm text-zinc-500">Playing information</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Preferred Foot */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                  <Footprints size={16} />
                  Preferred Foot
                </label>

                <select
                  name="foot"
                  value={player.foot}
                  onChange={handleChange}
                  className="
                  h-14
                  w-full
                  rounded-2xl
                  border
                  border-zinc-700
                  bg-zinc-900/60
                  px-5
                  text-white
                  outline-none
                  transition
                  focus:border-yellow-500
                  focus:ring-4
                  focus:ring-yellow-500/20
                  "
                >
                  <option>Right</option>
                  <option>Left</option>
                  <option>Ambidextrous</option>
                </select>
              </div>

              {/* Role */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                  <Star size={16} />
                  Player Role
                </label>

                <input
                  required
                  name="role"
                  value={player.role}
                  onChange={handleChange}
                  placeholder="Captain"
                  className="
                  h-14
                  w-full
                  rounded-2xl
                  border
                  border-zinc-700
                  bg-zinc-900/60
                  px-5
                  text-white
                  outline-none
                  transition
                  focus:border-yellow-500
                  focus:ring-4
                  focus:ring-yellow-500/20
                  "
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE */}

        <motion.div
          variants={fadeUp}
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-6
          "
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-500/10">
              <ImagePlus className="h-5 w-5 text-yellow-400" />
            </div>

            <div>
              <h2 className="font-bold text-white">Player Photo</h2>

              <p className="text-sm text-zinc-500">
                Upload a high-quality portrait.
              </p>
            </div>
          </div>

          <label
            htmlFor="image"
            className="
            group
            relative
            flex
            h-[480px]
            w-full
            cursor-pointer
            items-center
            justify-center
            overflow-hidden
            rounded-[28px]
            border-2
            border-dashed
            border-yellow-500/30
            bg-gradient-to-b
            from-zinc-800
            to-zinc-900
            transition-all
            duration-300
            hover:border-yellow-400
            "
          >
            {player.image ? (
              <>
                <img
                  src={player.image}
                  alt={player.name || "Player"}
                  className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-105
                  "
                />

                <div
                  className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/20
                  to-transparent
                  "
                />

                <div
                  className="
                  absolute
                  bottom-6
                  left-6
                  right-6
                  rounded-2xl
                  bg-black/50
                  p-4
                  backdrop-blur-md
                  "
                >
                  <p className="text-lg font-bold text-white">
                    {player.name || "Player Name"}
                  </p>

                  <p className="mt-1 text-sm text-zinc-300">
                    {player.team} • #{player.number || 0}
                  </p>
                </div>

                <div
                  className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  bg-black/45
                  opacity-0
                  transition
                  group-hover:opacity-100
                  "
                >
                  <span
                    className="
                    rounded-full
                    bg-yellow-500
                    px-6
                    py-3
                    text-sm
                    font-bold
                    text-black
                    shadow-xl
                    "
                  >
                    Change Photo
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div
                  className="
                  mb-6
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-yellow-500/10
                  "
                >
                  <ImagePlus className="h-10 w-10 text-yellow-400" />
                </div>

                <h3 className="text-xl font-bold text-white">
                  Upload Player Photo
                </h3>

                <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-400">
                  Drag & drop or click to upload a portrait image. Recommended
                  size: 1000×1400px.
                </p>

                <span
                  className="
                  mt-8
                  rounded-full
                  bg-yellow-500
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-black
                  "
                >
                  Choose Image
                </span>
              </div>
            )}
          </label>

          <input
            id="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];

              if (!selectedFile) return;

              setFile(selectedFile);

              const preview = URL.createObjectURL(selectedFile);

              setPlayer((prev) => ({
                ...prev,
                image: preview,
              }));
            }}
          />
        </motion.div>
      </div>
      {/* Bottom Actions */}

      <motion.div
        variants={fadeUp}
        className="
        mt-10
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        p-6
        "
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Ready to Save?</h3>

            <p className="mt-1 text-sm text-zinc-400">
              Review the information before saving the player.
            </p>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            {editing && (
              <button
                type="button"
                onClick={() => {
                  clear();
                  setPlayer(defaultPlayer);
                  setFile(null);
                }}
                className="
                flex
                h-14
                items-center
                justify-center
                gap-2
                rounded-2xl
                border
                border-zinc-700
                bg-zinc-900
                px-8
                font-semibold
                text-white
                transition
                hover:bg-zinc-800
                "
              >
                <X size={18} />
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
              flex
              h-14
              min-w-[220px]
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-yellow-500
              via-yellow-400
              to-yellow-500
              px-10
              font-black
              tracking-wide
              text-black
              shadow-[0_15px_40px_rgba(234,179,8,.35)]
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:shadow-[0_20px_60px_rgba(234,179,8,.45)]
              disabled:cursor-not-allowed
              disabled:opacity-60
              disabled:hover:scale-100
              "
            >
              <Save size={18} />

              {loading ? "Saving..." : editing ? "Update Player" : "Add Player"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.form>
  );
}
