import { Message } from 'discord.js'
import fetch from 'node-fetch'
export async function run (_message: Message, args: string[]) {
  const res = await fetch('https://minecraftskinstealer.com/api/v1/skin/render/skin/' + encodeURI(args.join(' ')))
  if (res.ok) {
    return {
      files: [
        {
          attachment: await res.buffer(),
          name: 'skin.png'
        }
      ]
    }
  } else {
    return {
      embed: {
        title: res.status === 404 ? 'Player not found!' : `${res.status}! ${res.statusText}`,
        description: 'OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo!'
      }
    }
  }
}
export const desc = 'mcsteal - Get the skin of a Minecraft: Java Edition player. Syntax: mcsteal <username>'
