'use client'

import Card from "./Card";
import { register } from 'swiper/element/bundle'
import { useRef, useEffect } from 'react'
import { dates } from '../data/dates'
register()

export default function CardsSlider({state}) {
    const swiperRef = useRef(null)
    useEffect(() => {
        const swiperContainer = swiperRef.current
        const params = {
            // breakpoints: {
            //     // 0: {pagination: true},
            //     768: {pagination: false}
            // },
            injectStyles: [`
                .swiper {display: flex !important; flex-direction: column; gap: 2rem; overflow: visible !important; height: 100% !important;}
                @media (min-width: 1024px) {.swiper {gap: 50px;}}
                .swiper-pagination {position: relative !important; bottom: 0; top: 0; cursor: inherit !important; display: flex; gap: 10px; align-items: center; justify-content: center;}
                .swiper-pagination-bullet {width: 9px; height: 9px; margin: 0 !important; background: #fff !important; opacity: var(--swiper-pagination-bullet-inactive-opacity, 0.35)}
                .swiper-pagination-bullet-active {background: red !important; opacity: var(--swiper-pagination-bullet-opacity, 1)}
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
        <>
            <div className={`h-full ${state ? 'block' : 'hidden'}`}>
                <swiper-container
                    init="false"
                    ref={swiperRef}
                    slides-per-view="1"
                    space-between="15"
                    style={{height: '100%'}}
                    >
                        {cuttedArray.map((item, index) => (
                            <swiper-slide key={index}>
                                <div className={`flex flex-col ${item.length < 5 || !state ? 'gap-2' : 'justify-between lg:gap-0 gap-2'} h-full `}>
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
            </div>
            <div className={`h-full flex-col gap-2 ${state ? 'hidden' : 'flex'}`}>
                {sortedDates.map((item, index) => (
                    <Card
                        key={index}
                        date={item.date}
                        reason={item.reason}
                />))}
            </div>
        </>
    )
}