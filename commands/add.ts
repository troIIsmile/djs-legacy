export default new Function
// add (message, args, bot) {
//   // Lets users create a new command within the bot
//   if (args.length) {
//     const name = args[0] // record the name before we remove it
//     args.shift() // remove the name
//     // eslint-disable-next-line no-new-func
//     bot.add(name,  new Function('message', 'args', args.join(' '))) // make a command with the arguments that are left
//     message.channel.send(`🎉Created ${name}!`) // tell the user
//   }
// }
