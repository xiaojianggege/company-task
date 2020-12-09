const myDate = new Date()
let month = myDate.getMonth() + 1 // 当前月
let year = myDate.getFullYear() // 当前年
let time = myDate.getDate() // 当前号
function isRecently (date, long) {
    let strDate = date.slice(0,10)
    let dateArr = strDate.split('-')

    // 对月份做减三的处理 如果减完小于0，则回到去年
    month = month - long
    if(month <= 0)  {
        month = 12 + month
        year = year - 1
    }
    // 先比较年
    if (dateArr[0] == year) {
        if(month > dateArr[1]) return false // 年份相同直接比较月，月大直接false
        else if(month == dateArr[1]) {
            if(time > dateArr[2]) return false
            return true
        } else return true
    }
    return false
}

export default isRecently



