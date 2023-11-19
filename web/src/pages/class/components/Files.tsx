interface FilesProps {
  files: string[];
}

export default function Files({ files }: FilesProps) {
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
      <input className="" type="file" />
    </div>
  );
}
