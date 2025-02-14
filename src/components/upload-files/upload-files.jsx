import { useState, useCallback } from "react";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

export default function UploadFiles() {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <div
        {...getRootProps()}
        className={`w-full max-w-md p-8 rounded-lg border-2 border-dashed transition-colors ${
          isDragActive ? "border-neutral-400" : "border-neutral-600"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center text-center">
          <Upload className="w-12 h-12 mb-4 text-neutral-400" />
          <p className="mb-2 text-lg font-medium text-neutral-300">
            {isDragActive ? "Drop the files here" : "Drag & drop files here"}
          </p>
          <p className="mb-4 text-sm text-neutral-500">or</p>
          <button className="px-4 py-2 text-sm font-medium text-neutral-200 bg-neutral-800 rounded-md hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600">
            Select Files
          </button>
          {files.length > 0 && (
            <div className="mt-4 text-sm text-neutral-400">
              {files.length} file(s) selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
