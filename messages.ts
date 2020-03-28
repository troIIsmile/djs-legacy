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
  'Operating Systems': {
    Linux: [
      'Ubuntu',
      'KDE neon', // kde users when they see a lawn gnome in their neighbor's yard
      'Kubuntu',
      'Arch Linux',
      'SteamOS',
      'Hannah Montana Linux' // The one true Linux distro.
    ],
    Windows: [
      'Windows 10',
      'Windows 7',
      'Windows Vista',
      'Windows XP',
      'Windows 95',
      'Windows 3.1'
    ]
  },
  Apps: [ // Apps are programs on mobile
    'TikTok',
    'iPod Music'
  ],
  Programs: [ // Programs are apps on PC
    'MS Paint',
    'Skype', // Communication tool for free calls and chat
    'Blender', // The free and open source 3D creation suite.
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
    Switch: [
      'Super Mario Maker 2',
      'Super Smash Bros. Ultimate',
    ],
    Other: [
      'Yoshi for the NES',
      'Nintendo™',
      'Game Boy Advance Video',
      'Wario World',
      'Mario',
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
  Emulators: [
    'Yuzu',
    'Dolphin Emulator',
    'RetroArch'
  ],
  NXTBOT: [ // References to this bot
    'Report bugs to github.com/Jack5079/NXTBOT/issues',
    'Submit playing lines on github: Jack5079/NXTBOT',
    'NXTBOT v4 full release coming soon'
  ],
  Songs: Object.entries({
    'Scatman John': [
      "Scatman's World"
    ],
    'Alex Arcoleo': [
      'Bloom 7'
    ],
    'Neil Cicierega': [
      'Wow Wow',
      'The Starting Line'
    ],
    TOPAZ: [ // topazzz.bandcamp.com to be exact
      'Half Awake, Pt. 2',
      'Half Awake, Pt. 1'
    ],
    'Fatty Spins': [
      "Doin' Your Mom", // you know we straight
    ],
    'FAT DAMON': [
      'Conspiracy Theory Guy'
    ],
    'Your Favorite Martian': [
      "Grandma's Got A Facebook"
    ]
  }).map(name => { // Turn this object into a string[] of 'Author - Song' names
    const author = name[0]
    const songsByAuthor = name[1]
    return songsByAuthor.map(title=>`${author} - ${title}`)
  }).flat(),
  Games: [ // Finally, the actual games lmao
    'Pac-Man Championship Edition DX+',
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
    'SuperTuxKart', // Force restarts my PC when I press Enter or Space while paused.
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
  Puns: [
    'with your sanity',
    'with yo mama',
    'with a broken god',
    'games with the mortals',
    'with the Infinity Gauntlet',
    'with your Discord server',
    'with a stone, Luigi.',
    'the Cat Piano',
  ],
  Websites: [
    'Twitter', // "It's what's happening."
    'Reddit', // will keep you updated
    'YouTube', // "Broadcast Yourself"
    'MDN Web Docs' // the current name
  ],
  Random: [ // All of these are from esmBot.
    'h',
    'a game',
    'anime',
    'absolutely nothing',
    'epic mashups bro',
    'Jake Paul videos on repeat',
    'gniyalP',
    'HaaH WaaW',
    'dQw4w9WgXcQ',
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
    'with GIFs'
  ]
}

// Thanks to https://stackoverflow.com/a/49042916 for the flatten function
const flatten = (obj, path = '') => {        
    if (!(obj instanceof Object)) return {[path.replace(/\.$/g, '')]:obj};

    return Object.keys(obj).reduce((output, key) => {
        return obj instanceof Array ? 
             {...output, ...flatten(obj[key], path +  '[' + key + '].')}:
             {...output, ...flatten(obj[key], path + key + '.')};
    }, {});
}

const all = Object.values(flatten(messages)).flat()

export { messages, all }