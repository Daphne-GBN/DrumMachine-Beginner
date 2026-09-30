function Display({ message, volume, power }) {
return (
<div className="display">
    <div className="display-message">
    {power ? message : "SYSTEM OFF"}
    </div>

    <div className="display-info">
    <span>VOLUME: {volume}%</span>

    <span>
        {power ? "READY" : "OFF"}
    </span>
    </div>
</div>
);
}

export default Display;