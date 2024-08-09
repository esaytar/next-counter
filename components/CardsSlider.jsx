'use client'

import Card from "./Card";
import { register } from 'swiper/element/bundle'
import { useRef, useEffect, useState } from 'react'
register()

function findNextSunday() {
    const today = new Date()
    const daysUntilSunday = (6 - today.getDay()) % 7
    const nextSunday = new Date(today)
    nextSunday.setDate(today.getDate() + daysUntilSunday)
    nextSunday.setHours('21')
    nextSunday.setMinutes('00')
    nextSunday.setSeconds('00')
    nextSunday.setMilliseconds('00')
    return nextSunday
}
  
export const demDate = "2025-07-05 00:00:00"
const nearestCall = findNextSunday()
export const dates = [
    { reason: 'Повестка', date: "2024-07-02 08:00:00" },
    { reason: 'Призыв', date: "2024-07-05 00:00:00" },
    { reason: 'Двухлетие знакомства', date: "2024-07-18 20:55:00" },
    { reason: 'Кошачий день', date: "2024-07-29 00:00:00" },
    { reason: 'Присяга', date: "2024-08-02 09:00:00" },
    { reason: 'Рыбий день', date: "2024-08-29 00:00:00" },
    { reason: 'Годовщина', date: "2024-09-06 00:00:00" },
    { reason: '300 дней', date: "2024-09-08 00:00:00" },
    { reason: 'Четверть службы', date: "2024-10-04 00:00:00" },
    { reason: '200 дней', date: "2024-12-17 00:00:00" },
    { reason: 'Новый год', date: "2025-01-01 00:00:00" },,
    { reason: 'Половина службы', date: "2025-01-03 00:00:00" },
    { reason: '23 февраля', date: "2025-02-23 00:00:00" },
    { reason: '100 дней', date: "2025-03-27 00:00:00" },
    { reason: 'Четверть до дембеля', date: "2025-04-04 00:00:00" },
    { reason: 'Дембель', date: demDate },
    { reason: 'Ближайший звонок', date: nearestCall },
]

export default function CardsSlider() {
    const swiperRef = useRef(null)
    useEffect(() => {
        const swiperContainer = swiperRef.current
        const params = {
            injectStyles: [`
                .swiper {display: flex !important; flex-direction: column; gap: 2rem; overflow: visible !important; height: 100% !important;}
                @media (min-width: 1024px) {.swiper {gap: 50px;}}
                .swiper-pagination {position: relative !important; bottom: 0; top: 0; cursor: inherit !important; display: flex; gap: 10px; align-items: center; justify-content: center;}
                .swiper-pagination-bullet {width: 9px; height: 9px; margin: 0 !important; background: #fff !important;}
                .swiper-pagination-bullet-active {background: red !important;}
            `]
        }
        Object.assign(swiperContainer, params)
        swiperContainer.initialize()
    }, [])

    const sortedDates = dates.slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .filter(a => new Date(a.date) > new Date())
        .concat(dates
            .filter(a => new Date(a.date) < new Date())
            .sort((a, b) => new Date(b.date) - new Date(a.date))
        )

    let cuttedArray = []    
    for (let i = 0; i < sortedDates.length; i += 5) {
        cuttedArray.push(sortedDates.slice(i, i + 5))
    } 

    return (
        <swiper-container
            init="false"
            ref={swiperRef}
            slides-per-view="1"
            space-between="15"
            style={{height: '100%'}}
            >
                {cuttedArray.map((item, index) => (
                    <swiper-slide key={index}>
                        <div className={`flex flex-col ${item.length < 5 ? 'gap-2' : 'justify-between lg:gap-0 gap-2'} h-full `}>
                            {item.map((i, index) => (
                                <Card
                                    key={index}
                                    date={i.date}
                                    reason={i.reason}
                                />
                            ))}
                        </div>
                    </swiper-slide>
                ))}
        </swiper-container>
    )
}