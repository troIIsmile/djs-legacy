import { Message } from 'jackbot-discord'

interface Perms {
  [ key: string ]: (message: Message) => boolean
}  

const checks: Perms = {
  botOwner (message) {
    return message.author.id === process.env.OWNER
  },
  serverOwner (message) {
    return message.guild?.ownerID === message.author.id || false
  },
  serverAdmin (message) {
    return message.member?.hasPermission('ADMINISTRATOR') || false
  }
}

// The bot owner has every permission, and is the default level checked for.
export function hasPerm (message: Message, permission: string = 'botOwner'): boolean {
  return checks.botOwner(message) || checks[ permission ](message)
}

export function permList (message: Message): string[] {
  return Object.keys(checks).filter(func => checks[ func ](message))
}
