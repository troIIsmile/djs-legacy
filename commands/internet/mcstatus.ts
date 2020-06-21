import fetch from 'node-fetch'

interface Status {
  [key: string]: string
}

export const run = async () => {
  const data: Status[] = await fetch('https://status.mojang.com/check').then(res => res.json())
  const fields = data
    .map(Object.entries) // Status[] -> string[][][]
    .flat() // string[][][] -> string[][]
    .map(([name, status]) => ({
      name,
      value: status === 'green' ? '✅ Up' : '❎ Down',
      inline: true
    }))
  return {
    embed: {
      author: {
        name: 'Mojang Status',
        url: 'https://twiter.com/MojangStatus',
        iconURL: 'https://upload.wikimedia.org/wikipedia/en/c/cb/Mojang_Studios_Logo%2C_May_2020_Redesign.png'
      },
      fields
    }
  }
}

export const help = 'is minecraft down?'
