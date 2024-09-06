import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HubPage from "./components/HubPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HubPage />} />
            </Routes>
        </Router>
    );
}

export default App;
