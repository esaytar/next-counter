export const CALL_DATE = "2024-07-05 00:00:00"
export const DEM_DATE = new Date("2025-07-05T16:12:00+03:00")
export const dmbMidnight = new Date(DEM_DATE)
dmbMidnight.setHours(0, 0, 0, 0)
export const overallDays = Math.floor((new Date(dmbMidnight).setHours(0, 0, 0, 0) - new Date(CALL_DATE)) / (1000 * 60 * 60 * 24))
const nearestCall = getNextSunday()
const [nextMonthDate, monthsCount] = getNextMonth(DEM_DATE)
const newYear = new Date()
newYear.setFullYear(newYear.getFullYear() + 1)
newYear.setMonth(0, 1)
newYear.setHours(0, 0, 0)
export const dmbYear = []
const translations = { January: 'Январь', February: 'Февраль', March: 'Март', April: 'Апрель', May: 'Май', June: 'Июнь',
    July: 'Июль', August: 'Август', September: 'Сентябрь', October: 'Октябрь', November: 'Ноябрь', December: 'Декабрь'}

export const dates = [
    /*{ reason: 'Двухлетие знакомства', date: "2024-07-18 20:55:00" },
    { reason: 'Кошачий день', date: "2024-07-29 00:00:00" },
    { reason: 'Рыбий день', date: "2024-08-29 00:00:00" },
    { reason: 'Годовщина', date: "2024-09-06 00:00:00" }, 
    { reason: '23 февраля', date: "2025-02-23 00:00:00" },*/
    // { reason: 'Ближайший звонок', date: nearestCall },   
    // { reason: 'Повестка', date: "2024-07-02 08:00:00" },
    // { reason: 'Присяга', date: "2024-08-02 09:00:00" },
    { reason: 'Призыв', date: CALL_DATE },
    { reason: '300 дней до дембеля', date: getDaysTil(300) },
    { reason: 'Четверть службы', date: getQuarterOfTheYear() },
    { reason: '100 дней после призыва', date: getDaysTil(265) },
    { reason: '200 дней до дембеля', date: getDaysTil(200) },
    (newYear < new Date(DEM_DATE)) && { reason: 'Новый год', date: newYear },
    { reason: 'Половина службы', date: getHalfOfTheYear() },
    { reason: '200 дней после призыва', date: getDaysTil(165) },
    { reason: '100 дней до дембеля', date: getDaysTil(100) },
    { reason: 'Четверть до дембеля', date: getLastQuarter() },
    { reason: '300 дней после призыва', date: getDaysTil(65) },
    { reason: 'Дембель', date: DEM_DATE },
    ((new Date(nextMonthDate).toLocaleDateString() !== new Date(DEM_DATE).toLocaleDateString()) && (monthsCount < 11))
        && { reason: `${monthsCount} месяцев службы`, date: nextMonthDate }
]

export function printMonths() {
    const start = new Date(CALL_DATE)
    const end = new Date(DEM_DATE)
    let point = new Date(start) 

    const options = { year: 'numeric', month: 'long', day: 'numeric'}

    const translateMonths = (word) => translations[word]

    for (let i = 0; point <= end; i++) {
        let [mon, _, year] = point.toLocaleDateString('en-EN', options).replace(/,/g, '').split(' ')
        dmbYear.push({month: translateMonths(mon), number: point.getMonth(), year: year, id: i})
        const currentDay = point.getDate();
        point.setMonth(point.getMonth() + 1);

        if (point.getDate() !== currentDay) point.setDate(-1) 
    }
}

function calculateDaysDifference(demDate, callDate) {
    return (new Date(demDate) - new Date(callDate)) / (1000 * 60 * 60 * 24);
}

function addDays(baseDate, days) {
    return new Date(new Date(baseDate).getTime() + days * 24 * 60 * 60 * 1000);
}

function getDaysTil(offset) {
    const daysDiff = calculateDaysDifference(DEM_DATE, CALL_DATE);
    return addDays(CALL_DATE, daysDiff - offset);
}

function getQuarterOfTheYear() {
    const quarter = calculateDaysDifference(DEM_DATE, CALL_DATE) / 4;
    return addDays(CALL_DATE, quarter);
}

function getLastQuarter() {
    const quarter = calculateDaysDifference(DEM_DATE, CALL_DATE) / 4;
    return addDays(DEM_DATE, -quarter);
}

function getHalfOfTheYear() {
    const half = calculateDaysDifference(DEM_DATE, CALL_DATE) / 2;
    return addDays(CALL_DATE, half);
}

function getNextSunday() {
    const today = new Date()
    const daysUntilSunday = (7 - today.getDay()) % 7
    const nextSunday = new Date(today)
    nextSunday.setDate(today.getDate() + daysUntilSunday)
    nextSunday.setHours(21, 0, 0, 0)
    return nextSunday
}

function getNextMonth(data) {
    const today = new Date()
    const nextMonthDate = new Date(today)
    const stringData = new Date(data)

    let monthsCount = 12 - ((stringData.getFullYear() - today.getFullYear()) * 12 + (stringData.getMonth() - today.getMonth()))
    nextMonthDate.setDate(stringData.getDate())

    if (stringData.getDate() > today.getDate()) {
        nextMonthDate.setMonth(today.getMonth())
    } else {
        monthsCount++
        nextMonthDate.setMonth(today.getMonth() + 1)
    }
    nextMonthDate.setHours(0, 0, 0, 0)

    return [nextMonthDate, monthsCount]
}