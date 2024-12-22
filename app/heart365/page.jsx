'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import { CALL_DATE } from "@/data/dates"

const yearArray = [
    [null, null, null, null, 1, 2, 3, null, null, null, null, null, null, null, null, null, 4, 5, 6, null, null, null, null],
    [null, null, null, 7, 8, 9, 10, 11, null, null, null, null, null, null, null, 12, 13, 14, 15, 16, null, null, null],
    [null, null, 17, 18, 19, 20, 21, 22, 23, null, null, null, null, null, 24, 25, 26, 27, 28, 29, 30, null, null],
    [null, null, 31, 32, 33, 34, 35, 36, 37, 38, null, null, null, 39, 40, 41, 42, 43, 44, 45, 46, null, null],
    [null, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, null, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, null],
    [null, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, null],
    [null, null, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, null, null],
    [null, null, null, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, null, null, null],
    [null, null, null, null, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, null, null, null, null],
    [null, null, null, null, null, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, null, null, null, null, null],
    [null, null, null, null, null, null, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, 347, 348, 349, 350, 351, 352, 353, 354, 355, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, 356, 357, 358, 359, 360, 361, 362, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, 363, 364, 365, null, null, null, null, null, null, null, null, null, null]
]

const fullNumbersArray = []
for (let i = 67; i < 251; i++) {
    fullNumbersArray.push(i)
}

const cuttedNumbers = []
for (let i = 0; i < fullNumbersArray.length; i += 23) {
    cuttedNumbers.push(fullNumbersArray.slice(i, i + 23))
} 
yearArray.splice(5, 0, cuttedNumbers.flat())

export default function page() { 
    const [diff, setDiff] = useState()
    const today = new Date()
    const callDay = new Date(CALL_DATE)

    useEffect(() => {
        setDiff(Math.round((today - callDay) / (1000 * 60 * 60 * 24)))
    }, [today.getDate()])

    return (
        <div className='bg-white w-full h-full rounded-xl lg:p-4 p-3 flex items-center text-base relative'>
            <Link href='/' className="absolute l-0 t-0 self-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 9.059V6.5a1.001 1.001 0 0 0-1.707-.708L4 12l6.293 6.207a.997.997 0 0 0 1.414 0A1 1 0 0 0 12 17.5v-2.489c2.75.068 5.755.566 8 3.989v-1c0-4.633-3.5-8.443-8-8.941"/>
                </svg>
            </Link>
            <div className='m-auto lg:w-8/12 grid grid-cols-[repeat(23,_1fr)] grid-rows-[repeat(22,_minmax(0,_1fr))] overflow-x-scroll lg:overflow-hidden'>
                {yearArray.map((item) => (
                    item.map((i, index) => (
                        i !== null ? <div key={index} className={`border border-black text-right cursor-pointer ${diff > i ? 'bg-red-600 hover:bg-red-700' : 'hover:bg-gray-200'}`}>{i}</div> : <div key={index}></div>
                    ))
                ))}
            </div>
        </div>
    )
}
