import { useEffect, useState } from "react";
import { Class } from "../types";

const mockClasses: Class[] = [
  {
    class_id: "12345678",
    created_at: new Date(),
    name: "Class 1",
    description: "",
    files: [
      "File 1",
      "File 2",
      "File 2",
      "File 2",
      "File 2",
      "File 2",
      "File 2",
      "File 2",
    ],
  },
];

export default function useClass() {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    getClasses().then((classes) => setClasses(classes));
  }, []);

  async function getClasses(): Promise<Class[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockClasses;
  }

  async function getClass(classId: string): Promise<Class | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    for (const class_ of classes) {
      if (class_.class_id === classId) {
        return class_;
      }
    }

    return undefined;
  }

  return { getClasses, getClass };
}
