export const encrypt = async (document, password) => {
  /**
   * Takes a document object and a plain text password and returns an encrypted
   * bytestring (a Unit8Array) that can be saved to disk.
   * 
   * @param {object} document
   * @param {string} password
   * @returns {Uint8Array}
   */

  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await derivePasswordKey(password, salt);
  const encryptedData = await encryptDocument(document, key, iv);
  const bytestring = encodeEncryptedDataAsBytestring(encryptedData, salt, iv);
  return bytestring;
}


export const derivePasswordKey = async (password, salt) => {
  /**
   * Takes a plain text password and salt and returns a key that can
   * encrypt/decrypt data.
   * 
   * @param {string} password
   * @param {Uint8Array} salt
   * @returns {CryptoKey}
   */

  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const importedKey = await window.crypto.subtle.importKey(
    "raw", passwordBuffer, {name: "PBKDF2"}, false, ["deriveBits", "deriveKey"]
  );
  return await window.crypto.subtle.deriveKey(
    {name: "PBKDF2", salt, iterations: 10000, hash: "SHA-256"},
    importedKey,
    {name: "AES-GCM", length: 256},
    true,
    ["encrypt", "decrypt"]
  );
}


export const encryptDocument = async (document, key, iv) => {
  /**
   * Takes a document object, a key, and an initialization vector and returns
   * an encrypted document as an ArrayBuffer.
   * 
   * @param {object} document
   * @param {CryptoKey} key
   * @param {Uint8Array} iv
   * @returns {ArrayBuffer}
   */

  const documentCopy = {...document};
  delete documentCopy.password;
  delete documentCopy.fileHandle;
  const documentString = JSON.stringify(documentCopy);
  const encoder = new TextEncoder();
  return await window.crypto.subtle.encrypt(
    {name: "AES-GCM", iv}, key, encoder.encode(documentString)
  );
}


export const numberToUint8Array32 = number => {
  /**
   * Takes a number and returns a Uint8Array of length 4 containing the
   * little-endian representation of the number.
   * 
   * @param {number} number
   * @returns {Uint8Array}
   */

  const buffer = new ArrayBuffer(4);
  const view = new DataView(buffer);
  view.setUint32(0, number, true);
  return new Uint8Array(buffer);
}


export const encodeEncryptedDataAsBytestring = (encryptedData, salt, iv) => {
  /**
   * Takes an encrypted document, salt, and initialization vector and returns
   * a Uint8Array containing the bytestring representation of the encrypted
   * data.
   * 
   * @param {ArrayBuffer} encryptedData
   * @param {Uint8Array} salt
   * @param {Uint8Array} iv
   * @returns {Uint8Array}
   */

  const saltBytes = new Uint8Array(salt);
  const saltLengthBytes = numberToUint8Array32(saltBytes.length);
  const ivBytes = new Uint8Array(iv);
  const ivLengthBytes = numberToUint8Array32(ivBytes.length);
  const ciphertextBytes = new Uint8Array(encryptedData);
  const cipherStart = 8 + saltBytes.length + 4 + ivBytes.length;
  const cipherStartBytes = numberToUint8Array32(cipherStart);
  const bytestring = new Uint8Array([
    ...cipherStartBytes, ...saltLengthBytes, ...saltBytes,
    ...ivLengthBytes, ...ivBytes, ...ciphertextBytes
  ]);
  return bytestring
}


export const decrypt = async (bytestring, password) => {
  /**
   * Takes an encrypted bytestring and a plain text password and returns the
   * decrypted document object.
   * 
   * @param {ArrayBuffer} bytestring
   * @param {string} password
   * @returns {object}
   */

  const { salt, iv, ciphertext } = decodeBytestringToEncryptedData(bytestring);
  const key = await derivePasswordKey(password, salt);
  return await decryptDocument(ciphertext, key, iv);
}

export const decodeBytestringToEncryptedData = bytestring => {
  /**
   * Takes an encrypted bytestring and returns an object containing the salt,
   * initialization vector, and ciphertext.
   * 
   * @param {ArrayBuffer} bytestring
   * @returns {object}
   */

  const cipherStart = uint8Array32ToNumber(bytestring.slice(0, 4));
  const saltLength = uint8Array32ToNumber(bytestring.slice(4, 8));
  const salt = bytestring.slice(8, 8 + saltLength);
  const ivLength = uint8Array32ToNumber(bytestring.slice(8 + saltLength, 12 + saltLength));
  const iv = bytestring.slice(12 + saltLength, 12 + saltLength + ivLength);
  const ciphertext = bytestring.slice(cipherStart);
  return { salt, iv, ciphertext };
}


export const uint8Array32ToNumber = bytes => {
  /**
   * Takes a Uint8Array of length 4 and returns the little-endian number
   * represented by the bytes.
   * 
   * @param {Uint8Array} bytes
   * @returns {number}
   */

  const view = new DataView(bytes);
  return view.getUint32(0, true); 
}


export const decryptDocument = async (ciphertext, key, iv) => {
  /**
   * Takes a ciphertext, key, and initialization vector and returns the
   * decrypted document object.
   * 
   * @param {Uint8Array} ciphertext
   * @param {CryptoKey} key
   * @param {Uint8Array} iv
   */

  const documentString = await window.crypto.subtle.decrypt(
    {name: "AES-GCM", iv}, key, ciphertext
  );
  const decoder = new TextDecoder();
  return JSON.parse(decoder.decode(documentString));
}