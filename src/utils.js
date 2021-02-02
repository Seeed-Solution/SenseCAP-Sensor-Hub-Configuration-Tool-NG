
function compare2Objects(obj1, obj2) {
  //Loop through properties in object 1
  for (let p in obj1) {
    //Check property exists on both objects
    if (Object.prototype.hasOwnProperty.call(obj1, p) !== Object.prototype.hasOwnProperty.call(obj2, p))
      return false;

    switch (typeof (obj1[p])) {
      //Deep compare objects
      case 'object':
        if (!compare2Objects(obj1[p], obj2[p])) return false;
        break;
      //Compare function code
      case 'function':
        if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
        break;
      //Compare values
      default:
        if (obj1[p] != obj2[p]) return false;
    }
  }

  //Check object 2 for any extra properties
  for (let p in obj2) {
    if (typeof (obj1[p]) == 'undefined') return false;
  }
  return true;
}

function formatLocale(locale) {
  if (locale.includes('en')) return 'en'
  else if (locale.includes('zh')) return 'zh'
  else if (locale.includes('cn')) return 'zh'
  return 'en'
}

function bufferToHexWithSpace (buffer) {
  let bStrArr = []
  for (const b of buffer) {
    let bStr = b.toString(16)
    if (bStr.length < 2) bStr = '0' + bStr
    bStrArr.push(bStr)
  }
  return bStrArr.join(' ')
}

function delayMs(ms) {
  return new Promise(res => setTimeout(res, ms))
}

export { compare2Objects, formatLocale, bufferToHexWithSpace, delayMs };