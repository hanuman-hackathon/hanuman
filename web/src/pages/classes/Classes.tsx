import { useEffect, useState } from "react";
import useClass from "../class/hooks/useClass";
import ClassCard from "./components/ClassCard";
import { Class } from "../class/types";

export default function ClassesPage() {
  const { getClasses } = useClass();

  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    async function getAndSetClasses() {
      const classes = await getClasses();
      setClasses(classes);
    }

    void getAndSetClasses();
  }, []);

  return (
    <div className="min-h-screen bg-off-white px-page-x py-page-y">
      <h1 className="mb-10 text-2xl font-bold">Classes</h1>
      <div className="flex flex-wrap gap-5">
        {classes.map((class_) => (
          <ClassCard key={class_.class_id} {...class_} />
        ))}
      </div>
    </div>
  );
}
