export const createPasswordKey = async (password) => {
  /**
   * Takes a plain text password and returns a key for use in the PBKDF2
   * algorithm.
   */

  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  return await window.crypto.subtle.importKey(
    "raw", passwordBuffer, {name: "PBKDF2"}, false, ["deriveBits", "deriveKey"]
  );
}


export const deriveKey = async (passwordKey, salt) => {
  /**
   * Takes a password key and salt and returns a key for use in the AES-GCM
   * algorithm using the PBKDF2 algorithm.
   */

  return await window.crypto.subtle.deriveKey(
    {
        name: "PBKDF2",
        salt: salt,
        iterations: 10000,
        hash: "SHA-256"
    },
    passwordKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}


export const encrypt = async (text, password) => {
  /**
   * Takes a plain text string and password and returns an object containing
   * the encrypted data, the salt, and the IV.
   */

  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const passwordKey = await createPasswordKey(password);
  const derivedKey = await deriveKey(passwordKey, salt);
  const encoder = new TextEncoder();
  const encryptedData = await window.crypto.subtle.encrypt(
    {name: "AES-GCM", iv}, derivedKey, encoder.encode(text)
  );
  const ciphertext = new Uint8Array(encryptedData);
  return {ciphertext, iv, salt};
}


export const decrypt = async (encryptedData, password) => {
  /**
   * Takes an object containing the encrypted data, the salt, and the IV and
   * returns the decrypted text.
   */

  const { salt, iv, ciphertext } = encryptedData;
  const passwordKey = await createPasswordKey(password);
  const derivedKey = await deriveKey(passwordKey, salt);
  const decryptedData = await window.crypto.subtle.decrypt(
    {name: "AES-GCM", iv}, derivedKey, ciphertext
  );
  const decoder = new TextDecoder();
  return decoder.decode(decryptedData);
}