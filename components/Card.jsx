'use client'

import { useEffect, useState } from "react"
import {setDiffTime} from '../app/page'

export default function Card({reason, date}) {
    const [days, setDays] = useState({numberDays: '', daysWord: ''})
    const [hours, setHours] = useState({numberHours: '', hoursWord: ''})
    const [minutes, setMinutes] = useState({numberMinutes: '', minutesWord: ''})
    const [seconds, setSeconds] = useState({numberSeconds: '', secondsWord: ''})
    const [styles, setStyles] = useState('')

    const normalDate = new Date(date).toLocaleDateString()

    function updateCountdown(date) {
        const diff = setDiffTime(date)
        if (diff <= 0) {
            setStyles('!bg-gray-200 order-2')
            const now = new Date()
            const target = new Date(date)
            target.setHours(0, 0, 0, 0)
            const diffFromNow = now - target

            setDays((prev) => ({...prev, numberDays: Math.floor(diffFromNow / (1000 * 60 * 60 * 24))}))
            // setHours((prev) => ({...prev, numberHours: Math.floor((diffFromNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}))
            // setMinutes((prev) => ({...prev, numberMinutes: Math.floor((diffFromNow % (1000 * 60 * 60)) / (1000 * 60))}))
            // setSeconds((prev) => ({...prev, numberSeconds: Math.floor((diffFromNow % (1000 * 60)) / 1000)}))
        } else {
            setStyles('')
            setDays((prev) => ({...prev, numberDays: Math.floor(diff / (1000 * 60 * 60 * 24))}))
            setHours((prev) => ({...prev, numberHours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}))
            setMinutes((prev) => ({...prev, numberMinutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))}))
            setSeconds((prev) => ({...prev, numberSeconds: Math.floor((diff % (1000 * 60)) / 1000)}))
        }

        function setRightWord(numbers, ...forms) {
            let stringDate
            const length = numbers.toString().length
            let lastNumber = numbers.toString()[length - 1]
            if (lastNumber > 4 || lastNumber == 0 || (numbers > 10 && numbers < 20)) stringDate = forms[0]
            else if (lastNumber == 1) stringDate = forms[1]
            else stringDate = forms[2]
            return stringDate
        }

        setDays((prev) => ({...prev, daysWord: setRightWord(prev.numberDays, 'дней', 'день', 'дня')}))
        setHours((prev) => ({...prev, hoursWord: setRightWord(prev.numberHours, 'часов', 'час', 'часа')}))
        setMinutes((prev) => ({...prev, minutesWord: setRightWord(prev.numberMinutes, 'минут', 'минута', 'минуты')}))
        setSeconds((prev) => ({...prev, secondsWord: setRightWord(prev.numberSeconds, 'секунд', 'секунда', 'секунды')}))
    }

    useEffect(() => {
        updateCountdown(date)
        setInterval(() => updateCountdown(date), 1000)
    }, [])

    return (
        <div className={`${styles} bg-white p-3 lg:p-4 rounded-xl w-full flex flex-col gap-2.5 items-start cursor-pointer`}>
            <p className="text-xl font-medium text-start flex items-center break-words flex-wrap"><span className={`mr-2 ${styles == '' ? 'text-red-500' : 'text-gray-500'}`}>{normalDate}</span> | {reason}</p>
            <div className="text-xl text-start flex gap-1 sm:gap-2 items-start justify-start h-full !font-normal flex-wrap">
                <div className={((new Date().getDate() === new Date(date).getDate()) && (new Date().getMonth() === new Date(date).getMonth())) || days.numberDays > 0 ? 'block' : 'hidden'}>
                    {(new Date().getDate() === new Date(date).getDate()) && (new Date().getMonth() === new Date(date).getMonth()) ? 
                        <span className="text-red-500 font-semibold">СЕГОДНЯ</span> 
                        : (<>
                            {days.numberDays !== 0 ? [days.numberDays, days.daysWord].join(' ') : ''}
                            {styles !== '' ? ' назад' : ''}
                        </>)}
                </div>
                {styles === '' ? (<>
                    <div className={`${hours.numberHours == 0 ? 'hidden' : 'block'}`}>{[hours.numberHours, hours.hoursWord].join(' ')}</div>
                    <div className={`${minutes.numberMinutes == 0 ? 'hidden' : 'block'}`}>{[minutes.numberMinutes, minutes.minutesWord].join(' ')}</div>
                    <div>{[seconds.numberSeconds, seconds.secondsWord].join(' ')}</div>
                </>) : ''}
            </div>
        </div>
    )
}