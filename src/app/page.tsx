import Hero from "@/components/home/Hero";
import PartnersStrip from "@/components/home/PartnersStrip";
import AboutOverview from "@/components/home/AboutOverview";
import ServicesGrid from "@/components/home/ServicesGrid";
import ResearchApproach from "@/components/home/ResearchApproach";
import FeaturedPublications from "@/components/home/FeaturedPublications";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import WhyPartner from "@/components/home/WhyPartner";
import LeadershipPreview from "@/components/home/LeadershipPreview";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PartnersStrip />
      <AboutOverview />
      <ServicesGrid />
      <ResearchApproach />
      <FeaturedPublications />
      <ProjectsPreview />
      <WhyPartner />
      <LeadershipPreview />
      <ContactCTA />
    </>
  );
}
