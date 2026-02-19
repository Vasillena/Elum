"use client";

import { useEffect, useRef, useState } from "react";

export default function AudioVisualizer({
  audioRef,
  playing,
  onPlayToggle,
}: {
  audioRef: React.RefObject<HTMLAudioElement>;
  playing: boolean;
  onPlayToggle: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [dataArray, setDataArray] = useState<Uint8Array | null>(null);

  // Създаваме AudioContext само при click
  useEffect(() => {
    if (!audioRef.current) return;

    const ctx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const src = ctx.createMediaElementSource(audioRef.current);
    const analyserNode = ctx.createAnalyser();
    src.connect(analyserNode);
    analyserNode.connect(ctx.destination);
    analyserNode.fftSize = 64; // повече барчета
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArr = new Uint8Array(bufferLength);

    setAudioContext(ctx);
    setAnalyser(analyserNode);
    setDataArray(dataArr);

    return () => ctx.close();
  }, [audioRef]);

  useEffect(() => {
    if (!analyser || !dataArray || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;

    const render = () => {
      raf = requestAnimationFrame(render);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / dataArray.length;
      dataArray.forEach((value, i) => {
        const barHeight = value / 2;
        ctx.fillStyle = "#0ff"; // неоново синьо
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#0ff";
        ctx.fillRect(
          i * barWidth,
          canvas.height - barHeight,
          barWidth - 2,
          barHeight
        );
      });
    };

    if (playing) render(); // пуска анимацията само когато playing=true

    return () => cancelAnimationFrame(raf);
  }, [analyser, dataArray, playing]);

  return (
    <canvas
      ref={canvasRef}
      width={120}
      height={50}
      className="absolute top-4 right-4 cursor-pointer"
      onClick={() => {
        if (!audioRef.current) return;
        onPlayToggle();
      }}
    />
  );
}
