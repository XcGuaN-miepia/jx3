/**
 * 获取某一路由参数的数组
 *
 * @param {string} originStr 源字符串
 * @param {string} param 参数名
 * @returns {Array<string>} param数组
 */
function getUrlParamArr (originStr, param) {
  let regStr = new RegExp(`[\\?\\&]${param}=[^#\\&]*`, 'gi')
  if (!originStr || originStr === '') {
    return []
  }
  let arr = originStr.match(regStr)
  if (arr) {
    return arr.map(i => decodeURI(i.substring(i.indexOf('=') + 1)))
  } else {
    return []
  }
}
/**
 * 替换括号
 *
 * @param {string} originStr 源字符串
 * @returns {string} 替换后字符串
 */
function replaceParentheses (originStr) {
  if (originStr || originStr === '') {
    return originStr
  }
  return originStr.replace(/︵/, '（').replace(/︶/, '）')
}
/**
 * 无重复的存储/替换信息到localstorage中
 *
 * @param {string} id localstorage标识符
 * @param {any} newObj 要存储的对象内容
 * @param {any} [oldObj=undefined] 要替换的对象内容
 * @returns {Boolean} true-替换成功，false-替换失败
 */
function storeNewToOldNoRepetition (id, newObj, oldObj = undefined) {
  try {
    let storedArr = JSON.parse(window.localStorage.getItem(id)) || []
    // 判断存储的类型
    if (storedArr instanceof Array) {
      let storedSet = new Set()
      for (let item of storedArr) {
        storedSet.add(JSON.stringify(item))
      }
      // 添加新元素
      let newObjStr = JSON.stringify(newObj)
      storedSet.add(newObjStr)
      // 若有要替换的就删除要替换的值
      if (oldObj) {
        let oldObjStr = JSON.stringify(oldObj)
        if (storedSet.has(oldObjStr)) {
          storedSet.delete(oldObjStr)
        }
      }
      // 转换set回数组并存储
      let newArr = []
      for (let item of storedSet.values()) {
        newArr.push(JSON.parse(item))
      }
      window.localStorage.setItem(id, JSON.stringify(newArr))
      return true
    } else {
      return false
    }
  } catch (err) {
    console.dir(err)
    return false
  }
}
/**
 * 设置页面标题
 *
 * @param {String} title
 */
function setTitle (title) {
  window.document.title = title
  var iframe = window.document.createElement('iframe')
  iframe.setAttribute('width', '1px')
  iframe.setAttribute('height', '1px')
  iframe.style.display = 'none'
  iframe.addEventListener('load', function () {
    setTimeout(function () {
      iframe.removeEventListener('load', function () {})
      window.document.body.removeChild(iframe)
    }, 0)
  })
  window.document.body.appendChild(iframe)
}

/**
 * 时间比较(HH:mm:ss)
 *
 * @param {String} startDate
 * @param {String} endDate
 * @returns
 */
function compareDate (startDate, endDate) {
  var arrStart = startDate.split(':')
  var startTime = new Date(arrStart[0], arrStart[1], arrStart[2])
  var startTimes = startTime.getTime()
  var arrEnd = endDate.split(':')
  var endTime = new Date(arrEnd[0], arrEnd[1], arrEnd[2])
  var endTimes = endTime.getTime()
  if (endTimes < startTimes) {
    return false
  }
  return true
}
/**
 * 时间比较(yyyy-MM-dd)
 *
 * @param {String} startDate
 * @param {String} endDate
 * @returns
 */
function compareDate2 (startDate, endDate) {
  var arrStart = startDate.split('-')
  var startTime = new Date(arrStart[0], arrStart[1], arrStart[2])
  var startTimes = startTime.getTime()
  var arrEnd = endDate.split('-')
  var endTime = new Date(arrEnd[0], arrEnd[1], arrEnd[2])
  var endTimes = endTime.getTime()
  if (endTimes <= startTimes) {
    return false
  }
  return true
}

/**
 * 增加路由配置component属性
 * component属性名称需要和路由name属性名称相同
 *
 * @param {Array} routes
 * @param {String} param
 * @param {Array} value
 * @returns
 */
function addRouteComponent (routes, param, value) {
  routes.forEach(ele => {
    value.forEach(res => {
      if (res.prototype.constructor.name === ele.name) {
        ele[param] = res
      }
    })
  })
  return routes
}
export {
  getUrlParamArr,
  replaceParentheses,
  storeNewToOldNoRepetition,
  setTitle,
  // log,
  compareDate,
  compareDate2,
  addRouteComponent
}
