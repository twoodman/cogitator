// super kill, the actual kill function
const superkill = () => {
  return process.exit(1) // exit with error
}

// kill bot immediately
const kill = (msg) => {
  console.log(`// -><<${msg.author.username.toUpperCase().split(' ').join('')}>> CALLED KILL COMMAND. KILLING PROCESS...`)
  msg.channel.sendMessage('// ->KILLING PROCESS...', {code: true})
  return setTimeout(() => { superkill() }, 5000)
}

// attempt unauth cmd return
const noauthConsole = (msg) => {
  console.log(`// -><<${msg.author.username.toUpperCase().split(' ').join('')}>> ->ATTEMPTED UNAUTHORIZED COMMAND. \n// ->${msg.content}`)
}

// returns if user doesn't have proper perms
const noauth = (msg) => {
  return msg.channel.sendMessage(`// -><<${msg.author.username.toUpperCase().split(' ').join('')}>> ->UNAUTHORIZED QUERY. STAND DOWN, CITIZEN.`, {code: true})
}

// check if admin
const permCheck = (msg) => {
  if (msg.member.hasPermission('ADMINISTRATOR')) {
    return true
  } else {
    noauth(msg)
    noauthConsole(msg)
    return false
  }
}

// kick
const kick = (msg) => {
  msg.mentions.users.map((user) => {
    msg.channel.sendMessage(`// ->KICKING USER: ${user.username}`, {code: true})
    return msg.guild.member(user).kick()
  })
}

// BANHAMMA!!!
const banhamma = (msg, num) => {
  msg.mentions.users.map((user) => {
    if (num === 0) {
      msg.channel.sendMessage(`// ->USER PERMA-BANNED: ${user.username}`, {code: true})
    } else {
      msg.channel.sendMessage(`// ->USER BANNED FOR ${num} DAYS: ${user.username}`, {code: true})
    }
    return msg.guild.member(user).kick()
  })
}

// export functions
module.exports = {
  permCheck: permCheck,
  kill: kill,
  superkill: superkill,
  kick: kick,
  banhamma: banhamma,
  noauth: noauth
}
