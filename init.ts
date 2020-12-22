import { Client, Collection, Intents, Message } from 'discord.js'
import {
  existsSync as exists,
  readFileSync as readFile,
  readdirSync
} from 'fs'
import { ServerResponse, createServer } from 'http'
import { homepage, bugs } from './package.json'
import { join } from "path"
import Trollsmile from 'trollsmile-core'
import { CommandObj } from "./utils/types"

globalThis.fetch = require('node-fetch') // shit workaround in case i missed anything
globalThis.Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)]
}

// dotenv support
if (exists('./.env')) {
  Object.assign(process.env,
    Object.fromEntries(
      // Overwrite the env with the .env file
      readFile('./.env', 'utf-8')
        .split('\n') // split the file into lines
        .filter(line => !line.startsWith('#') && line) // remove comments and spacing
        .map(line => line.split('=')) // split the lines into key:value pairs
    ))
}

const bot = new class extends Trollsmile<Message, CommandObj> {
  filter = (msg: Message) => !msg.author.bot
  commands = new Collection() as Map<string, CommandObj>
  public getCommandName = super.getCommandName
  client: Client
  constructor(prefix: string) {
    super(prefix)
    this.client = new Client({
      ws: {
        intents: [Intents.NON_PRIVILEGED]
      }
    })
    this.on('output', ([out, message]) => {
      message.channel.send(out)
    })

    // Load in events
    readdirSync('./events/')
      .filter(name => name.endsWith('.js'))
      .map(name => name.replace('.js', ''))
      .forEach(async filename => {
        const ev = (await import(join(process.cwd(), '/events/', filename))).default
        this.client.on(filename, context => {
          ev.call(this, context)
        })
      })
    this.client.login(process.env.TOKEN)
    this.on('error', ([err, message]) => {
      message.channel.stopTyping()
      message.channel.send({
        embed: {
          author: {
            name: `${this.client.user?.username} ran into an error while running your command!`,
            // iconURL: this.user?.avatarURL()
          },
          title: err.toString(),
          color: 'RED',
          footer: {
            text: `Report this bug @ ${bugs}`
          }
        }
      })
    })
  }
}('-')

// replit redirect
if (process.env.REPLIT_DB_URL) {
  createServer((_, res: ServerResponse) => {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(
      `<meta http-equiv="refresh" content="0;url=${homepage}">`
    )
    res.end()
  }).listen(8080)
}


export default bot
