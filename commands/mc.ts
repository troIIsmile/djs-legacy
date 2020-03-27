import fetch from 'node-fetch'
import { run as status } from './mcstatus' // The best part about jackbot-discord@13 is that commands can call other commands. We use this to get server data.

export const desc = 'mc <playername> - Get info about Minecraft: Java Edition players'

export const run = async (message: void, args: string[]) => {
  try {
    const {embed: { fields } } = await status()
    if (fields.find(service => service.name === 'sessionserver.mojang.com')?.value !== '✅ Up') {
      return {
        embed: {
          color: 0x3F3F3F,
          author: {
            name: 'Minecraft: Java Edition',
            url: 'https://minecraft.net'
          },
          title: 'Error!',
          description: 'Minecraft servers are down!!'
        }
      }
    }
    const { id } = await fetch('https://api.mojang.com/users/profiles/minecraft/' + args.join('')).then(res=>res.json())
    const {properties, name: title} = await fetch('https://sessionserver.mojang.com/session/minecraft/profile/' + id).then(res=>res.json())
    return {
      embed: {
        color: 0x3F3F3F,
        author: {
          name: 'Minecraft: Java Edition',
          url: 'https://minecraft.net'
        },
        title,
        fields: [{
          name: 'UUID',
          value: id
        }]
      }
    }
  } catch (e) {
    return {
      embed: {
        color: 0x3F3F3F,
        author: {
          name: 'Minecraft: Java Edition',
          url: 'https://minecraft.net'
        },
        title: 'Error!',
        description: e.toString()
      }
    }
  }
}