
const utils = {
  fixedZero (val) {
    return val * 1 < 10 ? `0${val}` : val
  },
  timeFormat (fmt, date) { // author: meizz
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    }
    return fmt
  },
  zeroFormat (val) {
    let len = 8 - val.length
    let data = ''
    for (let i = 0; i < len; i++) {
      data += '0'
    }
    return data + val
  },
  statusFormat (code) {
    // console.log(code.length)
    // 55 aa 0f a1 49 18 021600020002020000019e58
    if (code.length === 36) {
      return {
        statusCode1: this.zeroFormat(parseInt(code[8] + code[9], 16).toString(2)), // 功能运行状态1
        statusCode2: this.zeroFormat(parseInt(code[10] + code[11], 16).toString(2)), // 功能运行状态2
        zuowenCode: code[12] + code[13], // 设置的座温档位
        zuowen: parseInt(code[14] + code[15], 16), // 当前座温温度
        shuiwenCode: code[16] + code[17], // 设置的水温档位
        fengwenCode: code[18] + code[19], // 设置的风温档位
        shuiwen: parseInt(code[20] + code[21], 16), // 当前水温温度
        shuiyaCode: code[22] + code[23], // 设置的水压档位
        pengangCode: code[24] + code[25], // 设置的喷杆位置
        xitong: code[26] + code[27], // 系统位
        error1: this.zeroFormat(parseInt(code[28] + code[29], 16).toString(2)), // 故障位1
        error2: this.zeroFormat(parseInt(code[30] + code[31], 16).toString(2)) // 故障位2
      }
    } else {
      return false
    }
  },
  strToHexCharCode (str) {
    if (str === '') {
      return ''
    }
    var hexCharCode = []
    for (var i = 0; i < str.length; i++) {
      hexCharCode.push((str.charCodeAt(i)).toString(16))
    }
    return hexCharCode.join('')
  },
  isPhone (phone) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!myreg.test(phone)) {
      return false
    } else {
      return true
    }
  }
}

export default utils
