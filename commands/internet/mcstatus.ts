import fetch from 'node-fetch'

type STATUS_TYPES = 'red' | 'green' | 'yellow'

interface Status {
  [key: string]: STATUS_TYPES
}

export const run = async () => {
  const data: Status[] = await fetch('https://status.mojang.com/check').then(res => res.json())
  const fields = data.map(obj => Object.entries(obj).flat()).map(([name, status]) => ({
    name,
    value: (() => {
      switch (status) {
        case 'yellow':
          return '❓ Problems'
        case 'green':
          return '✅ Up'
        default:
          return '❎ Down'
      }
    })(),
    inline: true
  }))
  return {
    embed: {
      author: {
        name: 'Mojang Status',
        url: 'https://twitter.com/MojangStatus',
        iconURL: 'https://th.bing.com/th?id=OIP.dgfesKRbRs2WCbuACljJ2QHaHa&pid=Api&rs=1'
      },
      fields
    }
  }
}

export const desc = 'is minecraft down?'
