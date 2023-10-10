export const openFile = async () => {
  /**
   * Opens a file picker and returns the binary contents of the selected file
   * as an ArrayBuffer. Also returns the file handle, which can be used to save
   * the file again later.
   */

  let fileHandle;
  try {
    [fileHandle] = await window.showOpenFilePicker({
      multiple: false,
    });
  } catch { return [] }
  const fileData = await fileHandle.getFile();
  return await new Promise(async (resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve([reader.result, fileHandle]);
    };
    reader.readAsArrayBuffer(fileData);
  });
}


export const saveFileAs = async contents => {
  /**
   * Opens a file picker and saves the contents to the selected file. Returns
   * the file handle, which can be used to save the file again later. Contents
   * should be an Uint8Array.
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