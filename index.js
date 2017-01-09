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
const admin = require('./functions/admin')
// Require basic functions
const basic = require('./functions/basic')

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

  // command checks
  if (message.startsWith(`${prefix}kill`)) {
    admin.kill(msg)
  }

  if (message.startsWith(`${prefix}kick`)) {
    admin.kick(msg)
  }

  if (message.startsWith(`${prefix}help`)) {
    basic.help(msg)
  }

  if (message.startsWith(`${prefix}toroman`)) {
    basic.toroman(msg)
  }

  if (message.startsWith(`${prefix}banhammer`)) {
    // get num from 0-7. 0 = permaban, 1-7 = days
    let num = msg.content.split(' ').slice(2)
    admin.banhammer(msg, num)
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
  // member.guild.defaultChannel.sendMessage(`// ->TYPE .HELP TO ACCESS HELP FUNCTION.`, {code: true})
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
  console.log(`// ->COGITATOR # ${cog.user.id}\n`)
  console.log('// ->AVE IMPERATOR.\n// ->ACCESSING DATA-LOOM...\n// ->LINK SECURE. AWAITING COMMANDS...\n//--=--=--=--=--=--=--=--=--=--=--=--=--=--=\n')
})
