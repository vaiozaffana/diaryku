import { NoteTab } from "@/components/NoteTab";
import { NoteInput } from "@/components/NoteInput";


async function getNotes() {
  const res = await fetch(" https://devscale-mockapi.fly.dev/api/collections/notes/records?filter=(user='user@vaio.com')", {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export default async function Page() {
  const { items } = await getNotes();

  return (
    <div>
      <h1 className="text-slate-100 text-2xl tracking-tighter font-bold">DiaryKu</h1>
      <h2 className="space-y-2 mt-10 ml-48 text-3xl text-slate-100 font-semibold tracking-tighter">"Make Your Diary Easy"</h2>
      <NoteInput />
      <div className="sm:grid sm:grid-cols-1 lg:grid lg:grid-cols-2">
        {items.map(({ id, content }) => {
          return <NoteTab key={id} id={id} content={content} />;
        })}
      </div>
    </div>
  );
}
