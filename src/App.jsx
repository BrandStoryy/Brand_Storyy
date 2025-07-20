import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import LoadingSpinner from "./Components/LoadingSpinner";

// Lazy load pages
const LandingPage = lazy(() => import("./Pages/LandingPage"));
const CommandCenter = lazy(() => import("./Pages/CammandCenter"));
const PricingTabs = lazy(() => import("./Pages/Pricing"));
const SetupPage = lazy(() => import("./Pages/Setup"));
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<CommandCenter />} />
              <Route path="/pricing" element={<PricingTabs />} />
              <Route path="/setup" element={<SetupPage />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
