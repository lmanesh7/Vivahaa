export const arrayBufferToBase64 = (buffer, contentType) => {
  const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
  return `data:${contentType};base64,${base64String}`
}

// export const arrayBufferToBase64 = (buffer, contentType) => {
//   const CHUNK_SIZE = 8192; // Chunk size for processing the buffer

//   // Convert each chunk of the buffer to base64
//   const base64Chunks = [];
//   for (let i = 0; i < buffer.length; i += CHUNK_SIZE) {
//     const chunk = buffer.slice(i, i + CHUNK_SIZE);
//     const base64Chunk = btoa(String.fromCharCode.apply(null, new Uint8Array(chunk)));
//     base64Chunks.push(base64Chunk);
//   }

//   // Concatenate all base64 chunks into a single string
//   const base64String = base64Chunks.join('');

//   return `data:${contentType};base64,${base64String}`;
// };
