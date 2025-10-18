"use client";

import React from "react";
import { Button } from "./button";

type Props = {
  title?: string;
  description?: string;
  onClose?: () => void;
};

export default function ExitIntentPopup({
  title = "Espere! Antes de voltar a ser produtivo...",
  description = "Aproveite mais o nosso conteúdo improdutivo, se inscreva na nossa newsletter e receba novidades.",
  onClose,
}: Props) {
  const [visible, setVisible] = React.useState(false);
  const [seen, setSeen] = React.useState(false);

  React.useEffect(() => {
    function handleMouseOut(e: MouseEvent) {
      // Se já mostramos, não mostrar de novo
      if (seen) return;

      // Se o ponteiro estiver saindo do viewport em direção ao topo
      if ((e as MouseEvent).clientY <= 10) {
        setVisible(true);
        setSeen(true);
      }
    }

    // Em mobile não queremos a lógica de mouse
    if (typeof window !== "undefined") {
      window.addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mouseout", handleMouseOut);
      }
    };
  }, [seen]);

  function close() {
    setVisible(false);
    onClose?.();
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative z-10 w-[min(90%,520px)] rounded-xl bg-card p-6 shadow-xl animate-bounce-in">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>

        <div className="mt-4 flex gap-2 justify-end">
          <Button variant="ghost" onClick={close}>
            Fechar
          </Button>
          <Button
            onClick={() => {
              /* ex: ação de conversão */ close();
            }}
          >
            Quero receber
          </Button>
        </div>
      </div>
    </div>
  );
}
