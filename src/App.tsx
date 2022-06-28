import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Multiply from './components/Multiply';
import Square from './components/Square';
import Add from './components/Add';
import Subtract from './components/Subtract';
import Reset from './components/Reset';
import styled, { keyframes } from "styled-components";

function App() {
  const [counter, setCounter] = useState(2);
  const [isInteger, setIsInteger] = useState(true);
  const [isEven, setIsEven] = useState<any>(true);
  const [glowColor, setGlowColor] = useState(["#286e0a", "#5fe923"])
  const [items, setItems] = useState<any>([]);
  const [position, setPosition] = useState(0);
  const [isNumber, setIsNumber] = useState(true);
  const [input, setInput] = useState(0);

  var glow = keyframes`
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px ${glowColor[0]}, 0 0 40px #286e0a, 0 0 50px ${glowColor[0]}, 0 0 60px ${glowColor[0]}, 0 0 70px ${glowColor[0]};
  }
  
  to {
    text-shadow: 0 0 20px #fff, 0 0 30px  ${glowColor[1]}, 0 0 40px ${glowColor[1]}, 0 0 50px ${glowColor[1]}, 0 0 60px ${glowColor[1]}, 0 0 70px ${glowColor[1]}, 0 0 80px ${glowColor[1]};
  }
`;
  var glowRainbow = keyframes`
  0% {
    text-shadow: 0 0 10px #FF0000, 0 0 20px #FF7F00, 0 0 30px #FFFF00;
  }
  8% {
    text-shadow: 0 0 10px #FF7F00, 0 0 20px #FFFF00, 0 0 30px #7FFF00;
  }
  16% {
    text-shadow: 0 0 10px #FFFF00, 0 0 20px #7FFF00, 0 0 30px #00FF00;
  }
  25% {
    text-shadow: 0 0 10px #7FFF00, 0 0 20px #00FF00, 0 0 30px #00FF7F;
  }
  33% {
    text-shadow: 0 0 10px #00FF00, 0 0 20px #00FF7F, 0 0 30px #00FFFF;
  }
  41% {
    text-shadow: 0 0 10px #00FF7F, 0 0 20px #00FFFF, 0 0 30px #007FFF;
  }
  50% {
    text-shadow: 0 0 10px #00FFFF, 0 0 20px #007FFF, 0 0 30px #0000FF;
  }
  58% {
    text-shadow: 0 0 10px #007FFF, 0 0 20px #0000FF, 0 0 30px #7F00FF;
  }
  66% {
    text-shadow: 0 0 10px #0000FF, 0 0 20px #7F00FF, 0 0 30px #FF00FF;
  }
  75% {
    text-shadow: 0 0 10px #7F00FF, 0 0 20px #FF00FF, 0 0 30px #FF007F;
  }
  83% {
    text-shadow: 0 0 10px #FF00FF, 0 0 20px #FF007F, 0 0 30px #FF0000;
  }
  91% {
    text-shadow: 0 0 10px #FF007F, 0 0 20px #FF0000, 0 0 30px #FF7F00;
  }
  100% {
    text-shadow: 0 0 10px #FF0000, 0 0 20px #FF7F00, 0 0 30px #FFFF00;
  }
  `;

  var GlowStyle = styled.h2`
    animation: ${glow} 1s ease-in-out infinite alternate
  `;
  var GlowRainbow = styled.div`
  animation: ${glowRainbow} 4s ease-in-out infinite alternate
  `;

  const multiply = () => {
    setCounter((counter) => Math.pow(2, counter));
  }
  const add = () => {
    setCounter((counter: number) => counter + 1);
  }
  const subtract = () => {
    setCounter((counter: number) => counter - 1);
  }
  const squareRoot = () => {
    setCounter((value) => Math.sqrt(value));
  }
  const reset = () => {
    setCounter(2);
  }
  const decreasePosition = () => {
    if (position > 0) {
      setPosition((position) => position - 1)
    }
  }
  const setInputFunc = () => {
    setCounter(input);
    setIsNumber(true);
  }
  const increasePosition = () => {
    console.log(position, items)
    setPosition((position) => {
      if (position < items.length - 1) return position + 1;
      else return position;
    })
  }
  const isIntegerFunc = (value: any) => {
    if (Number.isInteger(value)) {
      setGlowColor(["#286e0a", "#5fe923"])
    }
    else {
      setGlowColor(["#3c1361", "#7c5295"])
    }
    if (isNaN(counter) || counter.toString() === "Infinity") {
      setGlowColor(["#c30010", "#ee6b6e"])
      setIsNumber(false);
    }
  }
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      setInputFunc();
    }
  }
  useEffect(() => {
    isIntegerFunc(counter);
    if (counter.toString() !== "Infinity") {
      setItems((items: any) => {
        localStorage.setItem('items', JSON.stringify([...items, counter]));
        return [...items, counter]
      });
    }
    axios.get(`https://api.isevenapi.xyz/api/iseven/${counter}/`).then((response: any) => {
      setIsEven(response.data.iseven)
    })
      .catch(() => {
        setIsEven("No Response");
      })
  }, [counter])
  const getRandomData = () => {

    axios.get("https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/OpenDataScooterTrips_Jul2019/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json").then((response) => {

      let randomData = Math.floor((Math.random() * response?.data?.features?.length) + 1);
      setCounter(response.data.features[randomData]?.attributes.TripDuration);

    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <GlowStyle className={`counter-text`}>{counter}</GlowStyle>
        <GlowRainbow>{typeof isEven === "boolean" ? <h4>Is even? {isEven ? "true" : "false"}</h4> : <></>}</GlowRainbow>

        {isNumber ? <div>
          <Subtract subtract={subtract} />
          <Multiply multiply={multiply} />
          <Square squareRoot={squareRoot} />
          <Add add={add} />
          <Reset reset={reset} />
          <button onClick={getRandomData} className="btn btn-random">Random</button>
        </div> :
          <div>
            <input placeholder='Input Number' type={"number"} className="input-custom" onChange={(e: any) => setInput(e.target.value)} onKeyDown={handleKeyDown} />
            <button className='btn btn-arithmetic' onClick={setInputFunc}>Confirm</button>
          </div>}
        <p>Values stored from counter:</p>
        <div><button className='btn btn-arithmetic' onClick={decreasePosition} disabled={position == 0}>«</button><span>{items[position]}</span><button className='btn btn-arithmetic' onClick={increasePosition} disabled={position == items.length - 1}>»</button></div>
      </header>
    </div>
  );
}

export default App;
