require('dotenv').config()
'use strict'

/** Require Discord.js */
let Discord
try {
  Discord = require('discord.js')
} catch (e) {
  console.log('//ERROR. COULD NOT ACQUIRE NECESSARY FILES.')
}

/** Create new bot */
let cog
try {
  cog = new Discord.Client()
} catch (e) {
  console.log('//ERROR. COULD NOT CREATE NEW AI. (WARNING: CREATING SENTIENT AI IS HERESY.)')
}

/** Bot command prefix */
let prefix
try {
  prefix = '.'
} catch (e) {
  console.log('//ERROR. COMMAND PREFIX/SUFFIX NONEXISTENT.')
}

/**
 * ON COMMAND RECEIVE
 */
cog.on('message', msg => {
  /** Require basic functions */
  const basic = require('./functions/basic')
  const message = msg.content.toLowerCase()
  // check if author belongs to administrator permissions group
  let isAdmin = msg.member.hasPermission('ADMINISTRATOR')

  // check if cmd starts with prefix
  if (!msg.content.startsWith(prefix)) {
    return
  }

  if (msg.author.bot) {
    return msg.channel.sendMessage('```// UNAUTHORIZED QUERY.```')
  }

  // kill bot
  if (message === `${prefix}kill` && isAdmin) {
    basic.kill(msg)
  } else {
    return '```// UNAUTHORIZED QUERY.```'
  }

  // send help list
  if (message === `${prefix}help`) {
    console.log(isAdmin)
  }
})

/**
 * WELCOME NEW MEMBERS
 */
cog.on('guildMemberAdd', (member) => {
  console.log(`// NEW OPERATOR REGISTERED::${member.user.username}`)
  member.guild.defaultChannel.sendMessage('```' + '// NEW OPERATOR REGISTERED::' + `${member.user.username}` + '```')
  member.guild.defaultChannel.sendMessage('```// TYPE .HELP TO ACCESS HELP FUNCTION.')
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
  console.log('//ERROR. CONNECTION FAILED. CHECK TOKEN.')
}

/**
 * SEND READY MESSAGE TO CONSOLE
 */
cog.on('ready', () => {
  console.log(cog.user.id)
  console.log('//ACCESSING DATA-LOOM...')
  console.log('//LINK SECURE. AWAITING COMMANDS..')
  console.log('//////////////')

})
