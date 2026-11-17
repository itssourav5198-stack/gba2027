import { useEffect, useState } from "react";

const target = new Date("2027-03-01T00:00:00+05:30").getTime();

type Time = { days: number; hours: number; minutes: number; seconds: number };
const getTime = (): Time => {
  const difference = Math.max(0, target - Date.now());
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor(difference / 3600000) % 24,
    minutes: Math.floor(difference / 60000) % 60,
    seconds: Math.floor(difference / 1000) % 60,
  };
};

const pad = (value: number) => String(value).padStart(2, "0");

export default function Countdown() {
  const [time, setTime] = useState<Time>(getTime);
  useEffect(() => {
    const interval = window.setInterval(() => setTime(getTime()), 1000);
    return () => window.clearInterval(interval);
  }, []);
  return (
    <div className="countdown" aria-label="Countdown to March 2027">
      {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
        <div className="countdown-cell" key={unit}>
          <strong>{unit === "days" ? String(time[unit]).padStart(2, "0") : pad(time[unit])}</strong>
          <span>{unit === "minutes" ? "mins" : unit}</span>
        </div>
      ))}
    </div>
  );
}
