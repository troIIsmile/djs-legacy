# <a href="https://nxtbot.ml"><img src="https://raw.githubusercontent.com/NXTB0T/NXTB0T.github.io/master/icon.svg" title="nxt" alt="nxt"></a>

> Yet another Discord bot.


![Node.js CI](https://github.com/NXTB0T/node/workflows/Node.js%20CI/badge.svg) [![License](http:s//img.shields.io/:license-isc-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)


[![INSERT YOUR GRAPHIC HERE](https://i.imgur.com/dt8AUb6.png)]()

---

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Contributing](#contributing)
- [Team](#team)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)

---

## Installation

- All the `code` required to get started
- Images of what it should look like

### Clone

- Clone this repo to your local machine using `https://github.com/nxtb0t/node`

### Setup
```shell
$ cp example.env .env
$ # fill out the .env file 
$ sudo apt install ffmpeg
$ npm install
```
---

## Features

- A download command
- Recursive command folder
- Works in Repl.it
- 

## Usage
`npm start`
---

## Contributing

### Step 1

- **Option 1**
    - 🍴 Fork this repo!

- **Option 2**
    - 👯 Clone this repo to your local machine using `https://github.com/nxtb0t/node.git`

### Step 2

- Follow the setup.

### Step 3

- **HACK AWAY!** 🔨🔨🔨
- Commands basically are an object
  - The `help` property shows up in the help command
  - `aliases` is optional and is a `string[]` of names that will be used as aliases for your command
  - And of course: the `run` property
    - run is a function with the `this` value set to the bot (typings at utils/types)
    - if it returns a truthy value then it will try to post it
    - it has two arguments
      - argument 1 is the Discord.js message
      - argument 2 is the arguments (`string[]`)
- If you are using Visual Studio Code you should be able to create a command in a new TypeScript file by typing in "command" and pressing Tab.
- The command handler is in `events/message.ts`
- The command loader is in `events/ready.ts`
- The entry point is `init.ts`

### Step 4

- 🔃 Create a new pull request using <a href="https://github.com/nxtb0t/node/compare/" target="_blank">`https://github.com/nxtb0t/node/compare/`</a>.

---

## Team


| <a href="https://5079.ml" target="_blank">**Jack5079**</a> | <a href="https://5079.ml" target="_blank">**Jack5079**</a> | <a href="https://5079.ml" target="_blank">**Jack5079**</a> |
| :---: |:---:| :---:|
| [![Jack5079](https://avatars1.githubusercontent.com/u/29169102?v=3&s=200)](https://5079.ml)    | [![Jack5079](https://avatars1.githubusercontent.com/u/29169102?v=3&s=200)](https://5079.ml) | [![Jack5079](https://avatars1.githubusercontent.com/u/29169102?v=3&s=200)](https://5079.ml)  |
| <a href="https://github.com/Jack5079" target="_blank">`github.com/Jack5079`</a> | <a href="https://github.com/Jack5079" target="_blank">`github.com/Jack5079`</a> | <a href="https://github.com/Jack5079" target="_blank">`github.com/Jack5079`</a> |

---

## FAQ

- **How do I (question)?**
    - I have no idea.

---

## Support

Reach out to me at one of the following places!

- Website at <a href="https://nxtbot.ml" target="_blank">`nxtbot.ml`</a>
- Twitter at <a href="https://twitter.com/InviteNXT" target="_blank">`@InviteNXT`</a>

---

## License

[![License](https://img.shields.io/:license-isc-blue.svg?style=flat-square)]()

- **[ISC license](https://opensource.org/licenses/ISC)**
- Copyright 2020 © <a href="https://5079.ml" target="_blank">Jack</a>.
