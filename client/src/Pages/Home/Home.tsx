import { NoteForm } from "@/components/create-note-form";
import { DialogBox } from "@/components/Dialog-box";
import { UserProfile } from "@/components/user-profile";
import type { Note, noteListApiData } from "@/Pages/Home/home-types";
import { useGet } from "@/utils/hooks/axios-hooks/useGet";
import { useDisclosure } from "@/utils/hooks/useDisclosure";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

export const Home = () => {
  const [selectedNote, setSelectedNote] = useState(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const {
    state: createState,
    setTrue: createTrue,
    setFalse: createFalse,
  } = useDisclosure();

  const { data: notelist } = useGet<noteListApiData>({
    queryKey: ["note-list", searchValue],
    url: "note/",
    params: {
      s: searchValue,
    },
  });

  console.log(notelist);

  const { data: singleNote } = useGet<Note>({
    queryKey: ["note-list", selectedNote],
    url: `note/${selectedNote}`,
    options: {
      enabled: !!selectedNote,
    },
  });

  console.log(notelist, "notelist data");
  return (
    <section>
      <header>
        <nav className="h-[10vh]  items-center bg-amber-900 p-2 pt-2 flex justify-between ">
          <div className="flex-1">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              className="bg-white block mx-auto rounded-md px-1 py-1.5 w-[20vw] outline-0"
              placeholder="search Notes"
            />
          </div>
          <UserProfile />
        </nav>
      </header>
      <section className="grid lg:grid-cols-4 sm:grid-cols-2 gap-2 p-2">
        <section className="border-2 h-80 flex flex-col" onClick={createTrue}>
          <IoMdAddCircleOutline
            className="flex-1 w-full hover:color-white"
            color="#82181a"
          />
          <p className="text-center font-semibold">Add note</p>
        </section>
        {notelist?.notes.map((item) => (
          <section
            className="border-2  h-80"
            onClick={() => setSelectedNote(item.id)}
          >
            <header className=" bg-amber-900 text-white text-center">
              {item.title}
            </header>
            <div className="h-[60%] p-1.5">{item.description}</div>
            <section className="px-1.5">
              <h3 className="font-semibold mb-2">category</h3>
              <div className="text-sm text-white flex gap-1 flex-wrap ">
                {item.category.map((cat) => (
                  <span
                    className="p-1 bg-red-900 rounded-2xl cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchValue(`cat:${cat.name}`);
                    }}
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </section>
          </section>
        ))}
      </section>

      {/* single note display form */}
      <DialogBox
        closeFn={() => {
          setSelectedNote(0);
        }}
        open={!!selectedNote}
        title="Test"
        className="bg-red-900"
      >
        <div>{singleNote?.title}</div>
      </DialogBox>

      {/* note creation form */}
      <DialogBox
        closeFn={createFalse}
        open={createState}
        title="Create Note"
        className="border border-red-900 bg-[#ffebcd] w-[60vw] rounded-xl"
      >
        <NoteForm closeFn={createFalse} />
      </DialogBox>
    </section>
  );
};
