import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Trees, MapPin, TrendingDown, TrendingUp } from "lucide-react";

interface AnalysisData {
  landUse: {
    forest: number;
    agriculture: number;
    urban: number;
    water: number;
  };
  deforestation: {
    detected: boolean;
    severity: 'low' | 'medium' | 'high';
    area: string;
  };
  changes: {
    type: string;
    confidence: number;
    description: string;
  }[];
}

interface AnalysisResultsProps {
  data: AnalysisData;
}

export const AnalysisResults = ({ data }: AnalysisResultsProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-alert-gradient';
      case 'medium': return 'bg-destructive';
      case 'low': return 'bg-accent';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Analysis Results</h2>
        <Badge variant="outline" className="px-4 py-2">
          <MapPin className="w-4 h-4 mr-2" />
          Real-time Analysis
        </Badge>
      </div>

      {/* Deforestation Alert */}
      {data.deforestation.detected && (
        <Card className={`p-6 ${getSeverityColor(data.deforestation.severity)} text-white shadow-elevated`}>
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-white/20 p-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Deforestation Detected</h3>
              <p className="text-white/90 mb-2">
                {data.deforestation.severity.charAt(0).toUpperCase() + data.deforestation.severity.slice(1)} severity environmental change identified
              </p>
              <p className="text-sm text-white/80">
                Affected Area: {data.deforestation.area}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Land Use Classification */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-full bg-primary/10 p-2">
            <Trees className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Land Use Classification</h3>
        </div>
        
        <div className="space-y-4">
          {Object.entries(data.landUse).map(([type, percentage]) => (
            <div key={type}>
              <div className="flex justify-between mb-2">
                <span className="font-medium capitalize">{type}</span>
                <span className="text-muted-foreground">{percentage}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    type === 'forest' ? 'bg-forest-gradient' :
                    type === 'water' ? 'bg-ocean-gradient' :
                    type === 'agriculture' ? 'bg-accent' :
                    'bg-muted-foreground'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Detected Changes */}
      <Card className="p-6 shadow-card">
        <h3 className="text-xl font-bold mb-6">Detected Environmental Changes</h3>
        <div className="space-y-4">
          {data.changes.map((change, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className={`rounded-full p-2 ${change.confidence > 80 ? 'bg-primary/10' : 'bg-muted'}`}>
                {change.confidence > 80 ? (
                  <TrendingDown className="w-5 h-5 text-primary" />
                ) : (
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{change.type}</h4>
                  <Badge variant="outline">{change.confidence}% confidence</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{change.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
