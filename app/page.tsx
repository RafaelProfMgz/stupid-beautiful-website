"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Zap, RotateCw, Volume2, Eye, Heart } from "lucide-react";
import { motivationalPhrases } from "@/components/messages/motivational-phrases";
import { colors } from "@/components/messages/colors";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [clickCount, setClickCount] = useState(0);
  const [randomColor, setRandomColor] = useState("bg-primary");
  const [isSpinning, setIsSpinning] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const [particleId, setParticleId] = useState(0);
  const [motivationalIndex, setMotivationalIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const logEvent = async (eventType: string) => {
    try {
      const { error } = await supabase
        .from("events")
        .insert([{ event_type: eventType }]);

      if (error) {
        console.error("Erro ao salvar o evento inútil:", error);
      }
    } catch (error) {
      console.error("Um erro inesperado ocorreu:", error);
    }
  };

  const handleMagicClick = () => {
    logEvent("magic_click");
    setClickCount((prev) => prev + 1);
    setRandomColor(colors[Math.floor(Math.random() * colors.length)]);
    setMotivationalIndex((prev) => (prev + 1) % motivationalPhrases.length);

    // Create particles
    const newParticles = Array.from({ length: 5 }).map((_, i) => ({
      id: particleId + i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
    }));
    setParticleId((prev) => prev + 5);
    setParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles((prev) => prev.slice(5));
    }, 600);

    if (soundEnabled) {
      playSound();
    }
  };

  const handleSpinTheWheel = () => {
    logEvent("spin_the_wheel");
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 2000);
  };

  const handleToggleSound = () => {
    const newSoundState = !soundEnabled;
    setSoundEnabled(newSoundState);
    logEvent(newSoundState ? "sound_on" : "sound_off");
  };

  const playSound = () => {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 400 + Math.random() * 200;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-bounce-in">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
            Produtividade Falsa™
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light">
            O único site que faz você se sentir produtivo sem fazer
            absolutamente nada
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl">
          <Card className="p-6 backdrop-blur-sm bg-card/50 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-2">
                  Cliques Inúteis
                </p>
                <p className="text-4xl font-bold text-primary">{clickCount}</p>
              </div>
              <Zap className="w-12 h-12 text-primary/50" />
            </div>
          </Card>

          <Card className="p-6 backdrop-blur-sm bg-card/50 border-accent/20 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-2">
                  Produtividade
                </p>
                <p className="text-4xl font-bold text-accent">0%</p>
              </div>
              <Eye className="w-12 h-12 text-accent/50" />
            </div>
          </Card>

          <Card className="p-6 backdrop-blur-sm bg-card/50 border-secondary/20 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-2">Diversão</p>
                <p className="text-4xl font-bold text-secondary">∞</p>
              </div>
              <Heart className="w-12 h-12 text-secondary/50" />
            </div>
          </Card>
        </div>

        {/* Main Interactive Section */}
        <div className="w-full max-w-2xl space-y-8">
          {/* Magic Button */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <Card className="relative p-12 backdrop-blur-sm bg-card/80 border-primary/30 hover:border-primary/60 transition-all duration-300">
              <div className="text-center space-y-6">
                <Sparkles className="w-16 h-16 mx-auto text-primary animate-pulse-glow" />
                <h2 className="text-3xl font-bold text-foreground">
                  Botão Mágico
                </h2>
                <p className="text-muted-foreground">
                  Clique para se sentir produtivo instantaneamente
                </p>

                <div className="relative h-20 flex items-center justify-center">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-bounce">
                    {motivationalPhrases[motivationalIndex]}
                  </div>
                </div>

                <Button
                  onClick={handleMagicClick}
                  className="w-full h-16 text-lg font-bold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 active:scale-95"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Clique Aqui (Não Faz Nada)
                </Button>

                {/* Particle effects */}
                <div className="relative h-20">
                  {particles.map((particle) => (
                    <div
                      key={particle.id}
                      className="absolute w-3 h-3 bg-primary rounded-full animate-bounce-in"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `translate(calc(-50% + ${particle.x}px), calc(-50% + ${particle.y}px))`,
                        opacity: 0,
                      }}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Spin The Wheel */}
          <Card className="p-8 backdrop-blur-sm bg-card/80 border-accent/30 hover:border-accent/60 transition-all duration-300">
            <div className="text-center space-y-6">
              <div
                className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-accent via-secondary to-primary flex items-center justify-center ${
                  isSpinning ? "animate-spin-slow" : ""
                } transition-transform`}
              >
                <div className="w-28 h-28 bg-card rounded-full flex items-center justify-center">
                  <RotateCw className="w-12 h-12 text-accent" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Roda da Sorte
              </h2>
              <p className="text-muted-foreground">
                Gire a roda para descobrir... absolutamente nada!
              </p>
              <Button
                onClick={handleSpinTheWheel}
                disabled={isSpinning}
                className="w-full bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 active:scale-95"
              >
                {isSpinning ? "Girando..." : "Girar Roda"}
              </Button>
            </div>
          </Card>

          {/* Sound Toggle */}
          <Card className="p-6 backdrop-blur-sm bg-card/80 border-secondary/30 hover:border-secondary/60 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-6 h-6 text-secondary" />
                <div>
                  <p className="font-semibold text-foreground">Sons Inúteis</p>
                  <p className="text-sm text-muted-foreground">
                    Adicione efeitos sonoros ao seu nada
                  </p>
                </div>
              </div>
              <Button
                onClick={handleToggleSound}
                className={`rounded-full px-6 transition-all duration-300 ${
                  soundEnabled
                    ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {soundEnabled ? "Ativado" : "Desativado"}
              </Button>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-muted-foreground text-sm">
          <p>Desenvolvido com ❤️ e zero produtividade</p>
          <p className="mt-2">
            © 2025 Produtividade Falsa™ - Todos os direitos de não fazer nada
            reservados
          </p>
        </div>
      </div>
    </main>
  );
}
