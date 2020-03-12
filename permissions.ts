import { Message } from 'jackbot-discord'

interface Perms {
  [ key: string ]: (message: Message) => boolean
}

const checks: Perms = {
  serverOwner (message) {
    return message.guild.ownerID === message.author.id
  },
  serverAdmin (message) {
    return message.member.hasPermission('ADMINISTRATOR')
  }
}

// The bot owner has every permission, and is the default level checked for.
export default (message: Message, permission: string = 'botOwner') => {
  return (message.author.id === process.env.OWNER) || checks[ permission ](message)
}
