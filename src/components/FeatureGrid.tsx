import { Card } from "@/components/ui/card";
import { Satellite, Brain, Clock, Shield } from "lucide-react";

const features = [
  {
    icon: Satellite,
    title: "Satellite Imagery Processing",
    description: "Process high-resolution satellite images from multiple sources including Landsat, Sentinel, and commercial providers",
  },
  {
    icon: Brain,
    title: "AI-Powered Detection",
    description: "Advanced machine learning models detect deforestation, land use changes, and environmental patterns with 98.5% accuracy",
  },
  {
    icon: Clock,
    title: "Real-time Monitoring",
    description: "Continuous monitoring and instant alerts for significant environmental changes and deforestation events",
  },
  {
    icon: Shield,
    title: "Policy Support",
    description: "Generate actionable insights and reports to support environmental policies and sustainable development initiatives",
  },
];

export const FeatureGrid = () => {
  return (
    <section className="container py-24 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Advanced Environmental Intelligence
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Leveraging cutting-edge AI and satellite technology to protect our planet
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card 
            key={index}
            className="p-8 shadow-card hover:shadow-elevated transition-all duration-300 group cursor-pointer"
          >
            <div className="rounded-full bg-earth-gradient p-4 w-fit mb-6 group-hover:scale-110 transition-transform">
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};
