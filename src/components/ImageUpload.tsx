import { useState, useCallback } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isAnalyzing: boolean;
}

export const ImageUpload = ({ onImageSelect, isAnalyzing }: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onImageSelect(file);
  };

  const clearImage = () => {
    setPreview(null);
  };

  return (
    <Card className="p-8 shadow-card">
      <div
        className={`relative border-2 border-dashed rounded-lg transition-all duration-300 ${
          dragActive 
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-primary/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative">
            <img 
              src={preview} 
              alt="Uploaded satellite imagery" 
              className="w-full h-96 object-cover rounded-lg"
            />
            {!isAnalyzing && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-4 right-4"
                onClick={clearImage}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
                <div className="text-center space-y-4">
                  <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                  <p className="text-lg font-medium">Analyzing satellite imagery...</p>
                  <p className="text-sm text-muted-foreground">AI processing in progress</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center py-16 cursor-pointer">
            <div className="rounded-full bg-primary/10 p-6 mb-4">
              <Upload className="w-12 h-12 text-primary" />
            </div>
            <p className="text-xl font-semibold mb-2">Upload Satellite Image</p>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports JPG, PNG, TIFF formats
            </p>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleChange}
              disabled={isAnalyzing}
            />
          </label>
        )}
      </div>
    </Card>
  );
};
