import { Message } from 'discord.js';
// import random from "../../utils/random";
export const help = 'fuck up da code...';
export const aliases = [];
function discordCodeBlock (str: string): {
  start: number;
  end: number;
  lang: string;
  code: string;
  block: string;
}[] {
  var regex = /^(([ \t]*`{3,4})([^\n]*)([\s\S]+?)(^[ \t]*\2))/gm;
  var blocks = [];
  var match = null;

  while ((match = regex.exec(str))) {
    blocks.push({
      start: match.index,
      end: match.index + match[1].length,
      lang: match[3],
      code: match[4],
      block: match[1]
    });
  }
  return blocks;
}
const obfuscators: { [key: string]: (str: string) => Promise<string> | string; } = {
  async lua (code) {
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
          NoBytecodeCompress: false,
          Uglify: true,
          CustomVarName: "trollsmile"
        }
      }),
      method: "POST"
    }).then(res => res.json())).script;
  },
  // async vbscript (code) {
  //   const domains = ['helloacm.com', 'happyukgo.com', 'uploadbeta.com', 'steakovercooked.com', 'anothervps.com', 'isvbscriptdead.com']
  //   const res = await fetch('https://' + random(domains) + '/api/vbscript-obfuscator/?s=' + encodeURIComponent(code), {
  //     method: 'POST'
  //   });
  //   return res.text();
  // },
  bat (code) {
    var set = "a" + Math.random().toString(36).substring(10); //random set
    var letters = Array.from("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ").sort(() => Math.random() - 0.5).join('');
    var setlettre = "Set " + set + "=" + letters;

    var codeobfu = "";
    var lettertab: { [key: string]: string; } = {};
    for (var i = 0; i < letters.length; i++) {
      lettertab[letters[i]] = "%" + set + ":~" + i + ",1%";
    }

    for (var i = 0; i < code.length; i++) {
      if (lettertab[code[i]]) {
        codeobfu += lettertab[code[i]];
      } else {
        codeobfu += code[i];
      }
    }
    return '@echo off\n' + setlettre + '\ncls' + '\n' + codeobfu;
  },
  get cmd () { return this.bat; },
  get dos () { return this.bat; }
};
export async function run (message: Message, args: string[]) {
  const [{ lang = '', code = '' } = {lang: ''}] = discordCodeBlock(args.join(' '));
  if (!lang.trim()) return 'Language not found!';

  if (obfuscators[lang]) {
    try {
      message.channel.startTyping();
      const newFile = await obfuscators[lang](code);
      message.channel.stopTyping();
      return {
        content: 'Done!',
        files: [{
          name: 'output.txt',
          attachment: Buffer.from(newFile)
        }]
      };
    } catch (err) {
      message.channel.stopTyping();
      return 'Error: ' + err.toString();
    }
  } else return 'Language not supported!';
}
