export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export function formatUploadSize(bytes: number) {
  return `${Math.round(bytes / (1024 * 1024))}MB`;
}
