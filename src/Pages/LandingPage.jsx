import HeroSection from "../Components/Hero";
import FeatureCards from "../Components/FeatureCards";
import StatsBar from "../Components/StatsBar";
import AIAgentsSection from "../Components/AIAgentsSection";
import CTASection from "../Components/CTASection";
import TestimonialCarousel from "../Components/Testimonial";

const LandingPage = () => {
  return (
    <main>
      <HeroSection />
      <StatsBar/>
      <FeatureCards/>
      <AIAgentsSection/>
       <TestimonialCarousel/> 
      <CTASection/>
      
 
    
    </main>
  );
};

export default LandingPage;
