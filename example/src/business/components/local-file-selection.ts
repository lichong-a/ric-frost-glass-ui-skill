export type LocalFile = { name: string; size: number; lastModified: number; type: string };
export const LOCAL_FILE_LIMIT = 5;
export const LOCAL_FILE_MAX_BYTES = 1048576;

export function localFileKey(file: LocalFile): string {
  return JSON.stringify([file.name, file.size, file.lastModified]);
}

export function selectLocalFiles<T extends LocalFile>(existing: T[], incoming: readonly T[]) {
  const files = [...existing];
  const seen = new Set(existing.map(localFileKey));
  let added = 0;
  let rejected = 0;
  let duplicates = 0;
  let overflow = 0;
  for (const file of incoming) {
    if (file.size > LOCAL_FILE_MAX_BYTES || !(file.type.startsWith('image/') || /\.(txt|csv)$/i.test(file.name))) {
      rejected++;
      continue;
    }
    const key = localFileKey(file);
    if (seen.has(key)) {
      duplicates++;
      continue;
    }
    seen.add(key);
    if (files.length >= LOCAL_FILE_LIMIT) {
      overflow++;
      continue;
    }
    files.push(file);
    added++;
  }
  return { files, added, rejected, duplicates, overflow };
}
