"use client";

import { useState } from "react";
import { motivationalPhrases } from "@/src/components/messages/motivational-phrases";
import { supabase } from "@/src/lib/supabaseClient";
import { AnimatedBackground } from "../components/page/animated-background";
import { PageHeader } from "../components/page/page-header";
import { StatsCards } from "../components/page/stats-cards";
import { MagicButtonCard } from "../components/page/magic-button-card";
import { SpinWheelCard } from "../components/page/spin-wheel-card";
import { SoundToggleCard } from "../components/page/sound-toggle-card";
import { Footer } from "../components/page/footer";

export default function Home() {
  const [clickCount, setClickCount] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const [particleId, setParticleId] = useState(0);
  const [motivationalIndex, setMotivationalIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const logEvent = async (eventType: string) => {
    console.log("Logging event:", eventType);

    try {
      const { error } = await supabase
        .from("stupdi-event")
        .insert([{ event_type: eventType }]);
      if (error) console.error("Erro ao salvar o evento inútil:", error);
      console.log("error", error);
    } catch (error) {
      console.error("Um erro inesperado ocorreu:", error);
    }
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

  const handleMagicClick = () => {
    logEvent("magic_click");
    setClickCount((prev) => prev + 1);
    setMotivationalIndex((prev) => (prev + 1) % motivationalPhrases.length);

    const newParticles = Array.from({ length: 5 }).map((_, i) => ({
      id: particleId + i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
    }));
    setParticleId((prev) => prev + 5);
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => setParticles((prev) => prev.slice(5)), 600);

    if (soundEnabled) playSound();
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <PageHeader />
        <StatsCards clickCount={clickCount} />

        <div className="w-full max-w-2xl space-y-8">
          <MagicButtonCard
            onMagicClick={handleMagicClick}
            motivationalPhrase={motivationalPhrases[motivationalIndex]}
            particles={particles}
          />
          <SpinWheelCard isSpinning={isSpinning} onSpin={handleSpinTheWheel} />
          <SoundToggleCard
            soundEnabled={soundEnabled}
            onToggle={handleToggleSound}
          />
        </div>

        <Footer />
      </div>
    </main>
  );
}
