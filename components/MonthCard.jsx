'use client'

import { useEffect, useState } from 'react'
import styles from './MonthCard.module.css'

export default function MonthCard({month, year, number, dmb}) {
    const [days, setDays] = useState()
    const [currentMonth, setCurrentMonth] = useState()
    const [today, setToday] = useState(new Date())

    useEffect(() => {
        setToday(new Date())
        setCurrentMonth(today.getMonth())
    }, [])

    function getLastDayOfMonth(number, year) {
        return new Date(year, number + 1, 0).getDate()
    }

    function setEmptyDiv(number, year) {
        const nullDate = new Date()
        nullDate.setMonth(number)
        nullDate.setFullYear(year)
        nullDate.setDate(1)
        const dnd = nullDate.getDay() === 0 ? 7 : nullDate.getDay()
        const emptyArray = []
        
        for (let i = 1; i <= dnd - 1; i++) emptyArray.push(" ")
        const iterated = emptyArray.map((i, index) => <div key={index} className={styles.day}>{i}</div>)
        setDays(iterated)
    }

    function getDays(number, year) {
        const date = new Date()
        date.setFullYear(year)
        date.setMonth(number)

        const daysInMonth = getLastDayOfMonth(number, year)
        const daysArray = []

        for (let i = 1; i <= daysInMonth; i++) daysArray.push(i)

        const iteratedDays = daysArray.map((i, index) => {
            date.setDate(index + 1)
            const diff = date <= new Date() && date >= new Date(dmb)
            return <div key={index} className={`${styles.day} ${diff && styles.passedDates}`}>{i}</div>
        })
        setDays((prev) => [...prev, iteratedDays])
    }

    useEffect(() => {
        setEmptyDiv(number, year)
        getDays(number, year)
    }, [])

    return (
        <div className="flex flex-col gap-2 h-auto">
            <p className={`font-bold text-center ${currentMonth === number ? 'text-[#ff0000]' : 'text-inherit'}`}>{month} {year}</p>
            <div className="flex flex-col gap-2.5 w-full">
                <div className="flex font-medium justify-between w-full place-items-center">
                    <p className={styles.dayOfTheWeek}>пн</p>
                    <p className={styles.dayOfTheWeek}>вт</p>
                    <p className={styles.dayOfTheWeek}>ср</p>
                    <p className={styles.dayOfTheWeek}>чт</p>
                    <p className={styles.dayOfTheWeek}>пт</p>
                    <p className={styles.dayOfTheWeek}>сб</p>
                    <p className={styles.dayOfTheWeek}>вс</p>
                </div>
                <div className="grid grid-cols-7 place-items-center font-semibold">
                    {days}
                </div>
            </div>
        </div>
    )
}
