require('dotenv').config()
'use strict'

/** Require Discord.js */
let Discord
try {
  Discord = require('discord.js')
} catch (e) {
  console.log('// ->ERROR. COULD NOT ACQUIRE NECESSARY FILES.')
}

/** Create new bot */
let cog
try {
  cog = new Discord.Client()
} catch (e) {
  console.log('// ->ERROR. COULD NOT CREATE NEW AI. (REMINDER: CREATING SENTIENT AI IS HERESY AND PUNISHABLE BY DEATH.)')
}

/** Bot command prefix */
let prefix
try {
  prefix = '.'
} catch (e) {
  console.log('// ->ERROR. COMMAND PREFIX NONEXISTENT.')
}

/**
 * REQUIRE ADDITIONAL FILES
 */
// Require admin functions
const adminFnc = require('./functions/admin')
// Require basic functions
const basicFnc = require('./functions/basic')

/**
 * ADMIN COMMANDS
 */
const adminCmd = {
  'kill': `${prefix}kill`
}

/**
 * BASIC COMMANDS
 */
const basicCmd = {
  'help': `${prefix}help`,
  'ayy': 'ayy'
}

/**
 * ON COMMAND RECEIVE
 */
cog.on('message', msg => {
  let message = msg.content.toLowerCase()
  let memberName = msg.author.username.toUpperCase().split(' ').join('')
  let user = msg.member

  // check if cmd starts with prefix
  if (!msg.content.startsWith(prefix)) {
    return
  }

  // if command sent by another bot, call noauth
  if (msg.author.bot) {
    adminFnc.noauth(msg)
  }

  // check command
  switch (message) {
    case adminCmd['kill']:
      adminFnc.kill(msg)
      break

    case basicCmd['help']:
      basicFnc.help(user)
      break

    case basicCmd['ayy']:
      basicCmd.ayy(msg)
      break
  }
})

/**
 * WELCOME NEW MEMBERS
 */
cog.on('guildMemberAdd', (member) => {
  let memberName = member.username.toUpperCase().split(' ').join('')
  console.log(`// ->NEW OPERATOR REGISTERED::${member.user.username}`)
  member.guild.defaultChannel.sendMessage(`// ->NEW OPERATOR REGISTERED::<<${memberName}>>`, {code: true})
  member.guild.defaultChannel.sendMessage(`// ->TYPE .HELP TO ACCESS HELP FUNCTION.`, {code: true})
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
  console.log('// ->ERROR. CONNECTION FAILED. CHECK TOKEN.')
}

/**
 * SEND READY MESSAGE TO CONSOLE
 */
cog.on('ready', () => {
  console.log(cog.user.id)
  console.log('// ->AVE IMPERATOR.')
  console.log('// ->ACCESSING DATA-LOOM...')
  console.log('// ->LINK SECURE. AWAITING COMMANDS...')
  console.log('//--=--=--=--=--=--=--=--=--=--=--=--=--=--=')
})
