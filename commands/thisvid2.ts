import {Message} from 'jackbot-discord'
import fetch from 'node-fetch'
import FormData from 'form-data'
export async function run (message: Message, args: string[]) {
  try {
    new URL(encodeURI(args.join(' ')))
    if (args.join().length) {
    const blob = await (await fetch(`https://projectlounge.pw/ytdl/download?url=${encodeURIComponent(args.join(' '))}`)).buffer()
    var fd = new FormData();
    fd.append("video", blob)
    fetch("https://projectlounge.pw/thisvid2/upload", {
      method: "post",
      body: fd
    }).then(res => res.buffer()).then(buff => {
      message.channel.send({
        files: [{
          attachment: buff,
          name: 'video.mp4'
        }]
      })
    })
    } else {
      message.channel.send('give me a url') 
     }
  } catch (e) {
    if (e.toString() == 'DiscordAPIError: Request entity too large') return message.channel.send('video is too big to send')
    message.channel.send(e.toString())
  }
}

export const desc = 'downloaded using nxtbot'