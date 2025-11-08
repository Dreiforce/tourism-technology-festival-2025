import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-2xl">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors peer-focus:text-primary" />
      <Input
        type="text"
        placeholder="Search by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer h-14 pl-12 pr-4 text-lg shadow-lg border-2 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
      />
    </div>
  );
};

export default SearchBar;
