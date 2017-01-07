// help cmd
const help = (user) => {
  return user.sendMessage('TEST', {code: true})
}

// export functions
module.exports = {
  help: help
}
