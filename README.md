# penumbra

[![Tests](https://github.com/samirelanduk/penumbra/actions/workflows/test.yml/badge.svg)](https://github.com/samirelanduk/penumbra/actions/workflows/test.yml)

An offline-first, open-source, encrypted local notes app.
Usable in the browser or as a standalone app (PWA).

All notes are saved locally using AES-GCM encryption with a 256-bit key derived via PBKDF2.

## Bytestrings

- 4 bytes: 32 bit number representing offset to start of encrypted document.
- 4 bytes: 32 bit number representing length of salt.
- *n* bytes: salt.
- 4 bytes: 32 bit number representing length of initialization vector.
- *n* bytes: initialization vector.
- 4 bytes: 32 bit number representing length of version string.
- *n* bytes: version string.
- *n* bytes: encrypted document.

## Document Object

```javascript
{
    text: "Updated text which values below won't match.",
    name: "mynotes.enc", // Blank unless opened/saved
    initialCharacterCount: 100, // Blank unless opened/saved
    initialWordCount: 25 // Blank unless opened/saved
    password: "xxx", // Removed before encrypting/saving
    fileHandle: {...}, // Removed before encrypting/saving
}
```
