"use client";

import { useState } from "react";

const grayNames = [
  "Névoa de Inverno",
  "Concreto Melancólico",
  "Aço Polido",
  "Sombra do Esquecimento",
  "Silêncio de TV",
  "Poeira Cósmica",
  "Pedra de Rio Seco",
  "Asfalto ao Luar",
];

const shuffleArray = (array: string[]) =>
  [...array].sort(() => Math.random() - 0.5);

export const IdenticalPaletteGenerator = () => {
  const [palette, setPalette] = useState({
    color: "#cccccc",
    names: shuffleArray(grayNames).slice(0, 5),
  });

  const generateNewPalette = () => {
    // Gera um tom de cinza aleatório
    const randomShade = Math.floor(Math.random() * 150 + 50); // de 50 a 200
    const grayColor = `rgb(${randomShade}, ${randomShade}, ${randomShade})`;

    setPalette({
      color: grayColor,
      names: shuffleArray(grayNames).slice(0, 5),
    });
  };

  return (
    <div className="bg-card p-6 rounded-lg border border-border text-center">
      <div className="flex justify-center gap-2 mb-4">
        {palette.names.map((name) => (
          <div key={name} className="flex-1">
            <div
              className="h-24 w-full rounded-md"
              style={{ backgroundColor: palette.color }}
            ></div>
            <p className="text-xs mt-2 text-muted-foreground">{name}</p>
          </div>
        ))}
      </div>
      <button
        onClick={generateNewPalette}
        className="bg-secondary text-secondary-foreground font-semibold px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
      >
        Gerar Nova Paleta
      </button>
    </div>
  );
};
