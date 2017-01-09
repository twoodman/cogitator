require('dotenv').config()
'use strict'

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
  console.log('// ->ERROR. COULD NOT CREATE NEW AI. (REMINDER: CREATING SENTIENT AI IS HERESY AND PUNISHABLE BY DEATH.)\n')
}

/** Bot command prefix */
let prefix
try {
  prefix = '.'
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
  if (msg.author.bot) {
    admin.noauth(msg)
  }

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

  // roll XdY
  if (message.startsWith(`${prefix}roll`)) {
    // get x, y (how many die, faces)
    let die = msg.content.split(' ').slice(1).join('').split('')[0]
    let faces = msg.content.split(' ').slice(1).join('').split('')[2]
    let add = msg.content.split(' ').slice(3)
    let op = msg.content.split(' ').slice(2)
    if (add && typeof parseInt(add) !== 'number') {
      msg.channel.sendMessage('// ->GIVEN ARGUMENTS MUST BE OF TYPE <<NUMBER>>', {code: true})
    } else {
      if (typeof parseInt(die) !== 'number' || typeof parseInt(faces) !== 'number') {
        msg.channel.sendMessage('// ->GIVEN ARGUMENTS MUST BE OF TYPE <<NUMBER>>', {code: true})
      } else {
        basic.roll(msg, die, faces, add)
      }
    }
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
