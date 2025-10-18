import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { RotateCw } from "lucide-react";

interface SpinWheelCardProps {
  isSpinning: boolean;
  onSpin: () => void;
}

export const SpinWheelCard = ({ isSpinning, onSpin }: SpinWheelCardProps) => (
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
      <h2 className="text-2xl font-bold text-foreground">Roda da Sorte</h2>
      <p className="text-muted-foreground">
        Gire a roda para descobrir... absolutamente nada!
      </p>
      <Button
        onClick={onSpin}
        disabled={isSpinning}
        className="w-full bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 active:scale-95"
      >
        {isSpinning ? "Girando..." : "Girar Roda"}
      </Button>
    </div>
  </Card>
);
