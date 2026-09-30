import { useEffect, useState } from "react";
import Display from "./components/Display";
import DrumPad from "./components/DrumPad";
import soundBank from "./data/soundBank";
import "./App.css";

function App() {
  const [volume, setVolume] = useState(70);
  const [power, setPower] = useState(true);
  const [message, setMessage] = useState("READY");

  const [triggers, setTriggers] = useState({});

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();

      if (!power) return;

      const sound = soundBank.find(
        (item) => item.key === key
      );

      if (!sound) return;

      setTriggers((previous) => ({
        ...previous,
        [key]: (previous[key] || 0) + 1,
      }));
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [power]);

  const handlePlay = (name) => {
    setMessage(name);
  };

  return (
    <div className="app">

      <h1>🥁 DRUM MACHINE</h1>

      <Display
        message={message}
        volume={volume}
        power={power}
      />

      <div className="pads">
        {soundBank.map((sound) => (
          <DrumPad
            key={sound.key}
            sound={sound}
            volume={volume}
            power={power}
            onPlay={handlePlay}
            trigger={triggers[sound.key] || 0}
          />
        ))}
      </div>

      <div className="controls">

        <div className="volume-control">

          <label>
            MASTER VOLUME: {volume}%
          </label>

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(event) =>
              setVolume(
                Number(event.target.value)
              )
            }
          />

        </div>

        <button
          className="power-button"
          onClick={() => {
            setPower(!power);
            setMessage(
              !power ? "READY" : "SYSTEM OFF"
            );
          }}
        >
          {power ? "POWER ON" : "POWER OFF"}
        </button>

      </div>

    </div>
  );
}

export default App;