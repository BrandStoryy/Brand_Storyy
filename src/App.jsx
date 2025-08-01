import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy, useState } from "react";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import LoadingSpinner from "./Components/LoadingSpinner";
import CenteredSidebar from "./Components/CenteredSideba"; // ✅ FIXED typo in import

// Lazy load pages
const LandingPage = lazy(() => import("./Pages/LandingPage"));
const CommandCenter = lazy(() => import("./Pages/CammandCenter"));
const PricingTabs = lazy(() => import("./Pages/Pricing"));
const SetupPage = lazy(() => import("./Pages/Setup"));
const DynamicPage = lazy(() => import("./Pages/DynamicPage"));

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen relative">
        {/* Sidebar - only visible on large screens */}
        <CenteredSidebar />

        {/* Main Content Area */}
        <div className="flex flex-col flex-grow w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <main className="flex-grow px-4 lg:pl-24 pt-4">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<CommandCenter />} />
                <Route path="/pricing" element={<PricingTabs />} />
                <Route path="/setup" element={<SetupPage />} />
                <Route path="/PageDetails" element={<DynamicPage/>} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
