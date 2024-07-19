'use client'

import { setDiffTime } from '@/app/page'
import { useEffect, useState } from 'react'

export default function HeadCard({currentDate}) {
    const [today, setToday] = useState('05.07.2024')
    const [weeks, setWeeks] = useState('52')

    function findWeeks() {
        const difference = setDiffTime(currentDate)
        const weeks = Math.round(Math.floor(difference / (1000 * 60 * 60 * 24)) / 7)
        return weeks
    }

    useEffect(() => {
        setWeeks(findWeeks())
        setToday(new Date().toLocaleDateString())
    }, [today]) 

    return (
        <div className="shadow-lg w-full p-4 bg-white rounded-xl font-bold text-2xl text-center">
            <h1 className="text-red-500 font-bold">Сегодня: {today}</h1>
            отсчитываем дни!! <br/>
            <span id="weeks">{weeks} / 52 недель</span>
        </div>
    )
}
