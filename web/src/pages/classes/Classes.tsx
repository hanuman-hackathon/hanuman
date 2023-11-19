import { useEffect, useRef, useState } from "react";
import useClass from "../class/hooks/useClass";
import ClassCard from "./components/ClassCard";
import { Class } from "../class/types";
import PlusIcon from "./assets/PlusIcon";
import { useNavigate } from "react-router-dom";

export default function ClassesPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [newClassName, setNewClassName] = useState("");

  const { addClass, getClassByName, classes } = useClass();

  async function submitCreateClass(name: string) {
    await addClass(name);
    setOpen(false);

    // set small delay to allow state to update
    await new Promise((resolve) => setTimeout(resolve, 100));

    const class_ = await getClassByName(name);

    if (class_) {
      navigate("/class/" + class_.class_id);
    }
  }

  return (
    <div className="relative min-h-screen bg-off-white px-page-x py-page-y">
      <h1 className="mb-10 text-2xl font-bold">Classes</h1>
      <div className="flex flex-wrap gap-5">
        {classes.map((class_) => (
          <ClassCard key={class_.class_id} {...class_} />
        ))}
        <div
          className="w-[380px] h-[200px] bg-white rounded-xl shadow-standard px-8 py-6 flex justify-center items-center gap-4 flex-col cursor-pointer"
          onClick={() => {
            setOpen(true);
          }}
        >
          <span className="text-[20px] font-bold">Add Class</span>
          <PlusIcon />
        </div>
      </div>
      {open && (
        <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-70">
          <div className="w-[500px] gap-5 bg-white rounded-xl px-8 py-6 flex flex-col">
            <span className="text-[20px] font-bold">Add Class</span>
            <input
              type="text"
              placeholder="Class Name"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              className="w-full h-[50px] bg-gray-100 rounded-md px-4"
            />
            <div className="flex gap-4">
              <button
                className="w-full h-[50px] bg-gray-100 rounded-md flex justify-center items-center"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="w-full h-[50px] bg-blue-500 rounded-md text-white flex justify-center items-center"
                onClick={() => submitCreateClass(newClassName)}
              >
                Add Class
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
