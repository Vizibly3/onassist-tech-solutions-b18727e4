
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/[^a-z0-9-]/g, '') // Remove special characters except dashes
    .replace(/-+/g, '-') // Replace multiple consecutive dashes with single dash
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes
};
