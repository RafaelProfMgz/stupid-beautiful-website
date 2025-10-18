"use client";

import { useState } from "react";

const uselessTasks = [
  "Concluir a única tarefa",
  "Arquivar o vazio",
  "Desfragmentar a procrastinação",
  "Compilar o silêncio",
  "Debugar a existência",
  "Sincronizar o caos",
  "Calibrar a inutilidade",
];

export const InfiniteTaskCheckbox = () => {
  const [taskIndex, setTaskIndex] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCheck = () => {
    setIsChecked(true);
    setShowConfetti(true);

    // Depois de um tempo, mude a tarefa e resete o estado
    setTimeout(() => {
      const nextIndex = (taskIndex + 1) % uselessTasks.length;
      setTaskIndex(nextIndex);
      setIsChecked(false);
    }, 800);

    // Esconde o confete após a animação
    setTimeout(() => {
      setShowConfetti(false);
    }, 1200);
  };

  return (
    <div className="bg-card p-6 rounded-lg border border-border relative overflow-hidden">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheck}
          className="w-6 h-6 text-primary bg-input border-border rounded focus:ring-primary accent-primary"
        />
        <label
          className={`ml-4 text-lg transition-all ${
            isChecked ? "line-through text-muted-foreground" : "text-foreground"
          }`}
        >
          {uselessTasks[taskIndex]}
        </label>
      </div>

      {/* Efeito de Confete com CSS puro */}
      {showConfetti &&
        Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-bounce-in"
            style={{
              background: `hsl(${Math.random() * 360}, 70%, 50%)`,
              top: "50%",
              left: "10%",
              animation: `confetti-fall ${
                1 + Math.random()
              }s ease-out forwards`,
            }}
          />
        ))}
      {/* Adicione este CSS no seu arquivo global de CSS */}
      <style jsx global>{`
        @keyframes confetti-fall {
          0% {
            transform: translate(0, 0) rotateZ(0);
            opacity: 1;
          }
          100% {
            transform: translate(
                ${Math.random() * 400 - 100}px,
                ${Math.random() * 200 - 100}px
              )
              rotateZ(${Math.random() * 360}deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
