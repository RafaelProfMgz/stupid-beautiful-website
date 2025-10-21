"use client";

import { useState } from "react";

interface AlmostDarknessSwitchProps {
  onToggle: (isActive: boolean) => void;
}

export const AlmostDarknessSwitch = ({
  onToggle,
}: AlmostDarknessSwitchProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    onToggle(newState);
  };

  return (
    <div className="bg-card p-6 rounded-lg border border-border text-center">
      <div className="flex justify-center items-center mb-4">
        <label
          htmlFor="darkness-switch"
          className="flex items-center cursor-pointer"
        >
          {/* O interruptor em si */}
          <div className="relative">
            <input
              id="darkness-switch"
              type="checkbox"
              className="sr-only"
              checked={isActive}
              onChange={handleToggle}
            />
            {/* O trilho do interruptor */}
            <div
              className={`block w-14 h-8 rounded-full transition-colors ${
                isActive ? "bg-primary" : "bg-muted"
              }`}
            ></div>
            {/* A alavanca */}
            <div
              className={`dot absolute left-1 top-1 bg-card w-6 h-6 rounded-full transition-transform ${
                isActive ? "transform translate-x-6" : ""
              }`}
            ></div>
          </div>
        </label>
      </div>
      <p className="text-muted-foreground text-sm">
        Sinta a mudança sutil no ambiente.
      </p>
    </div>
  );
};
