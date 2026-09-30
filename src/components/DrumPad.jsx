import { useRef, useState, useEffect } from "react";

function DrumPad({
sound,
volume,
power,
onPlay,
trigger,
}) {
const audioRef = useRef(null);
const [active, setActive] = useState(false);

const playSound = () => {
if (!power) return;

const audio = audioRef.current;

if (!audio) return;

audio.currentTime = 0;
audio.volume = volume / 100;

audio.play();

setActive(true);

setTimeout(() => {
    setActive(false);
}, 150);

onPlay(sound.name);
};

// Trigger this pad from keyboard
useEffect(() => {
if (trigger > 0) {
    playSound();
}
}, [trigger]);

return (
<button
    className={`drum-pad ${active ? "active" : ""}`}
    onClick={playSound}
>
    <span className="pad-key">
    {sound.key}
    </span>

    <span className="pad-name">
    {sound.name}
    </span>

    <audio
    ref={audioRef}
    src={sound.sound}
    />
</button>
);
}

export default DrumPad;