const theVariable = require('should')
const util = require('./util')

theVariable(util.env).should.be.an.Object()

const fakeBot = {
  guilds: {
    size: 2
  },
  commands: {

  },
  add (name, func) {
    this.commands[name] = func
  }
}
const about = require('./commands/about')

about.default({
  channel: {
    send (message, options) {
      message.should.be.a.String()
      options.code.should.be.true()
    }
  }
}, [], fakeBot)

const add = require('./commands/add')

add.default({
  author: {
    id: util.env.OWNER
  },
  channel: {
    send (message) {
      theVariable(message).should.have.a.property('length')
    }
  }
}, ['hello', 'message.channel.send("world")'], fakeBot)

const roblox = require('./commands/roblox')

roblox.default({
  channel: {
    send (options) {
      theVariable(options.files).should.be.have.a.property('length')
    }
  }
}, ['builderman'])
