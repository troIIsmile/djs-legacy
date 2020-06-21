// Scramble Text Generator - Glitter-Graphics.com / Glig.com version

// Consensed form of bi-directional mapping, i.e. if you paste scrambled text,
// the original text will come back. We also support capital letters, but not
// all of them will come out very well. Still cool though, right?
//
// If you're interested in learning more about unicode chars, this page may
// be a good start:
//
// http://ascii-table.com/unicode-chars.php?p=0

const reversal_map: CompMap =
{
  'A': 'Δ', 'B': 'β', 'C': 'Ɔ', 'D': 'Ɖ', 'E': 'Є', 'F': 'Ғ',
  'G': 'Ǥ', 'H': 'Ħ', 'I': 'Ɩ', 'J': 'Ĵ', 'K': 'Ƙ', 'L': '˩',
  'M': 'Ѧ', 'N': 'И', 'O': 'Ѳ', 'P': 'Ƥ', 'Q': 'Ǫ', 'R': 'Я',
  'S': 'Ƨ', 'T': 'Ƭ', 'U': 'Ʋ', 'V': 'Ѵ', 'W': 'Ɯ', 'X': 'χ',
  'Y': 'Ƴ', 'Z': 'Ƶ',

  'a': 'α', 'b': 'в', 'c': 'c', 'd': '∂', 'e': 'ɛ', 'f': 'ғ',
  'g': 'ɢ', 'h': 'н', 'i': 'ι', 'j': 'ʝ', 'k': 'κ', 'l': 'ℓ',
  'm': 'м', 'n': 'и', 'o': 'σ', 'p': 'ρ', 'q': 'զ', 'r': 'я',
  's': 'ƨ', 't': 'т', 'u': 'ʋ', 'v': 'ʌ', 'w': 'ω', 'x': 'ϰ',
  'y': 'ʏ', 'z': 'ʓ'
}
interface CompMap {
  [key: string]: string
}
var complete_map: CompMap

function scramble_text (text: string) {
  if (!complete_map) {
    complete_map = {}
    for (var key in reversal_map) {
      var val = reversal_map[key]
      if (!reversal_map[val])
        complete_map[reversal_map[key]] = key
      complete_map[key] = val
    }
  }

  var str = ""

  for (var i = 0; i < text.length; ++i) {
    var ch = text.charAt(i)
    var rev = complete_map[ch]
    if (rev)
      str += rev
    else
      str += ch
  }

  return str
}

import { Message } from 'discord.js'
export async function run (_message: Message, args: string[]) {
  return {
    content: scramble_text(args.join(' ')),
    disableMentions: 'everyone'
  }
}
export const help = 'Ɔяʏρтιc Ƭɛϰт Ғσямαттɛя'
export const aliases = []
