'use client'

import { useEffect, useState } from 'react'
import styles from './MonthCard.module.css'
import {DEM_DATE} from '../data/dates'

const daysOfTheWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

export default function MonthCard({month, year, number, startDate}) {
    const [days, setDays] = useState()
    const [currentMonth, setCurrentMonth] = useState()
    const [today, setToday] = useState(new Date())

    useEffect(() => {
        setToday(new Date())
        setCurrentMonth(today.getMonth())
    }, [])

    function getLastDayOfMonth() {
        return new Date(year, number + 1, 0).getDate()
    }

    function setEmptyDiv() {
        const nullDate = new Date()
        nullDate.setMonth(number, 1)
        nullDate.setFullYear(year)
        const dnd = nullDate.getDay() === 0 ? 7 : nullDate.getDay()
        const emptyArray = []
        
        for (let i = 1; i <= dnd - 1; i++) emptyArray.push(" ")
        const iterated = emptyArray.map((i, index) => <div key={index} className={`${styles.day} ${styles.nullDay}`}>{i}</div>)
        setDays(iterated)
    }

    function getDays() {
        const date = new Date()
        date.setFullYear(year)
        date.setMonth(number, 1)

        const daysInMonth = getLastDayOfMonth()
        const daysArray = []

        for (let i = 1; i <= daysInMonth; i++) daysArray.push(i)

        const iteratedDays = daysArray.map((i, index) => {
            date.setDate(index + 1)
            const period = date >= new Date(startDate) && date <= new Date(DEM_DATE).setDate(new Date(DEM_DATE).getDate() + 1)
            const diff = date <= new Date() && date >= new Date(startDate)
            const daysTil = Math.floor((date - new Date()) / (1000 * 60 * 60 * 24))
            const daysSince = Math.ceil((date - new Date(startDate)) / (1000 * 60 * 60 * 24))

            function howMuchDays() {
                if (daysTil > 0) return `через ${daysTil} дней`
                else if (daysTil === 0) return `сегодня`
                else return `${Math.abs(daysTil)} дней назад`
            }

            function countTilDMB() {
                if (365 >= daysSince && daysSince > 0) return `| ${daysSince}-й день службы`
                else if (daysSince <= 0) return ``
                else return `| после дембеля не служим`
            }     

            return <div key={index} 
                className={`${styles.day} ${diff && styles.passedDates} ${!period && styles.notIncludedDay}`} 
                title={`${howMuchDays()} ${countTilDMB()}`}>{i}</div>
        })
        setDays((prev) => [...prev, iteratedDays])
    }

    useEffect(() => {
        setEmptyDiv()
        getDays()
    }, [])

    return (
        <div className="flex flex-col gap-2 h-auto">
            <p className={`font-bold text-center ${currentMonth === number && new Date().getFullYear() === Number(year) ?
                'text-[#ff0000]' : 'text-inherit'}`}>{month} {year}</p>
            <div className="flex flex-col gap-2.5 w-full">
                <div className="grid grid-cols-7 place-items-center font-semibold">
                    {daysOfTheWeek.map((day, index) => (
                        <p key={index} className={styles.dayOfTheWeek}>{day}</p>
                    ))}
                    {days}
                </div>
            </div>
        </div>
    )
}