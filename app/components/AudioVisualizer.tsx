/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";

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

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const ctx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const src = ctx.createMediaElementSource(audioRef.current);
    const analyserNode = ctx.createAnalyser();
    src.connect(analyserNode);
    analyserNode.connect(ctx.destination);
    analyserNode.fftSize = 64;

    const bufferLength = analyserNode.frequencyBinCount;

    // Fix за TypeScript
    const dataArr = new Uint8Array(bufferLength) as unknown as Uint8Array;
    dataArrayRef.current = dataArr;

    audioCtxRef.current = ctx;
    analyserRef.current = analyserNode;

    // Synchronous cleanup
    return () => {
      void ctx.close();
    };
  }, [audioRef]);

  useEffect(() => {
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    const canvas = canvasRef.current;
    if (!analyser || !dataArray || !canvas) return;

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
        ctx.fillStyle = "#0ff";
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

    if (playing) render();

    return () => cancelAnimationFrame(raf);
  }, [playing]);

  return (
    <canvas
      ref={canvasRef}
      width={120}
      height={50}
      className="absolute top-4 right-4 cursor-pointer"
      onClick={() => onPlayToggle()}
    />
  );
}
