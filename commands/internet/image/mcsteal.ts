import { Message } from 'discord.js'
import fetch from 'node-fetch'
export async function run (_message: Message, args: string[]) {
  const res = await fetch('https://minecraftskinstealer.com/api/v1/skin/render/skin/' + encodeURI(args.join(' ')))
  return res.ok
    ? { // If it worked
      content: `Here's the Minecraft: Java Edition skin of ${args.join(' ')}!`,
      files: [
        {
          attachment: await res.buffer(),
          name: 'skin.png'
        }
      ]
    }
    : { // If it failed
      embed: {
        title: res.status === 404 ? 'Player not found!' : `${res.status}: ${res.statusText}`,
        description: 'OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo!',
        color: 'RED'
      }
    }
}
export const help = 'mcsteal - Get the skin of a Minecraft: Java Edition player. Syntax: mcsteal <username>'
export const aliases = ['mc']
