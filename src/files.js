function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
          resolve(reader.result);
      };
      reader.onerror = () => {
          reject(new Error("Failed to read file"));
      };
      reader.readAsArrayBuffer(file);
  });
}

export const openFile = async () => {
  /**
   * Opens a file picker and returns the contents of the selected file. The
   * second item in the returned array is the file handle, which can be used to
   * save the file again later.
   */

  let fileHandle;
  try {
    [fileHandle] = await window.showOpenFilePicker({
      multiple: false,
    });
  } catch { return [] }
  const fileData = await fileHandle.getFile();
  const reader = new FileReader();
  const contents = await readFileAsArrayBuffer(fileData);
  return [contents, fileHandle];
}

export const saveFileAs = async (name, contents) => {
  /**
   * Opens a file picker and saves the contents to the selected file. Returns
   * the file handle, which can be used to save the file again later.
   */

  let fileHandle;
  try {
    fileHandle = await window.showSaveFilePicker({
      suggestedName: document.name || "Untitled",
    });
  } catch { return }
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
  return fileHandle;
}

export const saveFile = async (fileHandle, contents) => {
  /**
   * Saves the contents to the file represented by the file handle.
   */
  
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}