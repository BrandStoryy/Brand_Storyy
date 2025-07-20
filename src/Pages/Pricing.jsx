import React, { useState } from "react";
import { Check } from "lucide-react";

const personalPlans = [
  {
    title: "Starter",
    price: "$0",
    description: "Get started with basic AI tools.",
    features: ["Access to GPT-3.5", "Limited prompts", "Community support"],
  },
  {
    title: "Pro",
    price: "$12/mo",
    description: "Unlock enhanced tools for daily use.",
    features: ["Access to GPT-4", "Faster replies", "Priority updates"],
  },
  {
    title: "Elite",
    price: "$24/mo",
    description: "For power users and enthusiasts.",
    features: ["Unlimited prompts", "Latest AI tools", "24/7 premium support"],
  },
];

const teamPlan = {
  title: "Team Plan",
  price: "$49/user/mo",
  description: "Collaborate with your team using powerful AI tools.",
  features: [
    "Multi-user dashboard",
    "Centralized billing",
    "Team-specific analytics",
    "Priority enterprise support",
  ],
};

const PricingTabs = () => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <section className="bg-white py-16 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          {["personal", "team"].map((tab) => (
            <button
              key={tab}
              className={`mx-2 px-6 py-2 text-lg font-semibold rounded-full transition-all ${
                activeTab === tab
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "personal" ? "Personal" : "Team"}
            </button>
          ))}
        </div>

        {/* Cards */}
        {activeTab === "personal" ? (
          <div className="grid md:grid-cols-3 gap-6">
            {personalPlans.map((plan, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
                  boxShadow:
                    "0 8px 32px 0 rgba(31, 38, 135, 0.1), 0 4px 16px rgba(255, 255, 255, 0.05)",
                }}
              >
                <h3 className="text-2xl font-semibold text-black mb-2">
                  {plan.title}
                </h3>
                <p className="text-3xl font-bold text-black mb-4">
                  {plan.price}
                </p>
                <p className="text-gray-700 mb-6">{plan.description}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-black">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto border rounded-xl shadow-lg p-8 bg-white">
            <h3 className="text-3xl font-semibold mb-2">{teamPlan.title}</h3>
            <p className="text-2xl font-bold text-gray-800 mb-4">
              {teamPlan.price}
            </p>
            <p className="text-gray-600 mb-6">{teamPlan.description}</p>
            <ul className="space-y-3">
              {teamPlan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingTabs;
