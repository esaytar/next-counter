'use client'

import CalendarSlider from "@/components/CalendarSlider";
import CardsSlider from "@/components/CardsSlider";
import HeadCard from "@/components/HeadCard";
import { demDate } from "@/components/CardsSlider";
import { useState } from "react";

export function setDiffTime(date) {
  const timeNow = new Date()
  const target = new Date(date)
  const diff = target - timeNow
  return diff
}

export default function Home() {
  const [isSlider, setIsSlider] = useState(true)

  return (
    <main className="flex flex-col md:flex-row gap-2.5 w-full ">
      <div className={`flex flex-col gap-2.5 md:w-3/6 ${isSlider ? 'xl:w-8/12' : 'xl:w-full'} relative`}>
        <HeadCard currentDate={demDate}/>
          <button className="hidden absolute top-0 right-0 bg-[#ffcccc] px-3 py-1 cursor-pointer z-10 rounded-md text-[#ff0000] 
            hover:bg-[#fcb8b8] lg:m-4 m-3 lg:block" onClick={() => {setIsSlider(!isSlider)}}>Сменить</button>
          <div className="bg-white w-full rounded-xl lg:p-5 p-3 text-lg overflow-hidden">
            <CalendarSlider state={isSlider}/>
          </div>
      </div>
      <div className={`overflow-x-hidden ${isSlider ? 'h-full lg:w-full' : 'lg:w-1/2'}`}>
        <CardsSlider state={isSlider}/>
      </div>
    </main>
  );
}