export const padID = (slug?: number | string) => (slug ? String(slug).padStart(3, "0") : "");
