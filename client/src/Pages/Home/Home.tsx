import { NoteForm } from "@/components/create-note-form";
import { DialogBox } from "@/components/Dialog-box";
import { useDisclosure } from "@/utils/hooks/useDisclosure";
import { IoMdAddCircleOutline } from "react-icons/io";

export const Home = () => {
  const { state, setTrue, setFalse } = useDisclosure();
  const {
    state: createState,
    setTrue: createTrue,
    setFalse: createFalse,
  } = useDisclosure();

  return (
    <section>
      <header>
        <nav className="h-[10vh]  items-center bg-amber-900 p-2 pt-6 ">
          <div>
            <input
              type="text"
              className="bg-white block mx-auto rounded-md px-1 py-1.5 w-[20vw] outline-0"
              placeholder="search Notes"
            />
          </div>
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
        {Array.from({ length: 10 }).map(() => (
          <section className="border-2  h-80" onClick={setTrue}>
            <header className=" bg-amber-900 text-white text-center">
              Demo note
            </header>
            <div className="h-[60%] p-1.5">
              drink water and have fun Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Fuga soluta beatae, explicabo nihil eos
              similique corrupti unde deserunt tenetur, quod nesciunt inventore
              culpa cum corporis, vel nulla? Sit, repellendus explicabo.
            </div>
            <section className="px-1.5">
              <h3 className="font-semibold mb-2">category</h3>
              <div className="text-sm text-white flex gap-1 flex-wrap ">
                <span className="p-1 bg-red-900 rounded-2xl">chores</span>
                <span className="p-1 bg-red-900 rounded-2xl">gorcery</span>
                <span className="p-1 bg-red-900 rounded-2xl">
                  food and drink
                </span>
                <span className="p-1 bg-red-900 rounded-2xl">games</span>
                <span className="p-1 bg-red-900 rounded-2xl">karaoke</span>
                <span className="p-1 bg-red-900 rounded-2xl">
                  guitar and ukulele
                </span>
              </div>
            </section>
          </section>
        ))}
      </section>
      <DialogBox
        closeFn={setFalse}
        open={state}
        title="Test"
        className="bg-red-900"
      >
        this is dialog box
      </DialogBox>
      <DialogBox
        closeFn={createFalse}
        open={createState}
        title="Create Note"
        className="border border-red-900 bg-[#ffebcd] w-[60vw] rounded-xl"
      >
        <NoteForm />
      </DialogBox>
    </section>
  );
};
