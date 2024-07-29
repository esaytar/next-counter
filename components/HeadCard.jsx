'use client'

import { setDiffTime } from '@/app/page'
import { useEffect, useState } from 'react'

export default function HeadCard({currentDate}) {
    const [today, setToday] = useState('05.07.2024')
    const [weeks, setWeeks] = useState(0)
    const [daysTil, setDaysTil] = useState(0)

    function findWeeks() {
        const difference = setDiffTime(currentDate)
        return 52 - Math.round(Math.floor(difference / (1000 * 60 * 60 * 24)) / 7)
    }

    useEffect(() => {
        setWeeks(findWeeks())
        setToday(new Date().toLocaleDateString())
        setDaysTil(() => {
            const diff = setDiffTime(currentDate)
            return 365 - Math.floor(diff / (1000 * 60 * 60 * 24))
        })
    }, [today]) 

    return (
        <div className="shadow-lg w-full p-4 bg-white rounded-xl font-bold text-2xl text-center">
            <h1 className="text-red-500 font-bold">Сегодня: {today}</h1>
            отсчитываем дни!! <br/>
            <div>{daysTil} / 365 дней</div>
            <div>{weeks} / 52 недель</div>
        </div>
    )
}
