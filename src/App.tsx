import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HubPage from "./components/pages/HubPage.tsx";
import DashboardPage from "./components/pages/DashboardPage.tsx";
import LoginPage from "./components/pages/LoginPage.tsx";
import SignUpPage from "./components/pages/SignUpPage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HubPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/signup"} element={<SignUpPage/>}/>
                <Route path={"/hub/:userid"} element={<HubPage />}/>
            </Routes>
        </Router>
    );
}

export default App;
