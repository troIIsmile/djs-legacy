import { Message } from "discord.js"
import { Bot } from "../utils/types"

export default function (this: Bot, msg: Message) {
  this.emit('message', msg)
}
