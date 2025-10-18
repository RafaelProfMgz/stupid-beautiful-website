import { Card } from "@/src/components/ui/card";
import { Zap, Eye, Heart } from "lucide-react";

interface StatsCardsProps {
  clickCount: number;
}

export const StatsCards = ({ clickCount }: StatsCardsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl">
    <Card className="p-6 backdrop-blur-sm bg-card/50 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm mb-2">Cliques Inúteis</p>
          <p className="text-4xl font-bold text-primary">{clickCount}</p>
        </div>
        <Zap className="w-12 h-12 text-primary/50" />
      </div>
    </Card>

    <Card className="p-6 backdrop-blur-sm bg-card/50 border-accent/20 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm mb-2">Produtividade</p>
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
);
