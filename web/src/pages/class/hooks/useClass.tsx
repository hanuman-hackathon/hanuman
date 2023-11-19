import { useEffect, useState } from "react";
import axios from "axios";

import { Class } from "../types";

// const mockClasses: Class[] = [
//   {
//     class_id: "12345678",
//     created_at: new Date(),
//     name: "Class 1",
//     description: "",
//     files: [
//       "File 1",
//       "File 2",
//       "File 2",
//       "File 2",
//       "File 2",
//       "File 2",
//       "File 2",
//       "File 2",
//     ],
//   },
// ];

const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? "http://localhost:8000";

export default function useClass() {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    getClasses().then((classes) => setClasses(classes));
  }, []);

  async function getClasses(): Promise<Class[]> {
    try {
      const response = await axios.get<Class[]>(SERVER_URL + "/classes");
      return response.data;
    } catch (e) {
      console.log(e);
      return [];
    }
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

  async function uploadFiles(classId: string, files: FileList) {
    try {
      const formData = new FormData();
      formData.append("class_id", classId);
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      await axios.post(SERVER_URL + "/upload_files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (e) {
      // TODO: handle
    }
  }

  return { getClasses, getClass, uploadFiles };
}
