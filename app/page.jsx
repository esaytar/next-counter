import Card from "@/components/Card";
import HeadCard from "@/components/HeadCard";

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
  nextSunday.setHours('20')
  nextSunday.setMinutes('00')
  nextSunday.setSeconds('00')
  nextSunday.setMilliseconds('00')
  return nextSunday
}

export default function Home() {
  const demDate = "2025-07-05 00:00:00"
  const nearestCall = findNextSunday()

  const dates = [
    {
      reason: 'ближайший звонок',
      date: nearestCall
    },
    {
      reason: 'двухлетие знакомства',
      date: "2024-07-18 20:55:00"
    },
    {
      reason: 'присяга',
      date: "2024-08-03 00:00:00"
    },
    {
      reason: 'рыбий день',
      date: "2024-08-29 00:00:00"
    },
    {
      reason: 'годовщина',
      date: "2024-09-06 00:00:00"
    },
    {
      reason: 'новый год',
      date: "2025-01-01 00:00:00"
    },
    {
      reason: 'след. летний призыв',
      date: "2025-04-01 00:00:00"
    },
    {
      reason: 'дембель',
      date: demDate
    },
    {
      reason: 'кошачий день',
      date: "2024-07-29 00:00:00"
    },
    {
      reason: 'осенний призыв',
      date: "2024-10-01 00:00:00"
    },
  ]

  const sortedDates = dates
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .filter(a => new Date(a.date) > new Date())
    .concat(dates.filter(a => new Date(a.date) < new Date()))

  return (
    <main className="lg:w-4/6 2xl:w-3/6 flex flex-col gap-2.5 w-full">
      <HeadCard currentDate={demDate}/>
      <div className="grid sm:grid-cols-2 w-full gap-2.5 pb-2.5">
        {
          sortedDates.map((item, index) => (
            <Card 
              key={index}
              date={item.date}
              reason={item.reason}
            ></Card>
          ))
        }
      </div>
    </main>  
  );
}
