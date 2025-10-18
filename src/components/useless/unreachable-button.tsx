"use client";

import { useState } from "react";

export const UnreachableButton = () => {
  const [position, setPosition] = useState({ top: "40%", left: "40%" });

  const handleMouseEnter = () => {
    // Gera uma nova posição aleatória dentro do contêiner (deixa uma margem de 10%)
    const newTop = `${Math.random() * 80 + 10}%`;
    const newLeft = `${Math.random() * 80 + 10}%`;
    setPosition({ top: newTop, left: newLeft });
  };

  return (
    <div className="bg-card p-6 rounded-lg border border-border h-48 relative overflow-hidden">
      <p className="text-muted-foreground text-center text-sm absolute top-4 left-1/2 -translate-x-1/2">
        Um exercício de futilidade zen.
      </p>
      <button
        onMouseEnter={handleMouseEnter}
        style={{ top: position.top, left: position.left }}
        className="absolute bg-accent text-accent-foreground font-semibold px-6 py-2 rounded-md transition-all duration-300 ease-in-out transform -translate-x-1/2 -translate-y-1/2"
      >
        Tente Me Clicar
      </button>
    </div>
  );
};
