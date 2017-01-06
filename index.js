require('dotenv').config()
'use strict'

/** Require Discord.js */
const Discord = require('discord.js')

/** Create new bot */
const cog = new Discord.Client()

/** On READY, log to console */
cog.on('ready', () => {
  console.log(':// COGITATOR ONLINE::AWAITING INPUT...')
})

/** Log bot in */
cog.login(process.env.BOT_TOKEN)
