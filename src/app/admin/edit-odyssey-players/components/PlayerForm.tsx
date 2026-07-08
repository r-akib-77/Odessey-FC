"use client";

import { useEffect, useState } from "react";
import { Player } from "@/app/admin/edit-odyssey-players/types/player";

interface PlayerFormProps {
  editing: Player | null;
  refresh: () => void;
  clear: () => void;
}

const defaultPlayer = {
  name: "",
  number: 0,
  position: "Forward",
  role: "",
  foot: "Right",
  image: "",
} as Omit<Player, "id">;

export default function PlayerForm({
  editing,
  refresh,
  clear,
}: PlayerFormProps) {
  const [player, setPlayer] = useState(defaultPlayer);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) {
      setPlayer({
        name: editing.name,
        number: editing.number,
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

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   setLoading(true);

  //   try {
  //     const url = editing ? `/api/players/${editing.id}` : "/api/players";

  //     const method = editing ? "PATCH" : "POST";

  //     await fetch(url, {
  //       method,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(player),
  //     });

  //     refresh();

  //     clear();

  //     setPlayer(defaultPlayer);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <form
      // onSubmit={handleSubmit}
      className="
mx-auto
w-full
max-w-md
lg:max-w-6xl
rounded-[32px]
border
border-white/10
bg-gradient-to-b
from-zinc-900
to-zinc-950
shadow-[0_20px_80px_rgba(0,0,0,.45)]
p-5
sm:p-6
py-10
lg:p-10
"
    >
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-[0.35em] text-yellow-400">
          Odyssey FC
        </span>

        <h1 className="mt-2 text-3xl font-black text-white">
          {editing ? "Edit Player" : "Add New Player"}
        </h1>

        <p className="mt-2 text-zinc-400">Manage your first-team squad.</p>
      </div>

      <div
        className="grid
grid-cols-1
gap-5
md:grid-cols-2"
      >
        {/* Name */}

        <div className="space-y-2">
          <label className="mb-2 block text-sm font-bold tracking-wide text-zinc-300">
            Player Name
          </label>

          <input
            required
            name="name"
            value={player.name}
            onChange={handleChange}
            placeholder="Rakib"
            className="
h-14
w-full
rounded-2xl
border
border-zinc-700
bg-zinc-800/70
px-5
text-white
placeholder:text-zinc-500
transition-all
duration-300
focus:border-yellow-500
focus:ring-4
focus:ring-yellow-500/20
outline-none
"
          />
        </div>

        {/* Number */}

        <div className="space-y-2">
          <label className="mb-2 block text-sm font-bold tracking-wide text-zinc-300">
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
bg-zinc-800/70
px-5
text-white
placeholder:text-zinc-500
transition-all
duration-300
focus:border-yellow-500
focus:ring-4
focus:ring-yellow-500/20
outline-none
"
          />
        </div>

        {/* Position */}

        <div className="space-y-2">
          <label className="mb-2 block text-sm font-bold tracking-wide text-zinc-300">
            Position
          </label>

          <select
            name="position"
            value={player.position}
            onChange={handleChange}
            className="h-14 w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 outline-none focus:border-yellow-500"
          >
            <option>Forward</option>
            <option>Midfielder</option>
            <option>Defender</option>
            <option>Goalkeeper</option>
          </select>
        </div>

        {/* Foot */}

        <div className="space-y-2">
          <label className="mb-2 block text-sm font-bold tracking-wide text-zinc-300">
            Preferred Foot
          </label>

          <select
            name="foot"
            value={player.foot}
            onChange={handleChange}
            className="h-14 w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 outline-none focus:border-yellow-500"
          >
            <option>Right</option>
            <option>Left</option>
            <option>Ambidextrous</option>
          </select>
        </div>

        {/* Role */}

        <div className="space-y-2 lg:col-span-2">
          <label className="mb-2 block text-sm font-bold tracking-wide text-zinc-300">
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
bg-zinc-800/70
px-5
text-white
placeholder:text-zinc-500
transition-all
duration-300
focus:border-yellow-500
focus:ring-4
focus:ring-yellow-500/20
outline-none
"
          />
        </div>

        {/* Image */}
        <div className="col-span-full flex flex-col items-center">
          <label className="mb-2 block text-sm font-bold tracking-wide text-zinc-300">
            Player Photo
          </label>

          <label
            htmlFor="image"
            className="group relative flex h-40 w-40 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-yellow-500/40 bg-zinc-800 transition hover:border-yellow-400 hover:bg-zinc-700"
          >
            {player.image ? (
              <img
                src={player.image}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-center">
                <svg
                  className="mx-auto mb-3 h-10 w-10 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                  />
                </svg>

                <p className="text-sm font-semibold text-white">Upload</p>

                <span className="text-xs text-zinc-400">JPG • PNG</span>
              </div>
            )}

            <div className="absolute inset-0 bg-black/40 opacity-0 transition group-hover:opacity-100 flex items-center justify-center">
              <span className="rounded-full bg-yellow-500 px-4 py-2 text-sm font-bold text-black">
                Change
              </span>
            </div>
          </label>

          <input
            id="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              setPlayer((prev) => ({
                ...prev,
                image: URL.createObjectURL(file),
              }));
            }}
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row">
        {editing && (
          <button
            type="button"
            onClick={() => {
              clear();
              setPlayer(defaultPlayer);
            }}
            className="h-14 w-full rounded-2xl border border-zinc-700 bg-zinc-900 font-semibold text-white hover:bg-zinc-800 sm:w-40"
          >
            Cancel
          </button>
        )}

        <button
          disabled={loading}
          className="h-14 flex-1 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-400 font-bold text-black shadow-lg transition hover:scale-[1.02]"
        >
          {loading ? "Saving..." : editing ? "Update Player" : "Add Player"}
        </button>
      </div>
    </form>
  );
}
