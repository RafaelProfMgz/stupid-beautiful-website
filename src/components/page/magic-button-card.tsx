import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Sparkles } from "lucide-react";

interface Particle {
  id: number;
  x: number;
  y: number;
}

interface MagicButtonCardProps {
  onMagicClick: () => void;
  motivationalPhrase: string;
  particles: Particle[];
}

export const MagicButtonCard = ({
  onMagicClick,
  motivationalPhrase,
  particles,
}: MagicButtonCardProps) => (
  <div className="relative">
    <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
    <Card className="relative p-12 backdrop-blur-sm bg-card/80 border-primary/30 hover:border-primary/60 transition-all duration-300">
      <div className="text-center space-y-6">
        <Sparkles className="w-16 h-16 mx-auto text-primary animate-pulse-glow" />
        <h2 className="text-3xl font-bold text-foreground">Botão Mágico</h2>
        <p className="text-muted-foreground">
          Clique para se sentir produtivo instantaneamente
        </p>

        <div className="relative h-20 flex items-center justify-center">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-bounce">
            {motivationalPhrase}
          </div>
        </div>

        <Button
          onClick={onMagicClick}
          className="w-full h-16 text-lg font-bold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 active:scale-95"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Clique Aqui (Não Faz Nada)
        </Button>

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
);
