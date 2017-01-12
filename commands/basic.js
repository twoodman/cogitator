'use strict'
const imageSearch = require('node-google-image-search')

// json helpers
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
  // get the query, strip it of the cmd, and convert to string
  let query = msg.content.split(' ').slice(1).join(' ').toString()
  // function to return img link to channel
  let returnImgs = (results) => {
    return msg.channel.sendMessage(results[0]['link'])
  }
  // random result
  let randomNum = Math.round(Math.random() * 99)
  // results var
  let results = imageSearch(query, returnImgs, randomNum, 1)
}

/**
 * ROLL FUNCTION.
 * msg = message obj
 * die = how many die(dice)
 * faces = how many faces said die has
 * op = operator. subtract, add. - +
 * prof = proficiency. RPG term meaning how much to take
 * or subtract based on characters skills.
 *
 */
const roll = (msg, die, faces, op = null, pro = null) => {
  // get initial result
  let result = Math.round(Math.random() * (die * faces))
  // check right off the bat for critical successes and fails
  const critical = (result) => {
    if (result === 20) {
      return msg.channel.sendMessage(`// ->RESULT: [NATURAL CRITICAL SUCCESS] = ${result}`, {code: true})
    } else if (result > 20) {
      return msg.channel.sendMessage(`// ->RESULT: [UNNATURAL CRITICAL SUCCESS] = ${result}`, {code: true})
    } else if (result <= 0) {
      return msg.channel.sendMessage(`// ->RESULT: [CRITICAL FAIL] = ${result}`, {code: true})
    }
  }
  // if operator given is subtraction
  if (op === '-') {
    // subtract from result
    result -= pro
    // check for critical fail
    if (result <= 0) { // crit fail
      critical(result)
    }
    // return result
    return msg.channel.sendMessage(`// ->RESULT: ${result}`, {code: true})
  // else if operator given is addition
  } else if (op === '+') {
    // add to result
    result += pro
    // check for critical success
    if (result === 20) { // nat crit success
      critical(result)
    } else if (result > 20) { // unnat crit success
      critical(result)
    }
    // return result
    return msg.channel.sendMessage(`// ->RESULT: ${result}`, {code: true})
  }
  // return critical successes/fails
  if (result === 20) { // nat crit success
    critical(result)
  } else if (result > 20) { // unnat crit success
    critical(result)
  }
  if (result < 0) { // crit fail
    critical(result)
  }
  // if nothing crazy special happened and no other args given, just return result
  return msg.channel.sendMessage(`// ->RESULT: ${result}`, {code: true})
}

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
  roll: roll,
  toroman: toroman,
  fromroman: fromroman,
  img: img
}
