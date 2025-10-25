import { Button } from "@/components/ui/button";
import { Upload, Satellite } from "lucide-react";
import earthHero from "@/assets/earth-hero.jpg";

interface HeroProps {
  onUploadClick: () => void;
}

export const Hero = ({ onUploadClick }: HeroProps) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={earthHero} 
          alt="Earth from space showing environmental monitoring"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>
      
      {/* Orbiting Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-primary rounded-full animate-orbit animate-pulse-glow" />
        <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-secondary rounded-full animate-orbit animate-pulse-glow" style={{ animationDelay: '5s' }} />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 text-center space-y-8 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border rounded-full shadow-card">
          <Satellite className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">AI-Powered Environmental Analysis</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Satellite Intelligence
          </span>
          <br />
          <span className="text-foreground">for Our Planet</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Real-time monitoring of deforestation, land use changes, and environmental patterns 
          using advanced AI and satellite imagery analysis
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button 
            size="lg" 
            variant="hero"
            onClick={onUploadClick}
            className="gap-2"
          >
            <Upload className="w-5 h-5" />
            Analyze Satellite Image
          </Button>
          <Button size="lg" variant="outline">
            View Documentation
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-8 justify-center pt-8 text-sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">98.5%</div>
            <div className="text-muted-foreground">Detection Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary">24/7</div>
            <div className="text-muted-foreground">Real-time Monitoring</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">5M+ km²</div>
            <div className="text-muted-foreground">Area Analyzed</div>
          </div>
        </div>
      </div>
    </section>
  );
};
