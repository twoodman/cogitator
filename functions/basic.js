// help cmd
const help = (msg) => {
  return msg.member.sendMessage('TEST', {code: true})
}

// const roll = (msg) => {
// }

const toroman = (msg) => {
  msg.channel.sendMessage('roman')
  let num = msg.content.split(' ').slice(1)
  let result = ''
  const dec = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  const roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
  for (let i = 0; i <= dec.length; i++) {
    while (num % dec[i] < num) {
      result += roman[i]
      num -= dec[i]
    }
  }
  return msg.channel.sendMessage(`// ->RESULT: ${result}`)
}

// export functions
module.exports = {
  help: help,
  // roll: roll,
  toroman: toroman
}
