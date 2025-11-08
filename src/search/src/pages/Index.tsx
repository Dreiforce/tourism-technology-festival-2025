import React, {useMemo, useState} from "react";
import SearchBar from "@/components/SearchBar";
import SearchResult from "@/components/SearchResult";
import tours from "@/data/filtered.json";
import LoadingSpinner from "@/components/LoadingSpinner";
import {FileSearch} from "lucide-react";

interface DataItem {
    id: number;
    title: string;
    city: string;
    Country: string;
}

const Index = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const filteredResults = useMemo(() => {
        if (!searchQuery.trim()) {
            return tours;
        }
        return tours.filter((item: DataItem) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const handleResultClick = async (id: number) => {
        setLoading(true);
        try {
            await fetch(`http://localhost:3000/api/find/?id=${id}`);
            setTimeout(() => {
                setLoading(false);
            }, 800);
        } catch (error) {
            console.error('API request failed:', error);
            setTimeout(() => {
                //setLoading(false);
            }, 800);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
            {loading && <LoadingSpinner gifUrl="/loading.gif"/>}
            <div className="container mx-auto px-4 py-12 md:py-20">
                <header className="text-center mb-12 animate-in fade-in slide-in-from-top duration-500">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                        <FileSearch className="w-8 h-8 text-primary"/>
                    </div>
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
                            <div className="mb-6 text-sm text-muted-foreground animate-in fade-in duration-500">
                                {searchQuery && (
                                    <p>
                                        Found <span
                                        className="font-semibold text-foreground">{filteredResults.length}</span> result{filteredResults.length !== 1 ? 's' : ''} for
                                        "{searchQuery}"
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-4">
                                {filteredResults.map((item: DataItem, index: number) => (
                                    <SearchResult
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        city={item.city}
                                        index={index}
                                        onClick={handleResultClick}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-16 animate-in fade-in duration-500">
                            <div
                                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                                <FileSearch className="w-10 h-10 text-muted-foreground"/>
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">No results found</h3>
                            <p className="text-muted-foreground">
                                Try adjusting your search query
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Index;