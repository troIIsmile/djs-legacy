import { Message, Bot } from 'jackbot-discord'

interface Describe {
  [ key: string ]: string
}

const descriptions: Describe = {
  nermal: 'r/nermalfunny',
  votepoop: 'really old command from the chatbot',
  ok: 'Was made in 45 seconds. Only replies with "retard". That\'s it.',
  chicken: 'on a raft',
  shutdown: 'Turns off the bot.',
  fakeperson: 'this person does not exist',
  eval: 'give it code and it runs it',
  dm: 'direct message someone with the bot',
  bal: 'see how much DOGE dogecoin addresses have',
  about: 'Statistics about the bot.',
  owo: 'Pwease use my Disoword bot UwU',
  fortnite: '@someone but funnier',
  changename: 'Change your nickname.',
  say: 'Deletes your message and says what you said, letting you disguise as the bot.',
  roblox: 'it is free',
  doge: 'wow',
  tts: 'gives you an mp3 of what you typed. try using --slow',
  help: 'what the fuck are you using right now',
  add: 'Adds a command to the bot, until it restarts.',
  env: 'Modify environment variables. Due to the odd way jackbot-next dotenv implementation is, these should take effect instantly.'
}
export default (message: Message, _: string[], bot: Bot) => {
  message.channel.send(
    Object.keys(bot.commands) // list of command names
      .map(name => `-${name} :: ${descriptions[ name ]}`) // add "-" to the start
      .join('\n') // string seperated by newline
    ,
    { code: '' })
}
