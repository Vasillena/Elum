/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";

export function useDeviceOrientation() {
  const orientation = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  const requestPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      const permission = await (
        DeviceOrientationEvent as any
      ).requestPermission();
      if (permission === "granted") {
        setEnabled(true);
      }
    } else {
      setEnabled(true); // Android няма нужда
    }
  };

  useEffect(() => {
    if (!enabled) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const gamma = event.gamma ?? 0;
      const beta = event.beta ?? 0;

      orientation.current.x = gamma / 45;
      orientation.current.y = beta / 45;
    };

    window.addEventListener("deviceorientation", handleOrientation, true);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [enabled]);

  return { orientation, requestPermission, enabled };
}
