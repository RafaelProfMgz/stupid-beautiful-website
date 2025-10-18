interface ButtonSubscriptionProps {
  onClick: () => void;
}

export default function ButtonSubscription({
  onClick,
}: ButtonSubscriptionProps) {
  return (
    <button
      onClick={onClick}
      className="w-full py-4 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-lg transition-transform animate-pulse-glow cursor-pointer"
    >
      Desbloqueie Mais Inutilidade ✨
    </button>
  );
}
