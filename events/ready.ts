import { Bot } from '../utils/types'
import random from '../utils/random'
import live from '../utils/livereload'
// Some "Playing" messages from esmBot
import { all as playingWith } from '../messages'
export default (_: void, bot: Bot) => {
  live(bot, '../commands')
  // activityChanger from esmBot, also known as "the gamer code"
  ;(async function activityChanger () {
    bot.user?.setActivity(random(playingWith))
    setTimeout(activityChanger, 900000)
  })()
}
