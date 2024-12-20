'use client'

import { register } from 'swiper/element/bundle'
import MonthCard from './MonthCard'
import { useRef, useEffect, useState } from 'react'
import {dates} from './CardsSlider'

register()

const dmbYear = [
    {month: 'Июль', number: 6, year: 2024},
    {month: 'Август', number: 7, year: 2024},
    {month: 'Сентябрь', number: 8, year: 2024},
    {month: 'Октябрь', number: 9, year: 2024},
    {month: 'Ноябрь', number: 10, year: 2024},
    {month: 'Декабрь', number: 11, year: 2024},
    {month: 'Январь', number: 0, year: 2025},
    {month: 'Февраль', number: 1, year: 2025},
    {month: 'Март', number: 2, year: 2025},
    {month: 'Апрель', number: 3, year: 2025},
    {month: 'Май', number: 4, year: 2025},
    {month: 'Июнь', number: 5, year: 2025},
    {month: 'Июль', number: 6, year: 2025},
]

export default function CalendarSlider({state}) {
    const swiperRef = useRef(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        function handleResize() {
            setIsMobile(() => window.innerWidth <= 640)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (!swiperRef) return 
        const swiperContainer = swiperRef.current
        const params = {
            initialSlide: Math.abs(7 - new Date().getMonth()),
            breakpoints: {
                0: { initialSlide: Math.abs(6 - new Date().getMonth())},
                455: { slidesPerView: 2, initialSlide: Math.abs(7 - new Date().getMonth())}, 
                900: { slidesPerView: 2 },
                1300: { slidesPerView: 3 }
            },
            injectStyles: [`
                .swiper {display: flex !important; flex-direction: column; gap: 1.5rem; overflow: visible !important;}
                @media (min-width: 1024px) {.swiper {gap: 50px;}}
                .swiper-pagination {position: relative !important; bottom: 0; top: 0; cursor: inherit !important; display: flex; gap: 10px; align-items: center; justify-content: center;}
                .swiper-pagination-bullet {width: 9px; height: 9px; margin: 0 !important; background: red !important;}
                .swiper-pagination-bullet-active {background: red !important;}
            `]
        }
        Object.assign(swiperContainer, params)
        swiperContainer.initialize()
    }, [isMobile])

    return (
        <>
            <div className={state ? 'block' : 'hidden'}>
                <swiper-container
                    init="false"
                    ref={swiperRef}
                    slides-per-view="1"
                    pagination="true"
                    space-between="15"
                    >
                    {dmbYear.map((item, index) => (
                        <swiper-slide key={index}>
                            <MonthCard 
                                month={item.month}
                                year={item.year}
                                number={item.number} 
                                startDate={dates[1].date}
                            />  
                        </swiper-slide>
                    ))}
                </swiper-container>
            </div>
            <div className={`grid-cols-3 w-full gap-4 ${state ? 'hidden' : 'grid'}`}>
                {dmbYear.map((item, index) => (
                    <MonthCard 
                        key={index}
                        month={item.month}
                        year={item.year}
                        number={item.number} 
                        startDate={dates[1].date}
                    />  
                ))}
            </div>
        </>
    )
}
