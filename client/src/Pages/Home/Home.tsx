import { NoteForm } from "@/components/create-note-form";
import { DialogBox } from "@/components/Dialog-box";
import { UserProfile } from "@/components/user-profile";
import type { Note, noteListApiData } from "@/Pages/Home/home-types";
import { useGet } from "@/utils/hooks/axios-hooks/useGet";
import { useDisclosure } from "@/utils/hooks/useDisclosure";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useDelete } from "@/utils/hooks/axios-hooks/useDelete";
import { toast } from "react-toastify";
import { UpdateNoteForm } from "@/components/update-note-form";
import { CategoryBox } from "@/components/categoryBox";
import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/utils/axios";
import {
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks/redux-hook/store-hooks";
import { Button } from "@/components/Button";
import { setUserInfo } from "@/utils/redux/userInfo-slice";

export const Home = () => {
  const token = useAppSelector((s) => s.accessToken.value);
  const dispatcher = useAppDispatch();
  const [selectedNote, setSelectedNote] = useState<number>(0);
  const [selectedNoteToEdit, setSelectedNoteToEdit] = useState<Note>();
  const [selectedNoteToDelete, setSelectedNoteToDelete] = useState<Note | 0>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const {
    state: createState,
    setTrue: createTrue,
    setFalse: createFalse,
  } = useDisclosure();

  const { data: userInfo } = useGet<{
    userInfo: {
      email: string;
      userName: string;
    };
    noteCount: number;
    categories: {
      name: string;
      id: number;
      userID: string;
    }[];
  }>({
    queryKey: ["user-info"],
    url: "/user/userInfo",
  });

  useEffect(() => {
    console.log(userInfo);
    if (userInfo) {
      dispatcher(setUserInfo(userInfo));
    }
  }, [dispatcher, userInfo]);

  const { data: singleNote } = useGet<Note>({
    url: `note/${selectedNote}`,
    queryKey: [selectedNote, "single-note"],
    options: {
      enabled: !!selectedNote,
    },
  });

  const {
    data: noteList,
    refetch: getAllList,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<noteListApiData>({
    queryKey: ["note-list", searchValue],
    queryFn: async ({ pageParam }) => {
      const data = await api.get("note/", {
        params: {
          s: searchValue,
          pageNo: pageParam,
        },
        headers: {
          Authorization: `"bearer ${token}`,
        },
      });
      return data.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.count <= allPages.length * 5) return undefined;
      return allPages.length; // next page number
    },
  });

  const { mutate: deleteFn } = useDelete<unknown, { id: number }>({
    url: "note/",
    options: {
      onSuccess: () => {
        toast.success("data deleted successfully");
        getAllList();
        setSelectedNoteToDelete(0);
      },
      onError: (data) => {
        toast.error(data.response?.data.message);
      },
    },
  });

  return (
    <section>
      <header>
        <nav className="h-[10vh]  items-center bg-amber-900  pt-2  flex justify-between gap-2 px-4 ">
          <div className="flex-1">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              className="bg-white block mx-auto rounded-md px-2 py-1.5 w-full md:w-[40vw] outline-0"
              placeholder="Search notes"
            />
          </div>
          <UserProfile />
        </nav>
      </header>

      <section className="grid lg:grid-cols-4 sm:grid-cols-2 gap-2 p-2">
        <section
          className="border-2 h-80 flex flex-col cursor-pointer"
          onClick={createTrue}
        >
          <IoMdAddCircleOutline
            className="flex-1 w-full hover:color-white"
            color="#82181a"
          />
          <p className="text-center font-semibold">Add note</p>
        </section>
        {noteList?.pages.map((item) =>
          item.notes.map((item) => (
            <section
              className="border-2  h-80"
              onClick={() => setSelectedNote(item.id)}
            >
              <header className=" bg-amber-900 text-white text-center">
                {item.title}
              </header>
              <div className="h-[60%] p-1.5">{item.description}</div>
              <section className="px-1.5">
                <h3 className="font-semibold mb-2">Category</h3>
                <div className="text-sm text-white flex gap-1 flex-wrap ">
                  {item.category.map((cat) => (
                    <CategoryBox
                      categoryName={cat.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchValue(`cat:${cat.name}`);
                      }}
                    />
                  ))}
                </div>
                <div className="p-2">
                  <MdDelete
                    className="float-right cursor-pointer"
                    color="red"
                    size={24}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNoteToDelete(item);
                    }}
                  />
                  <AiFillEdit
                    size={24}
                    color="green"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNoteToEdit(item);
                    }}
                  />
                </div>
              </section>
            </section>
          ))
        )}
      </section>
      <footer>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
          className="block mx-auto bg-white border-2 rounded-4xl cursor-pointer hover:bg-gray-100 transition-colors w-fit p-2 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          load more
        </button>
      </footer>

      {/* single note display form */}
      <DialogBox
        closeFn={() => {
          setSelectedNote(0);
        }}
        open={!!selectedNote}
        title={singleNote?.title ?? ""}
        className="bg-[#ffebcd] border-2 border-red-900 p-2"
      >
        <div>{singleNote?.description}</div>
        <div className="flex gap-2">
          {singleNote?.category.map((cat) => (
            <CategoryBox categoryName={cat.name} />
          ))}
        </div>
        <div className="float-right cursor-pointer">
          <MdDelete size={24} color="red" />
        </div>
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

      {/* delete dialogBox */}
      <DialogBox
        closeFn={() => {
          setSelectedNoteToDelete(0);
        }}
        open={!!selectedNoteToDelete}
        title="delete Note"
        className="border border-red-900 bg-[#ffebcd] w-[30vw] rounded-xl p-2"
      >
        <div>Are you sure you want to delete this note?</div>
        {selectedNoteToDelete && (
          <div className="border-2 mb-2">
            <p className="bg-amber-900 text-white text-center">
              {selectedNoteToDelete.title}
            </p>
            <p className="p-2">{selectedNoteToDelete.description}</p>
            <div className="flex flex-wrap gap-2 p-2">
              {selectedNoteToDelete.category.map((item) => (
                <CategoryBox categoryName={item.name} />
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-between">
          <Button
            text="Yes"
            type="button"
            onClick={() => {
              if (selectedNoteToDelete)
                deleteFn({ id: selectedNoteToDelete.id });
            }}
          />
          <Button text="No" type="button" className="!bg-green-800 !border-0" />
        </div>
      </DialogBox>

      {/* edit dialogBox */}
      <DialogBox
        closeFn={() => {
          setSelectedNoteToEdit(undefined);
        }}
        open={!!selectedNoteToEdit}
        title="Edit Note"
        className="border border-red-900 bg-[#ffebcd] w-[60vw] rounded-xl p-2"
      >
        {selectedNoteToEdit && (
          <UpdateNoteForm
            closeFn={() => setSelectedNoteToEdit(undefined)}
            initialData={selectedNoteToEdit}
          />
        )}
      </DialogBox>
    </section>
  );
};
