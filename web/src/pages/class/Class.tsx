import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { Class } from "./types";
import useClass from "./hooks/useClass";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import Files from "./components/Files";
import Chat from "./components/Chat";

export default function ClassPage() {
  const { classId } = useParams();
  const { getClass } = useClass();

  const [currentClass, setCurrentClass] = useState<Class | undefined>(
    undefined
  );

  useEffect(() => {
    async function getAndSetClass() {
      if (classId === undefined) {
        <Navigate to="/classes" />;
        return;
      }

      const class_ = await getClass(parseInt(classId));

      setCurrentClass(class_);
    }

    void getAndSetClass();
  }, [classId, getClass]);

  if (currentClass === undefined) {
    return <LoadingSpinner overlay />;
  }

  return (
    <div className="flex flex-col max-h-screen min-h-screen bg-off-white px-page-x py-page-y">
      <div className="flex flex-1 min-h-full max-h-full gap-[50px]">
        <div>
          <Link to={`/classes`}>
            <h1 className="mb-10 text-2xl font-bold">{currentClass.name}</h1>
          </Link>

          <Files classId={currentClass.class_id} files={currentClass.files} />
        </div>
        <Chat classId={currentClass.class_id} />
      </div>
    </div>
  );
}
