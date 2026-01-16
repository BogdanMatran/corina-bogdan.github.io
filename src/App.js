import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import StorySection from "./components/StorySection";
import BrideSection from "./components/BrideSection";
import GroomSection from "./components/GroomSection";
import JourneySection from "./components/JourneySection";
import LoveNotesSection from "./components/LoveNotesSection";
import GallerySection from "./components/GallerySection";
import EngagementVideoSection from "./components/EngagementVideoSection";
import ProposalSection from "./components/ProposalSection";
import CelebrationSection from "./components/CelebrationSection";
import InteractiveSection from "./components/InteractiveSection";
import DetailsSection from "./components/DetailsSection";
import IYKYKSection from "./components/IYKYKSection";
import RSVPSection from "./components/RSVPSection";
import FlyingDoves from "./components/FlyingDoves";
import WaxSealOverlay from "./components/WaxSealOverlay";
import CursorTrail from "./components/CursorTrail";
import { storyContent } from "./data/storyContent";

export default function App() {
  const { scrollYProgress } = useScroll();

  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.5, 0.3]);

  return (
    <>
      {/* Wax Seal Entrance Overlay */}
      <WaxSealOverlay />

      {/* Cursor Trail Effect */}
      <CursorTrail />

      <div className="relative bg-stone-50">
        {/* Navigation */}
        <Navigation weddingDate={storyContent.weddingDate} />

        {/* Flying Doves Animation */}
        <FlyingDoves />

        {/* Scrollable sections */}
        <div className="relative z-0">
          <HeroSection />
          <StorySection />
          <BrideSection />
          <GroomSection />
          <JourneySection />
          <LoveNotesSection />
          <GallerySection />
          <EngagementVideoSection />
          <ProposalSection />
          <CelebrationSection />
          <InteractiveSection />
          <DetailsSection />
          <IYKYKSection />
          <RSVPSection />
        </div>
      </div>
    </>
  );
}
