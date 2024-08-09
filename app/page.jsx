import CalendarSlider from "@/components/CalendarSlider";
import CardsSlider from "@/components/CardsSlider";
import HeadCard from "@/components/HeadCard";
import { demDate } from "@/components/CardsSlider";

export function setDiffTime(date) {
  const timeNow = new Date()
  const target = new Date(date)
  const diff = target - timeNow
  return diff
}

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row gap-2.5 w-full">
      <div className="flex flex-col md:w-3/6 xl:w-8/12 gap-2.5">
        <HeadCard currentDate={demDate}/>
        <div className="bg-white w-full rounded-xl lg:p-4 p-3 text-lg overflow-hidden">
          <CalendarSlider/>
        </div>
      </div>
      <div className="lg:w-full overflow-x-hidden h-full">
        <CardsSlider/>
      </div>
    </main>
  );
}