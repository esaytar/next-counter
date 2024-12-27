'use client'

import { setDiffTime } from '@/app/page'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CALL_DATE } from '../data/dates'

export default function HeadCard({currentDate}) {
    const [today, setToday] = useState()
    const [weeks, setWeeks] = useState(0)
    const [daysTil, setDaysTil] = useState(0)

    function findWeeks() {
        const difference = setDiffTime(currentDate)
        return 52 - Math.ceil(Math.floor(difference / (1000 * 60 * 60 * 24)) / 7)
    }

    useEffect(() => {
        setWeeks(findWeeks())
        setToday(new Date().toLocaleDateString())
        setDaysTil(() => {
            const diff = setDiffTime(currentDate)
            return 365 - Math.ceil(diff / (1000 * 60 * 60 * 24))
        })
    }, [today]) 

    return (
        <div className="w-full lg:p-4 p-3 bg-white rounded-xl font-bold text-xl lg:text-[1.38rem] text-center relative">
            <Link href='/heart365' className='absolute top-0 left-0 lg:m-4 m-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                <path fill="currentColor" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"/>
                </svg>
            </Link>
            <div>
                <h1 className="text-red-500 font-bold">Сегодня: {today}</h1>
                <div>{daysTil > 0 ? Math.min(daysTil, 365) : 0} / 365 дней</div>
                <div>{weeks > 0 ? Math.min(weeks, 52) : 0} / 52 недель</div>
            </div>
        </div>
    )
}
