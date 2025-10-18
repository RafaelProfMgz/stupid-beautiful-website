import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Volume2 } from "lucide-react";

interface SoundToggleCardProps {
  soundEnabled: boolean;
  onToggle: () => void;
}

export const SoundToggleCard = ({
  soundEnabled,
  onToggle,
}: SoundToggleCardProps) => (
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
        onClick={onToggle}
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
);
