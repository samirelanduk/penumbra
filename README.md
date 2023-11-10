# penumbra

[![Tests](https://github.com/samirelanduk/penumbra/actions/workflows/test.yml/badge.svg)](https://github.com/samirelanduk/penumbra/actions/workflows/test.yml)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

An offline-first, open-source, encrypted local notes app.
Usable in the browser or as a standalone app (PWA).

All notes are saved locally using AES-GCM encryption with a 256-bit key derived via PBKDF2.

Note: a browser which implements the new [File system Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API) is required in order to open and save files.
Currently only Chrome and Edge support this, though the feature is being implemented in other browsers.

## State

```javascript
{
    slate: [{type: "p", children: [{ text: "Updated text which values below won't match."}]}],
    name: "mynotes.enc", // Blank unless opened/saved
    initialCharacterCount: 100, // Blank unless opened/saved
    initialWordCount: 25 // Blank unless opened/saved
    password: "xxx", // Removed before encrypting/saving
    fileHandle: {...}, // Removed before encrypting/saving
}
```

## Changelog

### v0.4.1

*10 November, 2023*

- About page.
- Dockerised.
- Initial deployment.
- Fixed icons on light scheme.

### v0.4.0

*30 October, 2023*

- Slate integration.
- Rich text formatting.
- Better error modal look.

### v0.3.0

*22 October, 2023*

- Encryption/decryption.
- Initial test suite.

### v0.2.0

*4 October, 2023*

- File saving/loading.
- Character/word counts.

### v0.1.0

*29 September, 2023*

- Initial interface.
- Dark mode.
