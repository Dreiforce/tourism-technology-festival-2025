import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

interface SearchResultProps {
    id: string;
    title: string;
    city: string;
    index: number;
}

const SearchResult = ({id, title, city, index}: SearchResultProps) => {
    debugger;
    const handleClick = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/find/?id=${id}`);
        } catch (error) {
            console.error('API request failed:', error);
        }
    };

    return (
        <Card
            onClick={handleClick}
            tabIndex={0}
            role="button"
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 animate-in fade-in slide-in-from-bottom-4"
            style={{animationDelay: `${index * 50}ms`}}
        >
            <CardHeader>
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <Badge variant="secondary" className="shrink-0">{city}</Badge>
                </div>
            </CardHeader>
        </Card>
    );
};

export default SearchResult;