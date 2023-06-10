import { useState } from "react";
import "./index.css";

const CircleMarker = () => {
  const [addedPoints, setAddedPoints] = useState([]);
  const [poppedPoints, setPoppedPoints] = useState([]);

  const onClick = ({ clientX, clientY }) => {
    setAddedPoints((prev) => [...prev, { x: clientX - 20, y: clientY - 60 }]);
  };

  const undo = () => {
    if (!addedPoints.length) return;
    const newPoints = [...addedPoints];
    const point = newPoints.pop();
    setPoppedPoints((prev) => [...prev, point]);
    setAddedPoints(newPoints);
  };

  const redo = () => {
    if (!poppedPoints.length) return;
    const newpoppedPoints = [...poppedPoints];
    const point = newpoppedPoints.pop();
    setAddedPoints((prev) => [...prev, point]);
    setPoppedPoints(newpoppedPoints);
  };

  return (
    <div className="circle-marker">
      <div className="circle-marker__btns">
        <button className="btn" onClick={undo} disabled={!addedPoints.length}>
          undo
        </button>
        <button className="btn" onClick={redo} disabled={!poppedPoints.length}>
          redo
        </button>
      </div>
      <div onClick={onClick} className="circle-marker__circles">
        {addedPoints.map((p, i) => (
          <div
            className="circle-marker__circle"
            style={{ top: p.y, left: p.x }}
            key={p.x + p.y + i}
          />
        ))}
      </div>
    </div>
  );
};

export default CircleMarker;
