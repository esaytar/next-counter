import CalendarSlider from "@/components/CalendarSlider";
import Card from "@/components/Card";
import HeadCard from "@/components/HeadCard";
import MonthCard from "@/components/MonthCard";

export function setDiffTime(date) {
  const timeNow = new Date()
  const target = new Date(date)
  const diff = target - timeNow
  return diff
}

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

const demDate = "2025-07-05 00:00:00"
const nearestCall = findNextSunday()
export const dates = [
  { reason: 'повестка', date: "2024-07-02 08:00:00" },
  { reason: 'призыв', date: "2024-07-05 00:00:00" },
  { reason: 'двухлетие знакомства', date: "2024-07-18 20:55:00" },
  { reason: 'кошачий день', date: "2024-07-29 00:00:00" },
  { reason: 'присяга', date: "2024-08-02 09:00:00" },
  { reason: 'рыбий день', date: "2024-08-29 00:00:00" },
  { reason: 'годовщина', date: "2024-09-06 00:00:00" },
  { reason: '300 дней', date: "2024-09-08 00:00:00" },
  { reason: 'четверть службы', date: "2024-10-04 00:00:00" },
  { reason: '200 дней', date: "2024-12-17 00:00:00" },
  { reason: 'половина службы', date: "2025-01-03 00:00:00" },
  { reason: 'новый год', date: "2025-01-01 00:00:00" },
  // { reason: '23 февраля', date: "2025-02-23 00:00:00" },
  { reason: '100 дней', date: "2025-03-27 00:00:00" },
  { reason: 'четверть до дембеля', date: "2025-04-04 00:00:00" },
  { reason: 'дембель', date: demDate },
  { reason: 'ближайший звонок', date: nearestCall },
]

export default function Home() {
  const sortedDates = dates.slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .filter(a => new Date(a.date) > new Date())
    .concat(dates
      .filter(a => new Date(a.date) < new Date())
      .sort((a, b) => new Date(b.date) - new Date(a.date))
    )

  return (
    // <main className="flex flex-col lg:flex-row gap-2.5 w-full">
    //   <div className="flex flex-col lg:w-full 2xl:w-5/6 gap-2.5">
    //     <HeadCard currentDate={demDate}/>
    //     <div className="bg-white w-full h-100dvh rounded-xl shadow-lg p-4 text-[1.05rem]">
    //       <div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-3 gap-x-2.5 gap-y-5">
    //         {dmbYear.map((item, index) => (
    //           <MonthCard 
    //             key={index} 
    //             month={item.month}
    //             year={item.year}
    //             number={item.number} 
    //             dmb={dates[1].date}
    //           />
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    //   <div className="h-[1080px]  lg:w-3/6">
    //     <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-2.5 pb-2.5 ">
    //       {sortedDates.map((item, index) => (
    //         <Card 
    //           key={index}
    //           date={item.date}
    //           reason={item.reason}
    //         />
    //       ))}
    //     </div>
    //   </div>
    // </main>
    <main className="flex flex-col gap-2.5 w-full">
      <div className="flex flex-col gap-2.5">
        <HeadCard currentDate={demDate}/>
        <div className="flex gap-2.5 items-start flex-col sm:flex-row">
          <div className="bg-white w-full rounded-xl shadow-lg lg:p-4 p-3 text-lg overflow-hidden">
            <CalendarSlider/>
          </div>
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-2.5 pb-2.5 lg:w-3/5 w-full">
            {sortedDates.map((item, index) => (
              <Card 
                key={index}
                date={item.date}
                reason={item.reason}
              />
            ))}
          </div>  
        </div>
      </div>
    </main>
  );
}