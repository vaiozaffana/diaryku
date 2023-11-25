"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export const NoteInput = () => {
  const router = useRouter();
  const [note, setNote] = useState("");

  async function makeNote() {
    const res = await fetch("https://devscale-mockapi.fly.dev/api/collections/notes/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: note, user: "user@vaio.com", additionalData: "" }),
    });
    const data = await res.json();
    console.log(data);
    router.refresh();
  }

  return (
    <div className="flex lg:space-y-2 sm:my-10 lg:my-10 lg:mx-40">
      <input className="rounded-lg lg:px-2 md:ml-10 lg:w-96 focus:outline-none  bg-wheat-brown " onChange={(e) => setNote(e.target.value)} />
      <Plus size={45} className="m-6 bg-wheat-brown rounded-full p-2 font-semibold " onClick={makeNote}>Add</Plus>
    </div>
  );
};
