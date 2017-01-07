const kill = (msg) => {
  return msg.channel.sendMessage('```// KILLING PROCESS...```')
}

const help = (msg) => {
}

module.exports = {
  kill: kill,
  help: help
}
