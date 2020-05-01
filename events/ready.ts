import { Bot } from '../utils/types'
import random from '../utils/random'
// Some "Playing" messages from esmBot
import { all as playingWith } from '../messages'
export default (_: void, bot: Bot) => {
  // activityChanger from esmBot, also known as "the gamer code"
  ; (async function activityChanger () {
    bot.user?.setActivity(random(playingWith))
    setTimeout(activityChanger, 900000)
  })()
}
