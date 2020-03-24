import fetch from 'node-fetch'

type STATUS_TYPES = 'red' | 'green' | 'yellow'

interface Status {
   [key: string]: STATUS_TYPES
}

export const run = async () => {
  const data: Status[] = await fetch('https://status.mojang.com/check').then(res=>res.json())
  const fields = data.map(info=>{return {
    name: Object.keys(info)[0],
    value: (status=>{
      switch (status) {
        case 'yellow':
          return '❓ Problems'
          break
        case 'green':
          return '✅ Up'
          break
        default:
          return '❎ Down'
      }
    })(info[Object.keys(info)[0]]),
    inline: true
  }})
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

export const desc = 'mc <playername> - Get info about Minecraft: Java Edition players'