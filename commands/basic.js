const fotology = require('fotology-x')

const helptxt = require('./helpers/helptxt.json')
// const insults = require('./lists/insults.json')

// help cmd
const help = (msg) => {
  if (msg.channel.type === 'dm' || msg.channel.type === 'text') {
    return msg.author.sendMessage(JSON.stringify(helptxt, null, 2).replace(/[{}",]/g, ''), {code: true})
  }
}

// image search
const img = (msg) => {
  let query = msg.content.split(' ').slice(1).join(' ').toString()
  let options = {
    limit: 1
  }
  msg.channel.sendMessage(query)
  fotology(query, options, (image) => {
    for (let i in image) {
      return msg.channel.sendMessage(image[i])
    }
  })
}

/**
 * ROLL FUNCTION.
 * msg = message obj
 * die = how many die(dice)
 * faces = how many faces said die has
 * op = operator. subtract, add, multiply, divide. - + * /
 * prof = proficiency. RPG term meaning how much to take
 * or subtract based on characters skills.
 * ==============================================================FIX LATER========
 */
// const roll = (msg, die, faces, op, pro) => {
//   let operator = op.toString()
//   msg.channel.sendMessage(operator)
//   msg.channel.sendMessage(typeof operator)
  // const operatorFunctions = {
  //   plus: (x, y) => { return x + y },
  //   minus: (x, y) => { return x - y }
  // }
  // let result
  // msg.channel.sendMessage(operator)
  // if (operator === '+') {
  //   let preResult = Math.floor(Math.random() * ((die * faces) - (0))) + 0
  //   msg.channel.sendMessage(preResult)
  //   result = operatorFunctions.plus(preResult, add)
  //   return msg.channel.sendMessage(`${result} waaaaaaa`)
  // }

//   let operate = (operator) => {
//     let result
//     if (operator === '-') {
//       result = Math.floor((Math.random() * ((die * faces) - 0) + 0)) - pro
//     } else {
//       result = Math.floor((Math.random() * ((die * faces) - 0) + 0)) + pro
//     }
//     return msg.channel.sendMessage(result)
//   }
//   if (operator === '-' || operator === '+') {
//     operate(operator)
//   } else {
//     return msg.channel.sendMessage(`// ->INVALID OPERATOR GIVEN. ${op}`, {code: true})
//   }
// }

// convert to roman numerals
const toroman = (msg) => {
  let num = msg.content.split(' ')[1]
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
  let num = msg.content.split(' ')[1]
  let result = ''
  const dec = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  const roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
  for (let i = 0; i <= dec.length; i++) {
    while (num.indexOf(roman[i]) === 0) {
      result += dec[i]
      num = num.replace(roman[i], '')
    }
  }
  return msg.channel.sendMessage(`// ->RESULT: ${result}`, {code: true})
}

// export functions
module.exports = {
  help: help,
  // roll: roll,
  toroman: toroman,
  fromroman: fromroman,
  img: img
}
