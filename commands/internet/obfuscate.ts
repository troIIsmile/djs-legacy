import { Message } from 'discord.js'
import fetch from "node-fetch"
import { Bot } from "../../utils/types"
// import random from "../../utils/random";
export const help = 'fuck up da code...'
export const aliases = []
function discordCodeBlock (str: string): {
  lang: string
  code: string
}[] {
  var regex = /^(([ \t]*`{3,4})([^\n]*)([\s\S]+?)(^[ \t]*\2))/gm
  var blocks = []
  var match = null

  while ((match = regex.exec(str))) {
    blocks.push({
      lang: match[3],
      code: match[4],
    })
  }
  return blocks
}
const obfuscators: { [key: string]: (str: string, brand: string) => Promise<string> | string } = {
  async lua (code, brand) {
    return (await fetch("https://obfuscator.aztupscripts.xyz/api/v1/obfuscate", {
      headers: {
        accept: "application/json, text/plain, */*",
        "content-type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        script: code,
        options: {
          AddMemes: true,
          PreserveLineInfo: false,
          NoControlFlow: true,
          EncryptStrings: true,
          EncryptImportantStrings: true,
          NoBytecodeCompress: true,
          Uglify: true,
          CustomVarName: brand
        }
      }),
      method: "POST"
    }).then(res => res.json())).script
  },
  // async vbscript (code) {
  //   const domains = ['helloacm.com', 'happyukgo.com', 'uploadbeta.com', 'steakovercooked.com', 'anothervps.com', 'isvbscriptdead.com']
  //   const res = await fetch('https://' + random(domains) + '/api/vbscript-obfuscator/?s=' + encodeURIComponent(code), {
  //     method: 'POST'
  //   });
  //   return res.text();
  // },
  bat (code) {
    var set = "a" + Math.random().toString(36).substring(10) //random set
    var letters = Array.from("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ").sort(() => Math.random() - 0.5).join('')
    var setlettre = "Set " + set + "=" + letters

    var codeobfu = ""
    var lettertab: { [key: string]: string } = {}
    for (var i = 0; i < letters.length; i++) {
      lettertab[letters[i]] = "%" + set + ":~" + i + ",1%"
    }

    for (var i = 0; i < code.length; i++) {
      if (lettertab[code[i]]) {
        codeobfu += lettertab[code[i]]
      } else {
        codeobfu += code[i]
      }
    }
    return '@echo off\n' + setlettre + '\ncls' + '\n' + codeobfu
  },
  get cmd () { return this.bat },
  get dos () { return this.bat },
  async python (source) {
    const res = await fetch("https://pyob.oxyry.com/obfuscate", {
      body: JSON.stringify({
        append_source: false, preserve: "",
        remove_docstrings: true,
        rename_default_parameters: false,
        rename_nondefault_parameters: true, source
      }),
      headers: {
        ['Content-Type']: 'application/json'
      },
      "method": "POST",
    })

    return res.json()
  },
  get py () { return this.python },
}
export async function run (this: Bot, message: Message, args: string[]) {
  const [{ lang = '', code = '' } = { lang: '' }] = discordCodeBlock(args.join(' '))
  if (!lang.trim()) return 'Language not found!'

  if (obfuscators[lang]) {
    message.channel.startTyping()
    const newFile = await obfuscators[lang](code, this.client.user ? this.client.user.username : 'skid')
    message.channel.stopTyping()
    return {
      content: 'Done!',
      files: [{
        name: 'output.txt',
        attachment: Buffer.from(newFile)
      }]
    }
  } else return 'Language not supported!'
}
