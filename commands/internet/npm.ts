import fetch from 'node-fetch'
export async function run (): Promise<string> {
  const txt = await fetch('https://raw.githubusercontent.com/npm/npm-expansions/master/expansions.txt').then(res => res.text())
  return txt.split('\n').filter(line => !line.startsWith('#')).random()
}
export const help = 'What does n-p-m stand for?'
export const aliases = []
