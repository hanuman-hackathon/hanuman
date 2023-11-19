import { useRef, useState } from "react";
import useClass from "../hooks/useClass";
import { File } from "../types";

interface FilesProps {
  classId: number;
  files: File[];
}

export default function Files({ classId, files }: FilesProps) {
  const [localFiles, setLocalFiles] = useState<File[]>(files);

  const { uploadFiles } = useClass();

  const fileUploadRef = useRef<HTMLInputElement | null>(null);

  async function submitFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    async function uploadAndSetFiles() {
      const { success } = await uploadFiles(classId, event.target.files!);

      if (success) {
        const newFiles: File[] = [];

        for (let i = 0; i < event.target.files!.length; i++) {
          newFiles.push({
            name: event.target.files![i].name,
            file_id: "asdf",
          });
        }
        setLocalFiles((prevFiles) => [...prevFiles, ...newFiles]);
      }
    }

    void uploadAndSetFiles();
  }

  return (
    <div className="min-w-[300px] flex flex-col gap-5">
      <span className="text-lg text-off-black">Uploaded Files</span>
      <div className="flex flex-col gap-3">
        {localFiles.map((file) => (
          <div className="w-full h-[50px] bg-white shadow-standard rounded-md flex justify-between items-center px-4">
            <span className="text-sm text-gray-600">{file.name}</span>
          </div>
        ))}
      </div>
      <button
        className="text-left text-gray-500 "
        onClick={() => fileUploadRef.current?.click()}
      >
        Add a file
      </button>
      <input
        id="file-upload"
        type="file"
        accept="application/pdf"
        multiple
        ref={fileUploadRef}
        onChange={submitFileUpload}
        style={{ display: "none" }}
      />
    </div>
  );
}
