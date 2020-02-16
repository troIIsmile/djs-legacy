import { Message, RichEmbed } from 'discord.js'
import fetch from 'node-fetch'
export default async (message: Message, args: Array<string>) => {
  const req = await fetch('https://dogechain.info/api/v1/address/balance/' + encodeURIComponent(args.join(' ')))

  if (req.ok) {
    const data = await req.json()
    message.channel.send(new RichEmbed()
      .setAuthor("Dogechain", "https://dogechain.info/favicon.png")
      .addField("Balance", data.balance + " DOGE", true)
      .setColor(0x89c496))
  } else {
    const data = await req.json()
    message.channel.send(new RichEmbed()
      .setAuthor("Dogechain", "https://dogechain.info/favicon.png")
      .addField("Error", data.error + " DOGE", true)
      .setColor(0xFF0000))
  }
}