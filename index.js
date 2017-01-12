require('dotenv').config()
'use strict'
const http = require('http')

http.createServer((req, res) => {
  console.log(`// ->LISTENING ON PORT ${process.env.PORT || 5000}`)
}).listen(process.env.PORT || 5000)

/** Require Discord.js */
let Discord
try {
  Discord = require('discord.js')
} catch (e) {
  console.log('// ->ERROR. COULD NOT ACQUIRE NECESSARY FILES.\n')
}

/** Create new bot */
let cog
try {
  cog = new Discord.Client()
} catch (e) {
  console.log('// ->ERROR. COULD NOT CREATE NEW AI. (REMINDER: CREATING TRUE SENTIENT AI IS HERESY AND PUNISHABLE BY DEATH.)\n')
}

/** Bot command prefix */
let prefix
try {
  prefix = '`'
} catch (e) {
  console.log('// ->ERROR. COMMAND PREFIX NONEXISTENT.\n')
}

/**
 * REQUIRE ADDITIONAL FILES
 */
// Require admin functions
const admin = require('./commands/admin')
// Require basic functions
const basic = require('./commands/basic')

/**
 * ON COMMAND RECEIVE
 */
cog.on('message', (msg) => {
  let message = msg.content.toLowerCase()
  // let memberName = msg.author.username.toUpperCase().split(' ').join('')

  // check if cmd starts with prefix
  if (!msg.content.startsWith(prefix)) {
    return
  }

  // if command sent by another bot, call noauth
  // if (msg.author.bot) {
  //   admin.noauth(msg)
  // }

/**
 * COMMAND CHECKS
 *-=-=-=-=-=-=-=-=-=
 * ADMIN
 */
  // kill
  if (message.startsWith(`${prefix}kill`)) {
    if (admin.permCheck(msg)) {
      admin.kill(msg)
    } else {
      return
    }
  }

  // super kill
  if (message.startsWith(`${prefix}superkill`)) {
    if (admin.permCheck(msg)) {
      admin.superkill(msg)
    } else {
      return
    }
  }

  // kick
  if (message.startsWith(`${prefix}kick`)) {
    if (admin.permCheck(msg)) {
      admin.kick(msg)
    } else {
      return
    }
  }

  // BANHAMMA!!!
  if (message.startsWith(`${prefix}banhamma`)) {
    if (admin.permCheck(msg)) {
      // get num from 0-7. 0 = permaban, 1-7 = days
      let num = msg.content.split(' ').slice(2)
      admin.banhamma(msg, num)
    } else {
      return
    }
  }

  /**
   * BASIC USER
   */
  // help
  if (message.startsWith(`${prefix}help`)) {
    basic.help(msg)
  }

  // to roman numerals
  if (message.startsWith(`${prefix}toroman`)) {
    basic.toroman(msg)
  }

  // from roman numerals
  if (message.startsWith(`${prefix}fromroman`)) {
    basic.fromroman(msg)
  }

  // google image search
  if (message.startsWith(`${prefix}img`)) {
    basic.img(msg)
  }

  // roll XdY
  if (message.startsWith(`${prefix}roll`)) {
    // get # of die
    let die = parseInt(msg.content.split(' ').slice(1)[0][0])
    // get # of faces
    let faces = parseInt(msg.content.split(' ').join('').split('').join('').substr(7))
    // if a proficiency is given
    if (msg.content.split(' ').length > 3) {
      // get the operator used
      let op = msg.content.split(' ').slice(2)[0]
      // get the proficiency #
      let pro = parseInt(msg.content.split(' ').slice(3))

      // pass all that into the roll function
      return basic.roll(msg, die, faces, op, pro)
    }
    // if no proficiency given just pass # of die and faces
    return basic.roll(msg, die, faces)
  }
})

/**
 * WELCOME NEW MEMBERS
 */
cog.on('guildMemberAdd', (member) => {
  let memberName = member.displayName.toUpperCase().split(' ').join('')
  console.log(`// ->NEW USER REGISTERED::${memberName}\n`)
  member.guild.defaultChannel.sendMessage(`// ->NEW USER REGISTERED::<<${memberName}>>`, {code: true})
  member.sendMessage(`// ->TYPE .HELP TO ACCESS HELP FUNCTION.`, {code: true})
})

/**
 * CATCH ERRORS
 */
cog.on('error', e => {
  console.error(e)
})

/**
 * ATTEMPT CONNECTION
 */
try {
  cog.login(process.env.BOT_TOKEN)
} catch (e) {
  console.log(`// ->ERROR. CONNECTION FAILED. CHECK TOKEN.\n------------\n${e.stack}\n`)
}

/**
 * ON DISCONNECT, RECONNECT
 */
cog.on('disconnect', () => {
  try {
    cog.login(process.env.BOT_TOKEN)
  } catch (e) {
    console.log(`// ->ERROR. RECONNECT FAILED.\n------------\n${e.stack}\n`)
  }
})

/**
 * SEND READY MESSAGE TO CONSOLE
 */
cog.on('ready', () => {
  console.log(`// ->COGITATOR # ${cog.user.id}`)
  console.log('// ->AVE IMPERATOR.\n// ->ACCESSING IMPERIAL DATA-LOOM XLVIII...\n// ->LINK SECURE. AWAITING COMMANDS...\n//--=--=--=--=--=--=--=--=--=--=--=--=--=--=\n')
})
