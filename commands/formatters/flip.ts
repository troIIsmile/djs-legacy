// Update-Down Text Generator - Glitter-Graphics.com / Glig.com version

// Consensed form of bi-directional mapping, i.e. if you paste reversed text,
// the original text will come back. We also support capital letters, but not
// all of them will come out very well. Still cool though, right?
//
// If you're interested in learning more about unicode chars, this page may
// be a good start:
//
// http://ascii-table.com/unicode-chars.php?p=0

const reversal_map: CompMap =
{
  'A': '\u2200', 'B': '\u10412', 'C': '\u2183', 'D': '\u25D6', 'E': '\u018E',
  'F': '\u2132', 'G': '\u2141', 'J': '\u017F', 'K': '\u22CA', 'L': '\u2142',
  'M': '\u019C', 'N': '\u1D0E', 'P': '\u0500', 'Q': '\u038C', 'R': '\u1D1A',
  'T': '\u22A5', 'U': '\u2229', 'V': '\u1D27', 'W': 'M', 'Y': '\u2144',

  'a': '\u0250', 'b': 'q', 'c': '\u0254', 'd': 'p', 'e': '\u01DD',
  'f': '\u025F', 'g': '\u0183', 'h': '\u0265', 'i': '\u0131', 'j': '\u027E',
  'k': '\u029E', 'l': '\u05DF', 'm': '\u026F', 'n': 'u', 'r': '\u0279',
  't': '\u0287', 'v': '\u028C', 'w': '\u028D', 'y': '\u028E',

  '.': '\u02D9', '[': ']', '(': ')', '{': '}', '?': '\u00BF',
  '!': '\u00A1', '&': '\u214B', '\'': ',', '\"': ',,', '<': '>',
  '_': '\u203E', '\\': '\\', ';': '\u061B', '`': ',', ',': '\'',

  '1': '\u21C2', '2': '\u1105', '3': '\u1110', '4': '\u3123', '5': '\u078E',
  '6': '9', '7': '\u3125', '9': '6'
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
export const help = 'ɹoʇɐɹǝuǝ⅁ uʍo◖ ǝpısd∩'
export const aliases = ['upsidedown']
