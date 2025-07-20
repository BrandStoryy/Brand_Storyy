import React from 'react';
import { 
  MessageSquare, 
  Mail, 
  Target, 
  Search, 
  Globe, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter, 
  ArrowRight 
} from 'lucide-react';

const AIAgentsSection = () => {
  const agents = [
    {
      icon: MessageSquare,
      title: "Social Media Agent",
      description: "Generates platform-specific content for Instagram, Facebook, LinkedIn, and X/Twitter using your business profile and campaign goals.",
      socialIcons: [Instagram, Facebook, Linkedin, Twitter],
      gradient: "from-purple-500 to-pink-500",
      features: [
        "Platform optimization",
        "Hashtag research", 
        "Visual content suggestions",
        "Posting schedules"
      ],
      example: {
        input: "New product launch",
        output: "Tailored posts for each platform with optimal timing"
      }
    },
    {
      icon: Mail,
      title: "Email Marketing Agent", 
      description: "Crafts personalized newsletters, drip sequences, and promotional emails that resonate with your audience.",
      gradient: "from-blue-500 to-purple-500",
      features: [
        "Subject line optimization",
        "Personalization",
        "A/B testing",
        "Automation sequences"
      ],
      example: {
        input: "Creates welcome series, product announcements, and nurture campaigns automatically"
      }
    },
    {
      icon: Target,
      title: "Ad Copy Agent",
      description: "Writes high-converting copy variations for Google Ads, Meta Ads, and other PPC campaigns.",
      gradient: "from-green-500 to-blue-500", 
      features: [
        "Multiple variations",
        "A/B test ready",
        "Keyword optimization",
        "CTA optimization"
      ],
      example: {
        input: "Generates 10+ ad variations with different hooks, benefits, and CTAs for testing"
      }
    },
    {
      icon: Search,
      title: "SEO Content Agent",
      description: "Suggests blog topics, creates outlines, and generates long-form SEO content optimized for your industry.",
      gradient: "from-yellow-500 to-orange-500",
      features: [
        "Keyword research",
        "Content optimization",
        "Topic suggestions", 
        "SERP analysis"
      ],
      example: {
        input: "Creates comprehensive blog posts with proper SEO structure and keyword targeting"
      }
    },
    {
      icon: Globe,
      title: "Website Funnel Agent",
      description: "Dynamically generates landing page copy, CTA structures, and lead capture flows based on your goals.",
      gradient: "from-indigo-500 to-purple-500",
      features: [
        "Landing page copy",
        "CTA optimization",
        "Lead magnets",
        "Conversion tracking"
      ],
      example: {
        input: "Builds complete funnel copy from landing page to thank you page with optimized conversion elements"
      }
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Meet Your AI Marketing Team
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Each agent specializes in a specific area of marketing, using your business profile to 
            create personalized, on-brand content across all channels.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {agents.map((agent, index) => {
            const IconComponent = agent.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-purple-200 group"
              >
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${agent.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Social Icons (for Social Media Agent) */}
                {agent.socialIcons && (
                  <div className="flex items-center space-x-2 mb-4">
                    {agent.socialIcons.map((SocialIcon, idx) => (
                      <SocialIcon key={idx} className="w-4 h-4 text-gray-400" />
                    ))}
                  </div>
                )}

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {agent.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {agent.description}
                </p>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {agent.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Example */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Example:</h4>
                  {agent.example.input && agent.example.output ? (
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">Input:</span> {agent.example.input}</p>
                      <p><span className="font-medium">Output:</span> {agent.example.output}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">{agent.example.input}</p>
                  )}
                </div>

                {/* CTA Button */}
                <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium text-sm group/btn">
                  <span>Try This Agent</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AIAgentsSection;