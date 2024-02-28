"use client";
import React, { useRef, useState } from "react";
import { IconCameraCog } from "@tabler/icons-react";
import style from "./FileInput.module.css";

type FileType = {
  name: string;
};

export default function FileInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);

  // Handle the change event when a file is selected
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div>
      {/* Hidden file input element */}
      <input
        type="file"
        ref={inputRef}
        onChange={handleOnChange}
        style={{ display: "none" }}
      />

      {/* Button to trigger the file input dialog */}
      <button className={style.fileBtn} onClick={onChooseFile}>
        <span>
          <IconCameraCog />
        </span>
      </button>

      {selectedFile && (
        <div className={style.selectedFile}>
          <p>{selectedFile.name}</p>

          <button onClick={removeFile}>
            <span className="material-symbols-rounded">delete</span>
          </button>
        </div>
      )}
    </div>
  );
}
