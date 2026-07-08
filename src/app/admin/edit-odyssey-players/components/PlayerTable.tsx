"use client";

import Image from "next/image";
import { Player } from "../types/player";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface PlayerTableProps {
  players: Player[];
  onEdit: (player: Player) => void;
  refresh: () => void;
}

export default function PlayerTable({
  players,
  onEdit,
  refresh,
}: PlayerTableProps) {
  const handleDelete = async () => {
    if (!deletePlayer) return;

    setDeleting(true);

    try {
      await fetch(`/api/players/${deletePlayer.id}`, {
        method: "DELETE",
      });

      refresh();
      setDeletePlayer(null);
    } finally {
      setDeleting(false);
    }
  };

  const [deletePlayer, setDeletePlayer] = useState<Player | null>(null);
  const [deleting, setDeleting] = useState(false);

  if (players.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900 p-10 my-4  text-center">
        <h3 className="text-lg font-bold text-white">No Players Found</h3>

        <p className="mt-2 text-sm text-zinc-400">
          Add your first player to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Mobile Cards */}

        <div className="space-y-4 lg:hidden">
          {players.map((player) => (
            <div
              key={player.id}
              className="rounded-2xl border border-white/10 bg-zinc-900 p-4"
            >
              <div className="flex gap-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-xl">
                  <Image
                    src={player.image}
                    alt={player.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {player.name}
                    </h3>

                    <p className="text-sm text-zinc-400">#{player.number}</p>
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-zinc-500">Position</span>

                      <p className="font-semibold text-white">
                        {player.position}
                      </p>
                    </div>

                    <div>
                      <span className="text-zinc-500">Foot</span>

                      <p className="font-semibold text-white">{player.foot}</p>
                    </div>

                    <div>
                      <span className="text-zinc-500">Role</span>

                      <p className="font-semibold text-white">{player.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => onEdit(player)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-500 py-3 font-semibold text-black transition hover:bg-yellow-400"
                >
                  <Pencil size={18} />
                  Edit
                </button>

                <button
                  onClick={() => setDeletePlayer(player)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-500"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}

        <div className="hidden overflow-hidden rounded-2xl border border-white/10 lg:block">
          <table className="w-full">
            <thead className="bg-zinc-900">
              <tr className="text-left text-sm uppercase text-zinc-400">
                <th className="px-6 py-4">Image</th>

                <th>Name</th>

                <th>Number</th>

                <th>Position</th>

                <th>Role</th>

                <th>Foot</th>

                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {players.map((player) => (
                <tr
                  key={player.id}
                  className="border-t border-white/5 bg-zinc-950"
                >
                  <td className="px-6 py-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-xl">
                      <Image
                        src={player.image}
                        alt={player.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>

                  <td className="font-semibold text-white">{player.name}</td>

                  <td>#{player.number}</td>

                  <td>{player.position}</td>

                  <td>{player.role}</td>

                  <td>{player.foot}</td>

                  <td>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onEdit(player)}
                        className="rounded-lg bg-yellow-500 p-2 text-black transition hover:bg-yellow-400"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => setDeletePlayer(player)}
                        className="rounded-lg bg-red-600 p-2 transition hover:bg-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deletePlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border border-red-500/20 bg-zinc-900 p-6 shadow-2xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
              <Trash2 className="h-8 w-8 text-red-500" />
            </div>

            <h2 className="text-center text-2xl font-bold text-white">
              Delete Player
            </h2>

            <p className="mt-3 text-center text-zinc-400">
              Are you sure you want to delete
            </p>

            <p className="mt-1 text-center text-lg font-bold text-yellow-400">
              {deletePlayer.name}
            </p>

            <p className="mt-4 text-center text-sm text-zinc-500">
              This action cannot be undone.
            </p>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setDeletePlayer(null)}
                className="flex-1 rounded-xl border border-zinc-700 py-3 font-semibold text-white transition hover:bg-zinc-800"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded-xl bg-red-600 py-3 font-bold text-white transition hover:bg-red-500 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
