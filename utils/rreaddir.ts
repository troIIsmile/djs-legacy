import { join } from 'path'
import { readdir, stat } from 'fs/promises'
export async function rreaddir (dir: string, allFiles: string[] = []): Promise<string[]> {
  const files = (await readdir(dir)).map((file: string) => join(dir, file))
  allFiles.push(...files)
  await Promise.all(files.map(async (file: string) => ((await stat(file)).isDirectory() && rreaddir(file, allFiles))))
  return allFiles
}
