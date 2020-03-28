// Might wanna spin this off into a different repo
// Instead of putting a version put `github:author/repo`
interface Messages {
  [key: string]: string[]
}

const messages: Messages = {
  Browsers: [
    'Mozilla Firefox',
    'Google Chrome',
    'Wexond',
    'Dot Browser',
    'Opera',
    'Microsoft Edge',
    'Microsoft Internet Explorer',
    'Netscape Navigator'
  ],
  'Operating Systems': [
    'Ubuntu',
    'Linux', // Not sure about this one
    'SteamOS',
    // https://en.wikipedia.org/wiki/List_of_Microsoft_Windows_versions
    'Windows 10',
    'Windows 8.1',
    'Windows 8',
    'Windows 7',
    'Windows Vista',
    'Windows XP',
    'Windows Me',
    'Windows 2000',
    'Windows 98',
    'Windows 95',
    'Windows 3.1',
    'Windows 1.0'
  ],
  Apps: [ // Apps are programs on mobile
    'TikTok',
    'iPod Music',
    'Skype' // I mean it's on mobile now
  ],
  Nintendo: [
    'Super Mario Run',
    'Miitomo',
    'Pokémon GO',
    'Animal Crossing: Pocket Camp',
    'Dr. Mario World',
    'Super Mario Maker 2',
    'Super Smash Bros. Ultimate',
    'Yoshi for the NES',
    'Nintendo™',
    'Game Boy Advance Video',
    'Nintendo Switch Online',
    'Wario World',
    'Mario',
    // Wii Channels
    'Wii Speak Channel',
    'Wii Shop Channel',
    'Internet Channel',
    'Photo Channel',
    'Mii Channel',
    'Disc Channel'
  ],
  Emulators: [
    'Yuzu',
    'Dolphin Emulator',
    'RetroArch'
  ],
  'Programming References': [
    'single quote no semicolons two spaces',
    'Submit playing lines on github: Jack5079/nxtbot'
  ],
  Games: [ // Finally, the actual games lmao
    'Pac-Man Championship Edition DX+',
    'Pac-Man Championship Edition 2',
    'Club Penguin',
    'Hong Kong 97',
    "Sonic's Schoolhouse",
    'Desert Bus',
    'Shrek Extra Large', // Somehow a real game.
    'Roblox', // I know this is a game engine but
    'Minecraft',
    'Skyrim',
    'Sonic 06',
    'Metal Gear Solid 4',
    'Action 52',
    'Meme Run',
  ],
  'Fake Games': [
    'FL Studio: SoundCloud Rapper Edition',
    'Hello Kitty Island Adventure',
    'Fake Download Button Simulator',
    'Funny Fortain',
    'Battletoads for Wii',
    'Fortnut', // i mean kinda
    'The Elder Scrolls 6', // Not yet
    'Mega Man Legends 3',
    'BLJ Simulator',
  ],
  Songs: [
    "Scatman's World"
  ],
  Puns: [
    'with your sanity',
    'with yo mama',
    'with a broken god',
    'games with the mortals',
    'with the Infinity Gauntlet'
  ],
  Websites: [
    'Twitter',
    'Reddit',
    'YouTube',
    'MDN Web Docs' // the current name
  ],
  Random: [
    'h',
    'a game',
    'anime',
    'absolutely nothing',
    'epic mashups bro',
    'Jake Paul videos on repeat',
    'gniyalP',
    'HaaH WaaW',
    'dQw4w9WgXcQ',
    'MS Paint',
    'the funny memes epic',
    'the Cat Piano',
    'Bottom Text',
    'lol 7',
    'Family Guy',
    'yeah',
    'Rofa Cat',
    'jeff',
    'woo yeah',
    'with Edgar',
    'joe mama',
    'Liquid Sun',
    'with your Discord server',
    'with a stone, Luigi.',
    'doin your mom doin doin your mo',
    '#BringBackNationalSex',
    'foobar2000',
    'with GIFs'
  ]
}

const all = Object.values(messages).flat()

export { messages, all }