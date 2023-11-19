import useClass from "../hooks/useClass";

interface FilesProps {
  files: string[];
}

export default function Files({ files }: FilesProps) {
  const { uploadFiles } = useClass();

  async function submitFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    console.log("uploading files");
    console.log(event.target.files);

    void uploadFiles("12345678", event.target.files!);
  }

  return (
    <div className="min-w-[300px] flex flex-col gap-5">
      <span className="text-lg text-off-black">Uploaded Files</span>
      <div className="flex flex-col gap-3">
        {files.map((file) => (
          <div className="w-full h-[50px] bg-white shadow-standard rounded-md flex justify-between items-center px-4">
            <span className="text-sm text-gray-600">{file}</span>
          </div>
        ))}
      </div>
      <input
        id="file-upload"
        type="file"
        accept="application/pdf"
        multiple
        className=""
        onChange={submitFileUpload}
      />
    </div>
  );
}
