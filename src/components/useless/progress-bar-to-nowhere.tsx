"use client";

import { useState, useEffect } from "react";

export const ProgressBarToNowhere = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0; // Reinicia ao chegar a 100
        }
        return prev + 1;
      });
    }, 80); // Velocidade do carregamento

    return () => clearInterval(timer); // Limpa o intervalo
  }, []);

  return (
    <div className="bg-card p-6 rounded-lg border border-border text-center">
      <p className="text-muted-foreground mb-4">Carregando serenidade...</p>
      <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
        <div
          className="bg-primary h-4 rounded-full transition-all duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
