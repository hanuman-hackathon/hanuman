import { useEffect, useState } from "react";
import axios from "axios";

import { Class, ClassResponse, Message, MessageResponse } from "../types";

const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? "http://localhost:8000";

export default function useClass() {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    getClasses().then((classes) => setClasses(classes));
  }, []);

  async function addClass(name: string, desc: string): Promise<ClassResponse> {
    try {
      const response = await axios.post<ClassResponse>(
        SERVER_URL + "/create_class",
        {
          name: name,
          description: desc,
        }
      );

      setClasses(response.data.classes);
      return response.data;
    } catch (e) {
      console.log(e);
      return { classes: [] };
    }
  }

  async function getClasses(): Promise<Class[]> {
    try {
      const response = await axios.get<ClassResponse>(SERVER_URL + "/classes");
      return response.data.classes;
    } catch (e) {
      return [];
    }
  }

  async function getClass(classId: number): Promise<Class | undefined> {
    for (const class_ of classes) {
      if (class_.class_id === classId) {
        return class_;
      }
    }

    return undefined;
  }

  async function getClassByName(className: string): Promise<Class | undefined> {
    console.log(classes);
    console.log(className);
    for (const class_ of classes) {
      if (class_.name === className) {
        return class_;
      }
    }

    return undefined;
  }

  async function uploadFiles(
    classId: number,
    files: FileList
  ): Promise<{ success: boolean }> {
    try {
      const formData = new FormData();
      formData.append("class_id", classId.toString());
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      await axios.post(SERVER_URL + "/upload_files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return { success: true };
    } catch (e) {
      return { success: false };
    }
  }

  async function getChatResponse(
    classId: number,
    messages: Message[]
  ): Promise<Message> {
    try {
      const response = await axios.post<MessageResponse>(SERVER_URL + "/chat", {
        class_id: classId,
        messages: messages,
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      return response.data.message;
    } catch (e) {
      return {
        role: "assistant",
        content:
          "Sorry, our servers are down right now. Please try again soon.",
      };
    }
  }

  return {
    classes,
    getClasses,
    getClassByName,
    addClass,
    getClass,
    uploadFiles,
    getChatResponse,
  };
}
