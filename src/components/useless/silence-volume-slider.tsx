"use client";

import { useState } from "react";

export const SilenceVolumeSlider = () => {
  const [volume, setVolume] = useState(50);

  return (
    <div className="bg-card p-6 rounded-lg border border-border text-center">
      <label
        htmlFor="silence-slider"
        className="block text-muted-foreground mb-4"
      >
        Ajuste o volume do silêncio
      </label>
      <div className="flex items-center gap-4">
        <span className="text-sm font-mono text-foreground">0</span>
        <input
          id="silence-slider"
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-secondary"
        />
        <span className="text-sm font-mono text-foreground">100</span>
      </div>
      <p className="mt-4 font-bold text-lg text-secondary">{volume}</p>
    </div>
  );
};
