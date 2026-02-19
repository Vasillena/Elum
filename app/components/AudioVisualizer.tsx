/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";

type Props = {
  audioRef: React.RefObject<HTMLAudioElement>;
  playing: boolean;
  onPlayToggle: () => void;
};

export default function AudioVisualizer({
  audioRef,
  playing,
  onPlayToggle,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;

    const ctx = new AudioCtx();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;

    const source = ctx.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(ctx.destination);

    const buffer = new Uint8Array(analyser.fftSize);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const c = canvas.getContext("2d");
    if (!c) return;

    const render = () => {
      analyser.getByteTimeDomainData(buffer);

      let sum = 0;
      for (let i = 0; i < buffer.length; i++) {
        const v = (buffer[i] - 128) / 128;
        sum += v * v;
      }

      const volume = Math.sqrt(sum / buffer.length);

      c.clearRect(0, 0, canvas.width, canvas.height);

      const radius = 10 + volume * 40;

      c.beginPath();
      c.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
      c.fillStyle = "#0ff";
      c.shadowBlur = 20;
      c.shadowColor = "#0ff";
      c.fill();

      rafRef.current = requestAnimationFrame(render);
    };

    if (playing) {
      ctx.resume();
      render();
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ctx.close();
    };
  }, [playing, audioRef]);

  return (
    <canvas
      ref={canvasRef}
      width={120}
      height={120}
      className="absolute top-4 right-4 cursor-pointer"
      onClick={onPlayToggle}
    />
  );
}
