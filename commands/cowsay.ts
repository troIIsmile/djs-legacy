import { Message } from 'jackbot-discord'
const command = (message: Message, args: string[]) => {
  message.channel.send({
    code: true,
    content: `
 ${'_'.repeat(args.join(' ')).length}
|${args.join(' ')}|
 ${'_'.repeat(args.join(' ')).length}
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||`
  })
}
export const desc = 'funny cow'
export const run = command
