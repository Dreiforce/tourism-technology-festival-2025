import {Asset} from './Asset.tsx'
import './App.css'
import Autumn from './assets/laub_anim/Autumn.png'
import Spring from './assets/laub_anim/Spring.png'
import Winter from './assets/laub_anim/Winter.png'
import Summer from './assets/laub_anim/Summer.png'
import { useEffect, useState } from 'react'
import { Background } from './Background.tsx'

function App() {
  const initialTime = 0;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 2000) {
          clearInterval(timerInterval);
          // Perform actions when the timer reaches zero
          console.log('Countdown complete!');
          return 0;
        } else {
          return prevTime + 1;
        }
      });
    }, 500);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []); // The empty dependency array ensures the effect runs only once on mount

  // Convert seconds to hours, minutes, and seconds
  const seconds = timeRemaining % 60;

  return (
    <div>
      <p>Frame:</p>
      <p>{`${timeRemaining}`}</p>
      <Background column={timeRemaining}/>
    <Asset asset={Autumn} column={seconds % 22} row={0} heigth={64} width={64} />
    <Asset asset={Spring} column={seconds % 22} row={0} heigth={64} width={64} />
    <Asset asset={Winter} column={seconds % 22} row={0} heigth={64} width={64} />
    <Asset asset={Summer} column={seconds % 22} row={0} heigth={64} width={64} />
    </div>
  );
};

export default App
