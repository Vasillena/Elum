export default function useIsTouchDevice() {
  if (typeof window === "undefined") return false;

  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const hasOrientation = typeof DeviceOrientationEvent !== "undefined";

  return hasTouch && hasOrientation;
}
