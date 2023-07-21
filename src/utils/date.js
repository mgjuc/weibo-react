const addZero = (i) => {
    if (i<10) {
        i = '0' + i;
    }
    return i
}
const getDate = timetamp => {
    const time = new Date(timetamp)
    const y = addZero(time.getFullYear())
    const M = addZero(time.getMonth() + 1)
    const d = addZero(time.getDate())
    const h = addZero(time.getHours())
    const m = addZero(time.getMinutes())
    const s = addZero(time.getSeconds())
    return `${y}年${M}月${d}日 ${h}:${m}:${s}`
}

export default getDate