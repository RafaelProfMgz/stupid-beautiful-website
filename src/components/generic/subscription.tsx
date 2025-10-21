// /components/UselessProSubscription.tsx
"use client";

import { useState, useEffect } from "react";

// O ícone agora usa a cor de 'accent'
const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-accent"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export const Subscription = () => {
  const [step, setStep] = useState("selection");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [processingMessage, setProcessingMessage] = useState(
    "Iniciando transação com o vazio..."
  );

  const messages = [
    "Alinhando os raios cósmicos...",
    "Consultando o oráculo financeiro...",
    "Reticulando splines...",
    "Enviando seus dados para uma dimensão onde dinheiro não existe...",
    "Quase lá. Ou não.",
  ];

  useEffect(() => {
    if (step === "processing") {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i >= messages.length) {
          clearInterval(interval);
          setStep("confirmation");
        } else {
          setProcessingMessage(messages[i]);
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    setStep("payment");
  };

  const renderSelection = () => (
    <div className="text-center animate-bounce-in">
      <h2 className="text-3xl font-serif mb-2">
        Escolha sua Vocação de Inutilidade
      </h2>
      <p className="text-muted-foreground mb-8">
        Cada plano oferece exatamente o mesmo nível de nada, mas com preços
        diferentes para você se sentir especial.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Card 1: The Void */}
        <div className="border border-border bg-card rounded-lg p-6 flex flex-col transition-transform hover:-translate-y-2">
          <h3 className="text-2xl font-semibold">O Vazio</h3>
          <p className="text-5xl font-bold my-4">
            $0
            <span className="text-lg font-normal text-muted-foreground">
              /mês
            </span>
          </p>
          <p className="text-muted-foreground mb-6">
            A experiência fundamental. Grátis, porque o nada não tem preço.
          </p>
          <ul className="space-y-2 text-left mb-8 text-card-foreground">
            <li className="flex items-center">
              <CheckIcon />
              <span className="ml-2">Acesso a botões inúteis</span>
            </li>
            <li className="flex items-center">
              <CheckIcon />
              <span className="ml-2">Interações sem consequência</span>
            </li>
          </ul>
          <button
            onClick={() => handleSelectPlan("O Vazio")}
            className="mt-auto w-full bg-secondary hover:opacity-90 text-secondary-foreground font-bold py-2 px-4 rounded-md transition-opacity"
          >
            Comece não fazendo nada
          </button>
        </div>

        {/* Card 2: The Abyss (Most Popular) */}
        <div className="border border-primary bg-card rounded-lg p-6 flex flex-col relative animate-pulse-glow">
          <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase">
            Mais Popular
          </div>
          <h3 className="text-2xl font-semibold text-primary">O Abismo</h3>
          <p className="text-5xl font-bold my-4">
            $9.99
            <span className="text-lg font-normal text-muted-foreground">
              /mês
            </span>
          </p>
          <p className="text-muted-foreground mb-6">
            Igual ao Vazio, mas você paga por isso. É a inutilidade premium.
          </p>
          <ul className="space-y-2 text-left mb-8 text-card-foreground">
            <li className="flex items-center">
              <CheckIcon />
              <span className="ml-2">Tudo do plano O Vazio</span>
            </li>
            <li className="flex items-center">
              <CheckIcon />
              <span className="ml-2">Direito de se gabar</span>
            </li>
            <li className="flex items-center">
              <CheckIcon />
              <span className="ml-2">Cursor com brilho sutil (invisível)</span>
            </li>
          </ul>
          <button
            onClick={() => handleSelectPlan("O Abismo")}
            className="mt-auto w-full bg-primary hover:opacity-90 text-primary-foreground font-bold py-2 px-4 rounded-md transition-opacity"
          >
            Mergulhe no Abismo
          </button>
        </div>

        {/* Card 3: The Singularity */}
        <div className="border border-border bg-card rounded-lg p-6 flex flex-col transition-transform hover:-translate-y-2">
          <h3 className="text-2xl font-semibold">A Singularidade</h3>
          <p className="text-5xl font-bold my-4">
            $99
            <span className="text-lg font-normal text-muted-foreground">
              /mês
            </span>
          </p>
          <p className="text-muted-foreground mb-6">
            Para o verdadeiro connoisseur da futilidade. Ninguém sabe o que faz.
          </p>
          <ul className="space-y-2 text-left mb-8 text-card-foreground">
            <li className="flex items-center">
              <CheckIcon />
              <span className="ml-2">Tudo do plano O Abismo</span>
            </li>
            <li className="flex items-center">
              <CheckIcon />
              <span className="ml-2">Incoerência Quântica</span>
            </li>
          </ul>
          <button
            onClick={() => handleSelectPlan("A Singularidade")}
            className="mt-auto w-full bg-secondary hover:opacity-90 text-secondary-foreground font-bold py-2 px-4 rounded-md transition-opacity"
          >
            Torne-se o Nada
          </button>
        </div>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="max-w-md mx-auto animate-bounce-in">
      <h2 className="text-3xl font-serif mb-2 text-center">
        Finalize sua Inscrição
      </h2>
      <p className="text-muted-foreground mb-8 text-center">
        Você escolheu sabiamente:{" "}
        <span className="font-bold text-primary">{selectedPlan}</span>. Agora,
        por favor, insira detalhes que não iremos a lugar nenhum.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-muted-foreground mb-1">
            Nome no Cartão
          </label>
          <input
            type="text"
            placeholder="O nome que sua ambição esqueceu"
            className="w-full bg-input border border-border rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring"
          />
        </div>
        {/* ... (rest of the inputs follow the same pattern) */}
        <button
          onClick={() => setStep("processing")}
          className="w-full bg-accent hover:opacity-90 text-accent-foreground font-bold py-3 px-4 rounded-md transition-opacity text-lg"
        >
          Pagar e Abraçar o Vazio
        </button>
      </div>
    </div>
  );

  const renderProcessing = () => (
    <div className="text-center animate-bounce-in">
      <div className="w-16 h-16 border-4 border-dashed border-primary rounded-full animate-spin-slow mx-auto mb-6"></div>
      <h2 className="text-3xl font-serif mb-2">Processando...</h2>
      <p className="text-muted-foreground">{processingMessage}</p>
    </div>
  );

  const renderConfirmation = () => (
    <div className="text-center max-w-lg mx-auto animate-bounce-in">
      <h2 className="text-3xl font-serif text-destructive mb-2">
        Falha Gloriosa!
      </h2>
      <p className="text-xl text-foreground mb-4">
        Parabéns! Seu pagamento foi majestosamente rejeitado.
      </p>
      <p className="text-muted-foreground mb-8">
        Nosso sistema foi meticulosamente projetado para falhar. Ao tentar
        pagar, você abraçou a futilidade e alcançou o sucesso verdadeiro. Você
        não foi cobrado. Você não ganhou nada. Perfeito.
      </p>
      <button
        onClick={() => setStep("selection")}
        className="bg-secondary hover:opacity-90 text-secondary-foreground font-bold py-2 px-4 rounded-md transition-opacity"
      >
        Tentar Falhar Novamente
      </button>
    </div>
  );

  return (
    <div className="bg-background text-foreground p-8 rounded-lg w-full max-w-5xl mx-auto">
      {step === "selection" && renderSelection()}
      {step === "payment" && renderPayment()}
      {step === "processing" && renderProcessing()}
      {step === "confirmation" && renderConfirmation()}
    </div>
  );
};
