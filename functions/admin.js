// require basic cmd
const basic = require('./basic')

// returns if user doesn't have proper perms
const noauth = (msg) => {
  return msg.reply(`// <<${msg.author.username.toUpperCase().split(' ').join('')}>> ->UNAUTHORIZED QUERY. STAND DOWN, CITIZEN.`, {code: true})
}

// check if admin
const permCheck = (msg) => {
  if (msg.member.hasPermission('ADMINISTRATOR')) {
    console.log('admin')
    return true
  } else {
    console.log(`// <<${msg.author.username.toUpperCase.split(' ').join('')}>> ->ATTEMPTED UNAUTHORIZED COMMAND. \n// ->${msg.content}`)
    return false
  }
}

// kill bot immediately
const kill = (msg) => {
  if (permCheck(msg)) {
    console.log('kill call')
    return msg.channel.sendMessage('// KILLING PROCESS...', {code: true})
  } else {
    return noauth(msg)
  }
}

// export functions
module.exports = {
  permCheck: permCheck,
  kill: kill
}
