import { Search } from "lucide-react";

interface HeroSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const HeroSearch = ({ searchQuery, onSearchChange }: HeroSearchProps) => {
  return (
    <div
      className="w-full py-16 md:py-24 px-4"
      style={{ background: "var(--hero-gradient)" }}
    >
      <div className="container max-w-3xl mx-auto text-center">
        <h1 data-onboarding="hero-title" className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-4 animate-fade-in-up">
          Central de Ajuda
        </h1>
        <p
          className="text-lg md:text-xl mb-8 animate-fade-in-up"
          style={{ color: "hsl(0 0% 100% / 0.85)", animationDelay: "0.1s" }}
        >
          Como podemos ajudar você hoje?
        </p>
        <div
          data-onboarding="hero-search"
          className="relative max-w-xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={20}
          />
          <input
            type="text"
            placeholder="Buscar artigos, tutoriais e mais..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-card text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
