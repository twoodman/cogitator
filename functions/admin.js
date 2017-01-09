// require basic cmd
// const basic = require('./basic')

// super kill, the actual kill function
const superKill = () => {
  return process.exit(1) // exit with error
}

// kill bot immediately
const kill = (msg) => {
  if (permCheck(msg)) {
    console.log(`// -><<${msg.author.username.toUpperCase().split(' ').join('')}>> CALLED KILL COMMAND. KILLING PROCESS...`)
    msg.channel.sendMessage('// ->KILLING PROCESS...', {code: true})
    return setTimeout(() => { superKill() }, 5000)
  } else {
    return noauth(msg)
  }
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
    noauthConsole(msg)
    return false
  }
}


// kick
const kick = (msg) => {
  if (permCheck(msg)) {
    msg.mentions.users.map((user) => {
      msg.channel.sendMessage(`// ->KICKING USER: ${user.username}`, {code: true})
      return msg.guild.member(user).kick()
    })
  } else {
    return noauth(msg)
  }
}

// BANHAMMER
const banhammer = (msg, num) => {
  if (permCheck(msg)) {
    msg.mentions.users.map((user) => {
      if (num === 0) {
        msg.channel.sendMessage(`// ->USER PERMA-BANNED: ${user.username}`, {code: true})
      } else {
        msg.channel.sendMessage(`// ->USER BANNED FOR ${num} DAYS: ${user.username}`, {code: true})
      }
      return msg.guild.member(user).kick()
    })
  } else {
    return noauth(msg)
  }
}



// export functions
module.exports = {
  permCheck: permCheck,
  kill: kill,
  kick: kick,
  banhammer: banhammer
}
