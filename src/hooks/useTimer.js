import { useState, useRef, useEffect } from "react";

const useTimer = (startTime, shouldUpdate = true) => {
  const durationIntervalId = useRef();
  const [duration, setDuration] = useState(
    Math.abs(Math.floor(parseInt(startTime, 10) / 1000))
  );

  useEffect(() => {
    if (shouldUpdate)
      durationIntervalId.current = setInterval(() => {
        setDuration((prevCount) => prevCount + 1);
      }, 1000);
    return () => {
      if (durationIntervalId.current != null) {
        clearInterval(durationIntervalId.current);
        durationIntervalId.current = null;
      }
    };
  }, []);

  return duration;
};

export default useTimer;
