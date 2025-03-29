import { useState } from "react";
import './style.css';
import Grid from './components/Grid';
import dataList from './data.json';

function control(today: Date, limit: number): number {
  let count = 0;
  const rows = document.querySelectorAll("table tbody tr");

  rows.forEach((row) => {
    
    const htmlRow = row as HTMLElement;
    const cells = htmlRow.querySelectorAll("td");

    if (cells.length < 2){
      return;
    }

    const receivedDate = new Date(cells[1].textContent ?? '');
    const sentDate = cells[2].textContent ? new Date(cells[2].textContent) : today;

    const daysDiff = ( 
      new Date(sentDate).setHours(0, 0, 0, 0) - 
      new Date(receivedDate).setHours(0, 0, 0, 0) 
    ) / (1000 * 3600 * 24);

    const bgColor = htmlRow.style.backgroundColor;

    if ((daysDiff > limit && bgColor !== "red") || (daysDiff <= limit && bgColor === "red")) 
    {
      count++;
    }
  });
  return count;
}

export default function App() {

  let sourceProp = dataList;

  const [incorrectCount, setIncorrectCount] = useState<number>(0);
  const [today, setToday] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [limit, setLimit] = useState<number>(7);

  const handleTestButtonClick = () => {
    const todayDate = new Date(today);
    const count = control(todayDate, limit);
    setIncorrectCount(count);
  };

  return (
    <div>
      <h1>Dgpays Case Study</h1>
      <div>
        <label>
          Today:
          <input
            type="date"
            value={today}
            onChange={(e) => setToday(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Limit (days):
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          />
        </label>
      </div>
      <button onClick={handleTestButtonClick}>Test Control</button>
      <div>
        <p>Hatalı satır sayısı: {incorrectCount}</p>
      </div>

      <Grid source={sourceProp} />
      
    </div>
  );
}
