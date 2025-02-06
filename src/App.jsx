import Aurora from "./components/Aurora.jsx";
import CanvasBackground from "./components/CanvasBackground.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Projects from "./components/Projects.jsx";
import Recommend from "./components/Recommend.jsx";
import ScrollWrapper from "./components/ScrollWrapper.jsx";
import Services from "./components/Services.jsx";
// import Squares from "./components/Backgrounds/Squares/Squares.jsx";
function App() {
  return (
    <ScrollWrapper>
      <Aurora />
      <div className="fixed inset-0 -z-20 bg-slate-950" />
      <CanvasBackground />
      <Navbar />
      <Hero />
      <Projects />
      <Services />
      <Contact />
      <Recommend />
      <Footer />
    </ScrollWrapper>
  );
}

export default App;
