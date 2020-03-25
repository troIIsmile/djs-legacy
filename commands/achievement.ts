export const desc = 'achievement <text> - Makes a minecraft achievement'

export const run = (_: void, args: string[]) => {
  if (args.join('')) {
    return {
      files: [{
        attachment: `https://www.minecraftskinstealer.com/achievement/a.php?i=13&h=Achievement+get%21&t=${encodeURIComponent(args.join('+'))}`,
        name: 'mc.png'
      }]
    }
  }
  return 'you need text'
}