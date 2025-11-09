import {useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import SearchResult from "@/components/SearchResult";
import tours from "@/data/filtered.json";
import LoadingSpinner from "@/components/LoadingSpinner";

interface DataItem {
    id: number;
    title: string;
    city: string;
    Country: string;
}

const Index = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const filteredResults = useMemo(() => {
        if (!searchQuery.trim()) return tours;
        return tours.filter((item: DataItem) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    // Index.tsx
    const handleResultClick = async (id: number, title: string) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/find?id=${id}`);
            //const response = await fetch('example.json');
            const data = await response.json();

            if (data && Array.isArray(data.path)) {
                const path = data.path.map((point: any) => ({
                    lat: point.y,
                    lng: point.x
                }));
                setTimeout(() => {
                    setLoading(false);
                    navigate(`/trail/${id}`, {
                        state: {
                            trailPath: path,
                            fileNames: data.files,
                            trailName: title,
                            trees: data.trees,
                            treeColors: data.tree_colors,
                            colors: data.colors
                        }
                    });
                }, 5000);
            } else {
                setLoading(false);
                console.error("No trail path found.");
            }
        } catch (error) {
            //setLoading(false);
            console.error("Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
            {loading && <LoadingSpinner gifUrl="/loading.gif"/>}
            <div className="container mx-auto px-4 py-12 md:py-20">
                <header className="text-center mb-12 animate-in fade-in slide-in-from-top duration-500">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary to-accent-foreground bg-clip-text text-transparent">
                        Tour Search
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Find the tour you're looking for
                    </p>
                </header>

                <div className="flex justify-center mb-12 animate-in fade-in slide-in-from-top duration-700">
                    <SearchBar value={searchQuery} onChange={setSearchQuery}/>
                </div>
                <div className="max-w-4xl mx-auto">
                    {filteredResults.length > 0 ? (
                        <>
                            <div className="grid gap-4">
                                {filteredResults.map((item: DataItem, index: number) => (
                                    <SearchResult
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        city={item.city}
                                        index={index}
                                        onClick={() => handleResultClick(item.id, item.title)}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-16 animate-in fade-in duration-500">{/* ... */}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Index;