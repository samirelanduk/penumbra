import { Crypto } from "node-webcrypto-ossl";
import util from "util";
import {
  derivePasswordKey, encryptDocument, numberToUint8Array32, encodeEncryptedDataAsBytestring,
  decodeBytestringToEncryptedData, uint8Array32ToNumber, decryptDocument,
  encrypt, decrypt
} from "../encryption"

Object.defineProperty(global, "TextEncoder", {
  value: util.TextEncoder
});

Object.defineProperty(global, "TextDecoder", {
  value: util.TextDecoder
});

const webCrypto = new Crypto();
Object.defineProperty(global.self, "crypto", {
  value: {
    subtle: webCrypto.subtle,
    getRandomValues: function(array) {
      const randomBytes = require("crypto").randomBytes(array.length);
      for (let i = 0; i < array.length; i++) {
        array[i] = randomBytes[i];
      }
      return array;
    }
  },
});


it("Derives password key", async () => {
  const salt = new Uint8Array([10, 20, 30, 40, 50]);
  const password = "my-secret-password";
  const key = await derivePasswordKey(password, salt);
  expect(key).toHaveProperty("type", "secret");
  expect(key).toHaveProperty("algorithm.name", "AES-GCM");
  expect(key).toHaveProperty("algorithm.length", 256);
  expect(key).toHaveProperty("usages", expect.arrayContaining(["encrypt", "decrypt"]));
  const rawKeyBuffer = await crypto.subtle.exportKey("raw", key);
  const keyBytes = new Uint8Array(rawKeyBuffer);
  expect(keyBytes).toEqual(new Uint8Array([
    96, 93, 220, 248, 108, 214, 41, 70, 89, 253, 106, 58, 186, 0, 93, 49,
    116, 149, 163, 244, 207, 13, 7, 30, 122, 110, 176, 249, 213, 236, 109, 199
  ]));
})


it("Encrypts document", async () => {
  const iv = new Uint8Array([60, 70, 80, 90, 100, 110, 120]);
  const keyHex = "efb3bf199982449591ef0bb361c5df406e3e66cb3d7eca2e5ac701ef41e0a96f";
  const bytes = new Uint8Array(keyHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  const key = await crypto.subtle.importKey(
    "raw", bytes, {name: "AES-GCM", length: 256}, true, ["encrypt", "decrypt"] 
  );
  const document = {text: "abc"};
  const encrypted = await encryptDocument(document, key, iv);
  expect(new Uint8Array(encrypted)).toEqual(new Uint8Array([
    217, 201, 26, 137, 243, 48, 185, 255, 221, 196, 241, 209, 243, 169, 126, 51,
    239, 149, 47, 216, 80, 134, 114, 173, 20, 34, 70, 237, 111, 125,
  ]))
})


it("Converts numbers to unit8arrays", () => {
  expect(numberToUint8Array32(0)).toEqual(new Uint8Array([0, 0, 0, 0]));
  expect(numberToUint8Array32(1)).toEqual(new Uint8Array([1, 0, 0, 0]));
  expect(numberToUint8Array32(255)).toEqual(new Uint8Array([255, 0, 0, 0]));
  expect(numberToUint8Array32(256)).toEqual(new Uint8Array([0, 1, 0, 0]));
  expect(numberToUint8Array32(257)).toEqual(new Uint8Array([1, 1, 0, 0]));
  expect(numberToUint8Array32(65535)).toEqual(new Uint8Array([255, 255, 0, 0]));
  expect(numberToUint8Array32(65536)).toEqual(new Uint8Array([0, 0, 1, 0]));
})


it("Encodes encrypted data as bytestring", () => {
  const data = new Uint8Array([4, 8, 15, 16, 23, 42]);
  const salt = new Uint8Array([10, 20, 30, 40, 50]);
  const iv = new Uint8Array([60, 70, 80, 90, 100, 110, 120]);
  expect(encodeEncryptedDataAsBytestring(data, salt, iv)).toEqual(new Uint8Array([
    112, 101, 110, 117, 109, 98, 114, 97,
    41, 0, 0, 0,
    5, 0, 0, 0,
    10, 20, 30, 40, 50,
    7, 0, 0, 0,
    60, 70, 80, 90, 100, 110, 120,
    5, 0, 0, 0,
    48, 46, 51, 46, 48,
    4, 8, 15, 16, 23, 42
  ]))
})


it ("Decodes encrypted bytestring to encrypted data", () => {
  const bytestring = new Uint8Array([
    112, 101, 110, 117, 109, 98, 114, 97,
    41, 0, 0, 0,
    5, 0, 0, 0,
    10, 20, 30, 40, 50,
    7, 0, 0, 0,
    60, 70, 80, 90, 100, 110, 120,
    5, 0, 0, 0,
    48, 46, 51, 46, 48,
    4, 8, 15, 16, 23, 42
  ])
  expect(decodeBytestringToEncryptedData(bytestring)).toEqual({
    salt: new Uint8Array([10, 20, 30, 40, 50]),
    iv: new Uint8Array([60, 70, 80, 90, 100, 110, 120]),
    version: "0.3.0",
    ciphertext: new Uint8Array([4, 8, 15, 16, 23, 42])
  })
})


it("Converts Uint8Arrays to numbers", () => {
  expect(uint8Array32ToNumber(new Uint8Array([0, 0, 0, 0]))).toEqual(0);
  expect(uint8Array32ToNumber(new Uint8Array([1, 0, 0, 0]))).toEqual(1);
  expect(uint8Array32ToNumber(new Uint8Array([255, 0, 0, 0]))).toEqual(255);
  expect(uint8Array32ToNumber(new Uint8Array([0, 1, 0, 0]))).toEqual(256);
  expect(uint8Array32ToNumber(new Uint8Array([1, 1, 0, 0]))).toEqual(257);
  expect(uint8Array32ToNumber(new Uint8Array([255, 255, 0, 0]))).toEqual(65535);
  expect(uint8Array32ToNumber(new Uint8Array([0, 0, 1, 0]))).toEqual(65536);
})


it("Decrypts documents", async () => {
  const ciphertext = new Uint8Array([
    217, 201, 26, 137, 243, 48, 185, 255, 221, 196, 241, 209, 243, 169, 126, 51,
    239, 149, 47, 216, 80, 134, 114, 173, 20, 34, 70, 237, 111, 125,
  ])
  const iv = new Uint8Array([60, 70, 80, 90, 100, 110, 120]);
  const keyHex = "efb3bf199982449591ef0bb361c5df406e3e66cb3d7eca2e5ac701ef41e0a96f";
  const bytes = new Uint8Array(keyHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  const key = await crypto.subtle.importKey(
    "raw", bytes, {name: "AES-GCM", length: 256}, true, ["encrypt", "decrypt"] 
  );
  const document = await decryptDocument(ciphertext, key, iv);
  expect(document).toEqual({text: "abc"})
})


it("Encrypts and decrypts in full loop", async () => {
  const document = {text: "Initial text", words: 100, property: "value"};
  const password = "a-very-secure-password";
  const encrypted = await encrypt(document, password);
  const decrypted = await decrypt(encrypted.buffer, password);
  expect(decrypted).toEqual(document);
})