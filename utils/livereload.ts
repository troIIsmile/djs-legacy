import { watch, existsSync } from 'fs'
import { Bot } from './types'

export default (bot: Bot, folder: string) =>
  watch('./commands/', {}, async (type: string, filename: string) => {
    if (filename.endsWith('.js')) {
      if (type === 'change') {
        filename = filename.replace('.js', '')
        delete require.cache[require.resolve(`${folder}/${filename}.js`)]
        bot.commands.set(
          filename,
          (await import(`${folder}/${filename}.js`)).run
        )
      } else {
        if (existsSync(`${folder}/${filename}`)) {
          bot.commands.set(
            filename.replace('.js', ''),
            (await import(`${folder}/${filename}`)).run
          )
        } else {
          filename = filename.replace('.js', '')
          bot.commands.delete(filename)
        }
      }
    }
  })
