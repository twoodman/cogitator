const helptxt = require('./helpers/helptxt.json')
// const insults = require('./lists/insults.json')

// help cmd
const help = (msg) => {
  if (msg.channel.type === 'dm' || msg.channel.type === 'text') {
    return msg.author.sendMessage(JSON.stringify(helptxt, null, 2).replace(/[{}",]/g, ''), {code: true})
  }
}

/**
 * ROLL FUNCTION.
 * msg = message obj
 * die = how many die(dice)
 * faces = how many faces said die has
 * op = operator. subtract, add, multiply, divide. - + * /
 * prof = proficiency. RP term meaning how much to take or subtract.
 * I added multiplication and division for fun
 */
const roll = (msg, die, faces, op, add) => {
  if (op !== '-' || op !== '+' || op !== '*' || op !== '/') {
    return msg.channel.sendMessage(`// ->YOU ROLLED: ${(Math.floor((Math.random() * (die * faces)) + 0))}${op}${add}`, {code: true})
  } else {
    return msh.channel.sendMessage(`// ->INVALID OPERATOR GIVEN. ${op}`, {code: true})
  }
}

// convert to roman numerals
const toroman = (msg) => {
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
  return msg.channel.sendMessage(`// ->RESULT: ${result}`, {code: true})
}

// convert from roman numerals
const fromroman = (msg) => {
  let num = msg.content.split(' ').slice(1)
  let result = ''
  const dec = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  const roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
  for (let i = 0; i <= dec.length; i++) {
    while (num.indexOf(roman[i]) === 0) {
      result += dec[i]
      num = num.replace(roman[i], '')
    }
  }
  return msg.channel.sendMessage(`// -> RESULT: ${result}`, {code: true})
}

// export functions
module.exports = {
  help: help,
  roll: roll,
  toroman: toroman,
  fromroman: fromroman
}
