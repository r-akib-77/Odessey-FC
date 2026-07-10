"use client";

import { useState, useEffect } from "react";
import { Player } from "./types/player";
import PlayerForm from "./components/PlayerForm";
import PlayerTable from "./components/PlayerTable";

export default function AdminPlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [editing, setEditing] = useState<Player | null>(null);

  async function loadPlayers() {
    const res = await fetch("/api/players");
    const data = await res.json();
    setPlayers(data);
  }

  useEffect(() => {
    loadPlayers();
  }, []);

  return (
    <main className="min-h-screen p-1 bg-zinc-950 text-white ">
      <div className="flex justify-between items-center mb-8"></div>

      <PlayerForm
        editing={editing}
        refresh={loadPlayers}
        clear={() => setEditing(null)}
      />

      <PlayerTable
        players={players}
        onEdit={setEditing}
        refresh={loadPlayers}
      />
    </main>
  );
}
