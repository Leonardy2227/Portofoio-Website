import AboutPage from "./about/about";
import HomePage from "./home/home";
import JourneyPage from "./journey/joruney";
import ProjectsPage from "./projects/projects";
import ContactPage from "./contact/contact";
import Navbar from "./components/navbar";
import SkillsPage from "./skills/skills";

export default function Home() {
  return (
    <>
      <Navbar/>
      <HomePage/>
      <AboutPage/>
      <JourneyPage/>
      <SkillsPage/>
      <ProjectsPage/>
      <ContactPage/>
    </>
  );
}