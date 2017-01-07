const kill = (msg) => {
  return msg.channel.sendMessage('```// KILLING PROCESS...```')
}

const help = (user) => {
  return user.sendMessage('TEST')
}

const noauth = (msg) => {
  return msg.reply('```' + '// <<' + msg.author.username.toUpperCase().split(' ').join('') + '>> ->UNAUTHORIZED QUERY. STAND DOWN, CITIZEN.```')
}

module.exports = {
  kill: kill,
  help: help,
  noauth: noauth
}
