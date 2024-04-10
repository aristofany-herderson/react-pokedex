export const padId = (slug?: number | string) =>
  slug ? String(slug).padStart(3, "0") : "";
