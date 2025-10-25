import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { ImageUpload } from "@/components/ImageUpload";
import { AnalysisResults } from "@/components/AnalysisResults";
import { useToast } from "@/hooks/use-toast";

// Mock analysis function - in production, this would call your AI backend
const analyzeImage = async (file: File): Promise<any> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Mock data
  return {
    landUse: {
      forest: 45,
      agriculture: 30,
      urban: 15,
      water: 10,
    },
    deforestation: {
      detected: true,
      severity: 'medium' as const,
      area: '2.3 km²',
    },
    changes: [
      {
        type: 'Forest Coverage Reduction',
        confidence: 92,
        description: 'Significant decrease in dense forest areas detected in the northeastern region, indicating potential deforestation activity.',
      },
      {
        type: 'Agricultural Expansion',
        confidence: 87,
        description: 'New agricultural land development observed, replacing previous forest coverage.',
      },
      {
        type: 'Water Body Changes',
        confidence: 78,
        description: 'Minor variations in water body extent, possibly due to seasonal changes.',
      },
    ],
  };
};

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleImageSelect = async (file: File) => {
    setIsAnalyzing(true);
    try {
      const results = await analyzeImage(file);
      setAnalysisData(results);
      toast({
        title: "Analysis Complete",
        description: "Satellite image analysis has been completed successfully.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "An error occurred during image analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen">
      <Hero onUploadClick={scrollToUpload} />
      
      <FeatureGrid />
      
      <section ref={uploadRef} className="container py-24 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Analyze Your Satellite Imagery
            </h2>
            <p className="text-xl text-muted-foreground">
              Upload satellite images to detect environmental changes using AI
            </p>
          </div>
          
          <ImageUpload 
            onImageSelect={handleImageSelect}
            isAnalyzing={isAnalyzing}
          />
          
          {analysisData && <AnalysisResults data={analysisData} />}
        </div>
      </section>
      
      <footer className="border-t mt-24">
        <div className="container py-12 px-4 text-center text-muted-foreground">
          <p>© 2025 Satellite Environmental Monitoring. AI-Powered Analysis for a Sustainable Future.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
