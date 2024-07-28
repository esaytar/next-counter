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
  nextSunday.setHours('21')
  nextSunday.setMinutes('00')
  nextSunday.setSeconds('00')
  nextSunday.setMilliseconds('00')
  return nextSunday
}

export default function Home() {
  const demDate = "2025-07-05 00:00:00"
  const nearestCall = findNextSunday()

  const dates = [
    { reason: 'повестка', date: "2024-07-02 08:00:00" },
    { reason: 'призыв', date: "2024-07-05 07:30:00" },
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
    { reason: '100 дней', date: "2025-03-27 00:00:00" },
    { reason: 'четверть до дембеля', date: "2025-04-04 00:00:00" },
    { reason: 'дембель', date: demDate },
    { reason: 'ближайший звонок', date: nearestCall },
  ]

  const sortedDates = dates.slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .filter(a => new Date(a.date) > new Date())
    .concat(dates
      .filter(a => new Date(a.date) < new Date())
      .sort((a, b) => new Date(b.date) - new Date(a.date))
    )

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
            />
          ))
        }
      </div>
    </main>  
  );
}