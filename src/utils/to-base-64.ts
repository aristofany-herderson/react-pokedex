export const toBase64 = (string: string) =>
  typeof window === "undefined"
    ? Buffer.from(string).toString("base64")
    : window.btoa(string);
