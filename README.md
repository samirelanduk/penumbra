# penumbra

## App-wide state

- `document`
- `fileHandle`

## Bytestrings

- 4 bytes: 32 bit number representing offset to start of encrypted document.
- 4 bytes: 32 bit number representing length of salt.
- *n* bytes: salt.
- 4 bytes: 32 bit number representing length of initialization vector.
- *n* bytes: initialization vector.
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