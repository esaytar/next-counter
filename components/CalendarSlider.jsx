'use client'

import { register } from 'swiper/element/bundle'
import MonthCard from './MonthCard'
import { useRef, useEffect, useState } from 'react'
import {dmbYear, dates, printMonths, DEM_DATE, CALL_DATE} from '../data/dates'

register()
printMonths()

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

    function setSliderPosition() {
        if (dmbYear[0].number === new Date().getMonth() 
            && new Date().getFullYear() === Number(dmbYear[0].year)) return 0
        else if (dmbYear[dmbYear.length - 1].number === new Date().getMonth() || new Date(DEM_DATE) < new Date()) return dmbYear.length - 1
        else return Math.abs(new Date(DEM_DATE).getMonth() - new Date().getMonth() + 1)
    }

    useEffect(() => {
        if (!swiperRef) return 
        const swiperContainer = swiperRef.current
        const params = {
            initialSlide: setSliderPosition(),
            breakpoints: {
                0: { initialSlide: setSliderPosition()},
                455: { slidesPerView: 2 }, 
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
                                startDate={CALL_DATE}
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
                        startDate={CALL_DATE}
                    />  
                ))}
            </div>
        </>
    )
}
