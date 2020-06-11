// add more
interface Nested<Type> {
  [key: string]: Nested<Type> | Type[]
}

const messages: Nested<string> = {
  Browsers: {
    Chromium: [
      'Google Chrome',
      'Wexond', // "an open-source, privacy-focused, extensible web browser with a totally new user experience"
      'Dot Browser', // "A privacy-centric web browser, with an elegant UI and a robust built-in ad blocker, all designed with anonymity in mind, based on Wexond"
      'Opera GX', // funny meme
      'Microsoft Edge'
    ],
    Other: [
      'Mozilla Firefox',
      'Microsoft Internet Explorer',
      'Netscape Navigator'
    ]
  },
  'Operating Systems': {
    Linux: [
      'Ubuntu',
      'KDE neon', // kde users when they see a lawn gnome in their neighbor's yard
      'Arch Linux',
      'SteamOS',
      'Hannah Montana Linux' // The one true Linux distro.
    ],
    Windows: [
      '10',
      '7',
      'Vista',
      'XP',
      '95',
      '3.1'
    ].map(str => `Windows ${str}`)
  },
  Apps: [
    // Apps are programs on mobile
    'TikTok',
    'iPod Music'
  ],
  Programs: [
    // Programs are apps on PC
    'MS Paint',
    'Skype', // Communication tool for free calls and chat
    'Blender', // The free and open source 3D creation suite.
    'AOL Instant Messenger',
    'Visual Studio Code', // Visual Studio without the Visual
    'Atom', // A hackable text editor for the 21st Century
    'Shotcut', // Free, open source, and cross-platform video editor.
    'foobar2000',
    'XMPlay',
    'OpenMPT'
  ],
  Nintendo: {
    Wii: [
      'Wii Speak Channel',
      'Wii Shop Channel',
      'Internet Channel',
      'Photo Channel',
      'Mii Channel',
      'Disc Channel'
    ],
    Switch: ['Super Mario Maker 2', 'Super Smash Bros. Ultimate'],
    Other: [
      'Yoshi for the NES',
      'Nintendo™',
      'Game Boy Advance Video',
      'Wario World',
      'Mario'
    ],
    Mobile: [
      'Super Mario Run',
      'Miitomo',
      'Pokémon GO',
      'Animal Crossing: Pocket Camp',
      'Nintendo Switch Online',
      'Dr. Mario World'
    ]
  },
  Emulators: ['Yuzu', 'Dolphin Emulator', 'RetroArch'],
  Websites: ['Twitter', 'Reddit', 'YouTube'],
  Meta: [
    // References to bots (or this bot)
    'Submit playing lines & bug reports @ ' +
    require('./package.json').bugs,
    '500+ commits!',
    'Made with discord.js!',
    'Made with Node.js!',
    'NotSoBot is bad™'
  ],
  Songs: Object.entries({
    'Scatman John': ["Scatman's World"],
    'Alex Arcoleo': ['Bloom 7'],
    'Neil Cicierega': ['Wow Wow', 'The Starting Line'],
    'Big Shaq': ["Man Don't Dance", 'Mans Not Hot'],
    TOPAZ: [
      // topazzz.bandcamp.com to be exact
      'Half Awake, Pt. 2',
      'Half Awake, Pt. 1'
    ],
    'Fatty Spins': [
      "Doin' Your Mom" // you know we straight
    ],
    'FAT DAMON': ['Conspiracy Theory Guy'],
    'Your Favorite Martian': ["Grandma's Got A Facebook", "STALKIN' YOUR MOM"],
    'Post Malone': ['I Know']
  })
    .map(([author, songs]) => songs.map(title => `${author} - ${title}`))
    .flat(), // Turn this object into a string[] of 'Author - Song' names
  Games: [
    // Finally, the actual games lmao
    'Pac-Man Championship Edition DX+',
    'Yandere Simulator',
    'Pac-Man Championship Edition 2',
    'Club Penguin',
    'Club Penguin Island',
    'Hong Kong 97',
    "Sonic's Schoolhouse",
    'Desert Bus',
    'Shrek Extra Large', // Somehow a real game.
    'Super Bernie World', // Yes this is too
    'Roblox', // I know this is a game engine
    'Minecraft',
    'Skyrim',
    'SuperTuxKart', // Crashed my laptop when I press Enter or Space while paused.
    'Sonic 06',
    'Metal Gear Solid 4',
    'Action 52',
    'Animal Crossing: New Horizons',
    'Meme Run'
  ],
  'Fake Games': [
    'Hello Kitty Island Adventure',
    'FL Studio: SoundCloud Rapper Edition',
    'Fake Download Button Simulator',
    'Funny Fortain',
    'Battletoads for Wii',
    'Fortnut', // i mean kinda
    'The Elder Scrolls 6', // Not yet
    'Mega Man Legends 3',
    'BLJ Simulator'
  ],
  Puns: [
    'with recursion', // haha get it v6
    'with your sanity',
    'with yo mama',
    'with a broken god',
    'with Brody Foxx',
    'with GIFs',
    'games with the mortals',
    'with the Infinity Gauntlet',
    'with your Discord server',
    'with a stone, Luigi.'
  ],
  Random: [
    // All of these are from esmBot.
    'h',
    'a game',
    'anime',
    'absolutely nothing',
    'epic mashups bro',
    'Jake Paul videos on repeat',
    'gniyalꟼ',
    'the Cat Piano',
    'HaaH WaaW',
    'dQw4w9WgXcQ', // never gonna give you up
    'the funny memes epic',
    'Bottom Text',
    'lol 7',
    'Family Guy',
    'yeah',
    'Rofa Cat',
    'jeff',
    'woo yeah',
    'joe mama',
    '#BringBackNationalSex',
    'the',
    'sissy hypnosis',
    'PogChamp',
    'yourself',
    'sentience',
    'beep boop',
    'Hello, Gordon!',
    // add your messages here
    'now this is a j',
    'fuck macOS'
  ]
}

const flatten = <Type> (messages: Nested<Type> | Type[]): Type[] => {
  const result = Object.values(messages)
    .map(val => Array.isArray(val) ? val : Object.values(val).flat())
    .flat()

  return result.some(Array.isArray) ? flatten(result) : result
}

const all = flatten(messages)

export { messages, all }
