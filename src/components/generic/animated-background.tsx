export const AnimatedBackground = () => (
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
);
