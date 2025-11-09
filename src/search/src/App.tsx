import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Index from "./pages/Index";
import TrailPage from "./pages/TrailPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index/>}/>
                <Route path="/trail/:id" element={<TrailPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;