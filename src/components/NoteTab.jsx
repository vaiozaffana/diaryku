"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PencilLine, Save, Trash2  } from "lucide-react";

export const NoteTab= ({ id, content }) => {
  const router = useRouter();
  const [onEdit, setOnEdit] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);

  async function handleDelete() {
    await fetch(`https://devscale-mockapi.fly.dev/api/collections/notes/records/${id}`, {
      method: "DELETE",
    });
    router.refresh();
  }

  async function handleSave() {
    const res = await fetch(` https://devscale-mockapi.fly.dev/api/collections/notes/records/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: currentContent }),
    });
    const data = await res.json();
    setOnEdit(false);
    router.refresh();
  }

  return (
        <div className="p-2 border-2 m-3 rounded-lg bg-wheat-brown h-[200px] border-none focus:outline-none" >
      {onEdit ? (
        <input value={currentContent} onChange={(e) => setCurrentContent(e.target.value)} className=" p-3 rounded-lg focus:outline-none" />
      ) : (
        <textarea className="bg-wheat-brown border-none focus:outline-none w-60 h-[190px] resize-none" readOnly>{currentContent}</textarea>
      )}
      <div className="flex justify-end relative bottom-[55px]">
        <div className="absolute flex">
      {onEdit ? (
        <Save size={30} className=" bg-emerald-300 text-emerald-800 p-2 rounded-lg cursor-pointer" onClick={handleSave}></Save>
      ) : (
        <PencilLine size={30} className=" bg-yellow-300 text-yellow-800 p-2 rounded-lg cursor-pointer" onClick={() => setOnEdit(true)}></PencilLine>
      )}
      <Trash2  size={30} className=" bg-rose-300 p-2 rounded-lg ml-2 cursor-pointer" onClick={handleDelete}></Trash2>
      </div>
      </div>
      </div>
  );
};
