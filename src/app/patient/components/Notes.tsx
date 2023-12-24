"use client";

import type { Patient, Note } from "@/types";
import { useState, useEffect } from "react";
import { getPatientNotes, deleteNote, updateNote } from "@/actions/notes";
import Options from "@/components/Options";
import { SlOptions } from "react-icons/sl";
import { MdFileDownloadDone } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import { HiPencilAlt, HiX } from "react-icons/hi";
import { HiPlus } from "react-icons/hi2";
import { AddNote } from ".";
import { useRouter } from "next/navigation";
import moment from "moment";

export const dynamic = "force-dynamic";

type NotesProps = {
  patient: Patient;
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

const Notes = ({ patient, notes, setNotes }: NotesProps) => {
  const [newNote, setNewNote] = useState("");
  const [options, setOptions] = useState(false);
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState<number | boolean>(false);
  const router = useRouter();

  const deleteFromNotes = async (note_id: number) => {
    await deleteNote(note_id);
    const newNotes = notes.filter((note) => note.note_id !== note_id);
    setNotes(newNotes);
  };

  const handleSubmit = async (notes_id: number) => {
    await updateNote(notes_id, newNote);
    setUpdate(false);
    router.refresh();
  };

  return (
    <div>
      {add ? (
        <AddNote
          setAdd={setAdd}
          patient={patient}
          notes={notes}
          setNotes={setNotes}
        />
      ) : null}
      <ul className="border-2 border-black rounded-md overflow-auto h-48">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <span className="font-bold">Notes</span>
            {options ? (
              <button
                type="button"
                className="hover:text-blue-400"
                onClick={() => setAdd(true)}
              >
                <FaPlus />
              </button>
            ) : null}
          </div>
          <button
            type="button"
            className="flex justify-center items-center mr-2 text-xl"
            onClick={() => setOptions(!options)}
          >
            {options ? (
              <MdFileDownloadDone className="hover:text-green-500" />
            ) : (
              <SlOptions className="hover:bg-gray-800 hover:text-white rounded-md" />
            )}
          </button>
        </div>

        {notes?.map(({ note_id, note, createdAt, updatedAt }) => (
          <li className="p-2 my-2" key={note_id}>
            {update === note_id ? (
              <form
                className="flex flex-col m-2"
                action={() => handleSubmit(note_id)}
              >
                <label htmlFor="note" className="text-center font-semibold">
                  New Note
                </label>
                <input
                  type="text"
                  className="rounded-md"
                  onChange={(e) =>
                    setNewNote((e.target as HTMLInputElement).value)
                  }
                />
                <div className="flex flex-col gap-2 mt-2">
                  <button type="submit" className="bg-blue-300 rounded-md">
                    Update
                  </button>
                  <button
                    type="button"
                    className="bg-red-300 rounded-md"
                    onClick={() => setUpdate(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                {options ? (
                  <div className="flex justify-between w-full mb-2">
                    <HiPencilAlt
                      role="button"
                      className="hover:text-yellow-500"
                      onClick={() => setUpdate(note_id)}
                    />
                    <HiX
                      role="button"
                      className="hover:text-red-600"
                      onClick={() => {
                        deleteFromNotes(note_id);
                        router.refresh();
                      }}
                    />
                  </div>
                ) : null}
                <div className="bg-white rounded-md pl-2">{note}</div>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-2">
                    <p>Created</p>
                    <div>{moment(createdAt).format("L")}</div>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p>Updated</p>
                    <div>{moment(updatedAt).format("L")}</div>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
