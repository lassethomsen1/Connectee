import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ConnectPage from "./components/pages/ConnectPage.tsx";
import DashboardPage from "./components/pages/DashboardPage.tsx";
import LoginPage from "./components/pages/LoginPage.tsx";
import SignUpPage from "./components/pages/SignUpPage.tsx";
import LandingPage from "./components/pages/LandingPage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/signup"} element={<SignUpPage/>}/>
                <Route path={"/hub/:userid"} element={<ConnectPage />}/>
            </Routes>
        </Router>
    );
}

export default App;
