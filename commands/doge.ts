// TODO: Add VC like the old jackbot
import { Message } from 'jackbot-discord'
import { persist } from '../util'

// nth is from https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
function nth (i: number): string {
  const j = i % 10
  const k = i % 100
  if (j == 1 && k != 11) return i + "st"
  if (j == 2 && k != 12) return i + "nd"
  if (j == 3 && k != 13) return i + "rd"
  return i + "th"
}

export const run = (message: Message) => {
  if (typeof persist.dogeCount !== 'number') persist.dogeCount = 0
  persist.dogeCount++
  message.channel.send({
    file: 'http://assets.stickpng.com/thumbs/5845e755fb0b0755fa99d7f3.png',
    content: `le doge has arrived for the ${nth(persist.dogeCount)} time!`
  })
}
export const desc = 'wow'
