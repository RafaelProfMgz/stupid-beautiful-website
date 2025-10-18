"use client";

import { useState } from "react";
import { motivationalPhrases } from "@/src/components/messages/motivational-phrases";
import { supabase } from "@/src/lib/supabaseClient";
import { AnimatedBackground } from "../components/generic/animated-background";
import { Header } from "../components/layout/header";
import { StatsCards } from "../components/generic/stats-cards";
import { MagicButtonCard } from "../components/generic/magic-button-card";
import { SpinWheelCard } from "../components/generic/spin-wheel-card";
import { SoundToggleCard } from "../components/generic/sound-toggle-card";
import { Footer } from "../components/layout/footer";
import { Subscription } from "../components/generic/subscription";
import ButtonSubscription from "../components/generic/button-subscription";
import { Modal } from "../components/generic/modal";

export default function Home() {
  const [clickCount, setClickCount] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const [particleId, setParticleId] = useState(0);
  const [motivationalIndex, setMotivationalIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

  const logEvent = async (eventType: string) => {
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
        <Header />
        <StatsCards clickCount={clickCount} />

        <div className="w-full max-w-3xl space-y-8">
          <MagicButtonCard
            onMagicClick={handleMagicClick}
            motivationalPhrase={motivationalPhrases[motivationalIndex]}
            particles={particles}
          />
          <ButtonSubscription onClick={() => setSubscriptionModalOpen(true)} />

          <SpinWheelCard isSpinning={isSpinning} onSpin={handleSpinTheWheel} />
          <SoundToggleCard
            soundEnabled={soundEnabled}
            onToggle={handleToggleSound}
          />

          <Modal
            isOpen={isSubscriptionModalOpen}
            onClose={() => setSubscriptionModalOpen(false)}
          >
            <Subscription />
          </Modal>
        </div>

        <Footer />
      </div>
    </main>
  );
}
