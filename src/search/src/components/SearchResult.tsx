import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SearchResultProps {
  title: string;
  description: string;
  category: string;
  index: number;
}

const SearchResult = ({ title, description, category, index }: SearchResultProps) => {
  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge variant="secondary" className="shrink-0">{category}</Badge>
        </div>
        <CardDescription className="text-base mt-2">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default SearchResult;
