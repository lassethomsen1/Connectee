import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HubPage from "./components/HubPage";
import DashboardPage from "./components/DashboardPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HubPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
        </Router>
    );
}

export default App;
