import React from "react";

interface LoadingSpinnerProps {
    gifUrl: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({gifUrl}) => (
    <div
        className="fixed inset-0 z-50 w-screen h-screen flex flex-col items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500">
        <img
            src={gifUrl}
            alt="Loading..."
            className="w-32 h-32 object-cover rounded-full shadow-lg mb-6"
            style={{zIndex: 51}}
        />
        <div className="text-white font-semibold text-lg" style={{zIndex: 51}}>
            Processing satellite data...
        </div>
    </div>
);

export default LoadingSpinner;