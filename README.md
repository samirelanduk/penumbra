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
    name: "mynotes.enc", // Blank unless opened/saved
    password: "xxx", // Removed before encrypting/saving
    text: "Updated text which values below won't match.",
    initialCharacterCount: 100,
    initialWordCount: 25
}
```